import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const GroupSettings = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [group, setGroup] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('groups')
      .doc(groupId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const groupData = { id: doc.id, ...doc.data() };
          setGroup(groupData);
          setGroupName(groupData.name);
          setDescription(groupData.description || '');
          setIsPrivate(groupData.isPrivate || false);
        }
        setLoading(false);
      });

    return () => unsubscribe();
  }, [groupId]);

  const isAdmin = () => {
    const currentUser = auth().currentUser;
    return group?.admins?.includes(currentUser?.uid);
  };

  const handleSaveChanges = async () => {
    if (!groupName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên nhóm');
      return;
    }

    try {
      await firestore()
        .collection('groups')
        .doc(groupId)
        .update({
          name: groupName.trim(),
          description: description.trim(),
          isPrivate,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      setEditMode(false);
      Alert.alert('Thành công', 'Đã cập nhật thông tin nhóm');
    } catch (error) {
      console.error('Error updating group:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin nhóm');
    }
  };

  const handleDeleteGroup = async () => {
    Alert.alert(
      'Xóa nhóm',
      'Bạn có chắc chắn muốn xóa nhóm này? Hành động này không thể hoàn tác.',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('groups').doc(groupId).delete();
              navigation.navigate('GroupList');
            } catch (error) {
              console.error('Error deleting group:', error);
              Alert.alert('Lỗi', 'Không thể xóa nhóm');
            }
          },
        },
      ]
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
        <Text style={styles.headerTitle}>Cài đặt nhóm</Text>
        {isAdmin() && !editMode && (
          <TouchableOpacity onPress={() => setEditMode(true)}>
            <Text style={styles.editButton}>Sửa</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin nhóm</Text>
          {editMode ? (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tên nhóm</Text>
                <TextInput
                  style={styles.input}
                  value={groupName}
                  onChangeText={setGroupName}
                  placeholder="Nhập tên nhóm..."
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mô tả</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Mô tả về nhóm..."
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.label}>Nhóm riêng tư</Text>
                <Switch
                  value={isPrivate}
                  onValueChange={setIsPrivate}
                  trackColor={{ false: '#767577', true: '#1e3a8a' }}
                  thumbColor={isPrivate ? '#ffffff' : '#f4f3f4'}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>Tên: {group?.name}</Text>
              <Text style={styles.infoText}>
                Mô tả: {group?.description || 'Chưa có mô tả'}
              </Text>
              <Text style={styles.infoText}>
                Trạng thái: {group?.isPrivate ? 'Riêng tư' : 'Công khai'}
              </Text>
            </>
          )}
        </View>

        {isAdmin() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quản lý nhóm</Text>
            <TouchableOpacity
              style={styles.manageButton}
              onPress={() => navigation.navigate('GroupMembers', { groupId })}
            >
              <Text style={styles.manageButtonText}>Quản lý thành viên</Text>
            </TouchableOpacity>

            {editMode && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveChanges}
                >
                  <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setEditMode(false)}
                >
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteGroup}
            >
              <Text style={styles.deleteButtonText}>Xóa nhóm</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  editButton: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1e3a8a',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
  },
  manageButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  manageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GroupSettings; 