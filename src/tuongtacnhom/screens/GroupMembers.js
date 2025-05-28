import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const GroupMembers = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('groups')
      .doc(groupId)
      .onSnapshot(async doc => {
        if (doc.exists) {
          const groupData = { id: doc.id, ...doc.data() };
          setGroup(groupData);

          // Lấy thông tin chi tiết của từng thành viên
          const memberPromises = groupData.members.map(uid =>
            firestore().collection('users').doc(uid).get()
          );

          const memberSnapshots = await Promise.all(memberPromises);
          const membersData = memberSnapshots.map(doc => ({
            id: doc.id,
            ...doc.data(),
            isAdmin: groupData.admins?.includes(doc.id),
          }));

          setMembers(membersData);
        }
        setLoading(false);
      });

    return () => unsubscribe();
  }, [groupId]);

  const isCurrentUserAdmin = () => {
    const currentUser = auth().currentUser;
    return group?.admins?.includes(currentUser?.uid);
  };

  const handleToggleAdmin = async (userId) => {
    const currentUser = auth().currentUser;
    if (!currentUser || !isCurrentUserAdmin()) return;

    try {
      const isPromoting = !group.admins?.includes(userId);
      const updatedAdmins = isPromoting
        ? [...(group.admins || []), userId]
        : group.admins?.filter(id => id !== userId);

      await firestore()
        .collection('groups')
        .doc(groupId)
        .update({
          admins: updatedAdmins,
        });

      // Tạo thông báo cho thành viên
      await firestore().collection('notifications').add({
        type: isPromoting ? 'admin_promotion' : 'admin_demotion',
        groupId,
        userId: currentUser.uid,
        targetUserId: userId,
        title: isPromoting ? 'Thăng cấp quản trị viên' : 'Hạ cấp quản trị viên',
        message: isPromoting
          ? `Bạn đã được thăng cấp thành quản trị viên trong nhóm "${group.name}"`
          : `Bạn đã bị hạ cấp khỏi vai trò quản trị viên trong nhóm "${group.name}"`,
        timestamp: firestore.FieldValue.serverTimestamp(),
        read: false,
      });
    } catch (error) {
      console.error('Error updating admin status:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái quản trị viên');
    }
  };

  const handleRemoveMember = async (userId) => {
    const currentUser = auth().currentUser;
    if (!currentUser || !isCurrentUserAdmin()) return;

    // Không thể xóa chính mình
    if (userId === currentUser.uid) {
      Alert.alert('Lỗi', 'Bạn không thể xóa chính mình khỏi nhóm');
      return;
    }

    Alert.alert(
      'Xóa thành viên',
      'Bạn có chắc chắn muốn xóa thành viên này khỏi nhóm?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              const batch = firestore().batch();
              const groupRef = firestore().collection('groups').doc(groupId);

              // Xóa khỏi danh sách thành viên
              batch.update(groupRef, {
                members: firestore.FieldValue.arrayRemove(userId),
                admins: firestore.FieldValue.arrayRemove(userId),
              });

              // Tạo thông báo cho thành viên bị xóa
              const notificationRef = firestore().collection('notifications').doc();
              batch.set(notificationRef, {
                type: 'member_removed',
                groupId,
                userId: currentUser.uid,
                targetUserId: userId,
                title: 'Đã bị xóa khỏi nhóm',
                message: `Bạn đã bị xóa khỏi nhóm "${group.name}"`,
                timestamp: firestore.FieldValue.serverTimestamp(),
                read: false,
              });

              await batch.commit();
            } catch (error) {
              console.error('Error removing member:', error);
              Alert.alert('Lỗi', 'Không thể xóa thành viên');
            }
          },
        },
      ]
    );
  };

  const renderMemberItem = ({ item }) => {
    const currentUser = auth().currentUser;
    const isCurrentUser = item.id === currentUser?.uid;

    return (
      <View style={styles.memberItem}>
        <Image
          source={{ uri: item.avatar || 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>
            {item.displayName || item.email}
            {isCurrentUser && ' (Bạn)'}
          </Text>
          <Text style={styles.memberRole}>
            {item.isAdmin ? 'Quản trị viên' : 'Thành viên'}
          </Text>
        </View>
        {isCurrentUserAdmin() && !isCurrentUser && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, item.isAdmin && styles.adminButton]}
              onPress={() => handleToggleAdmin(item.id)}
            >
              <Text style={styles.actionButtonText}>
                {item.isAdmin ? 'Hạ cấp' : 'Thăng cấp'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.removeButton]}
              onPress={() => handleRemoveMember(item.id)}
            >
              <Text style={styles.actionButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thành viên nhóm</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={members}
        renderItem={renderMemberItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.membersList}
        ListHeaderComponent={
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{members.length}</Text>
              <Text style={styles.statLabel}>Thành viên</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {members.filter(m => m.isAdmin).length}
              </Text>
              <Text style={styles.statLabel}>Quản trị viên</Text>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    backgroundColor: '#1e3a8a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  membersList: {
    padding: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  adminButton: {
    backgroundColor: '#4B5563',
  },
  removeButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GroupMembers; 