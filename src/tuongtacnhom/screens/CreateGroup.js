import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

const CreateGroup = ({ navigation }) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [groupAvatar, setGroupAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectImage = () => {
    const options = {
      title: 'Chọn ảnh nhóm',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert('Lỗi', 'Không thể chọn ảnh');
        return;
      }

      setGroupAvatar(response);
    });
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên nhóm');
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) return;

    setLoading(true);

    try {
      let avatarUrl = null;

      if (groupAvatar) {
        const reference = storage().ref(`group-avatars/${Date.now()}`);
        await reference.putFile(groupAvatar.uri);
        avatarUrl = await reference.getDownloadURL();
      }

      const groupData = {
        name: groupName.trim(),
        description: description.trim(),
        avatar: avatarUrl,
        createdBy: currentUser.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        members: [currentUser.uid],
        admins: [currentUser.uid],
      };

      const groupRef = await firestore().collection('groups').add(groupData);

      // Tạo thông báo cho nhóm mới
      await firestore()
        .collection('notifications')
        .add({
          type: 'group_created',
          groupId: groupRef.id,
          userId: currentUser.uid,
          title: 'Nhóm mới được tạo',
          message: `${currentUser.displayName || currentUser.email} đã tạo nhóm "${groupName}"`,
          timestamp: firestore.FieldValue.serverTimestamp(),
          read: false,
        });

      navigation.replace('GroupDetail', { groupId: groupRef.id });
    } catch (error) {
      console.error('Error creating group:', error);
      Alert.alert('Lỗi', 'Không thể tạo nhóm mới');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo nhóm mới</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleSelectImage}
        >
          {groupAvatar ? (
            <Image
              source={{ uri: groupAvatar.uri }}
              style={styles.avatarImage}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarPlaceholderText}>+</Text>
              <Text style={styles.avatarPlaceholderLabel}>Thêm ảnh nhóm</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
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
              placeholder="Mô tả về nhóm của bạn..."
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.createButton, loading && styles.disabledButton]}
          onPress={handleCreateGroup}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>
            {loading ? 'Đang tạo...' : 'Tạo nhóm'}
          </Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 40,
    color: '#9CA3AF',
  },
  avatarPlaceholderLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  form: {
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
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
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  createButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateGroup; 