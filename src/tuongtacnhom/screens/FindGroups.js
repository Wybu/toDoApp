import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const FindGroups = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('groups')
      .where('isPrivate', '==', false)
      .onSnapshot(snapshot => {
        const groupsData = [];
        snapshot.forEach(doc => {
          groupsData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setGroups(groupsData);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const handleJoinGroup = async (group) => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    if (group.members?.includes(currentUser.uid)) {
      navigation.navigate('GroupDetail', { groupId: group.id });
      return;
    }

    try {
      await firestore()
        .collection('groups')
        .doc(group.id)
        .update({
          members: firestore.FieldValue.arrayUnion(currentUser.uid),
        });

      // Tạo thông báo cho admin nhóm
      const notification = {
        type: 'new_member',
        groupId: group.id,
        userId: currentUser.uid,
        title: 'Thành viên mới',
        message: `${currentUser.displayName || currentUser.email} đã tham gia nhóm "${group.name}"`,
        timestamp: firestore.FieldValue.serverTimestamp(),
        read: false,
      };

      await firestore().collection('notifications').add(notification);

      navigation.navigate('GroupDetail', { groupId: group.id });
    } catch (error) {
      console.error('Error joining group:', error);
      Alert.alert('Lỗi', 'Không thể tham gia nhóm');
    }
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGroupItem = ({ item }) => {
    const currentUser = auth().currentUser;
    const isMember = item.members?.includes(currentUser?.uid);

    return (
      <View style={styles.groupItem}>
        <Image
          source={{ uri: item.avatar || 'https://via.placeholder.com/50' }}
          style={styles.groupAvatar}
        />
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.memberCount}>
            {item.members?.length || 0} thành viên
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description || 'Chưa có mô tả'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.joinButton, isMember && styles.joinedButton]}
          onPress={() => handleJoinGroup(item)}
        >
          <Text style={styles.joinButtonText}>
            {isMember ? 'Đã tham gia' : 'Tham gia'}
          </Text>
        </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Tìm nhóm</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm nhóm..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredGroups}
        renderItem={renderGroupItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery
                ? 'Không tìm thấy nhóm phù hợp'
                : 'Chưa có nhóm công khai nào'}
            </Text>
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
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  groupAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  groupInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  memberCount: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666666',
  },
  joinButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: '#E5E7EB',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default FindGroups; 