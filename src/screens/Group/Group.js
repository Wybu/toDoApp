import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './groupstyles';

const GroupScreen = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    const unsubscribe = firestore()
      .collection('groups')
      .where('members', 'array-contains', currentUser.uid)
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

  const createNewGroup = async () => {
    if (!newGroupName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên nhóm');
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) return;

    try {
      await firestore().collection('groups').add({
        name: newGroupName.trim(),
        description: newGroupDescription.trim(),
        createdBy: currentUser.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        members: [currentUser.uid],
        admins: [currentUser.uid]
      });

      setModalVisible(false);
      setNewGroupName('');
      setNewGroupDescription('');
    } catch (error) {
      console.error('Error creating group:', error);
      Alert.alert('Lỗi', 'Không thể tạo nhóm mới');
    }
  };

  const joinGroup = async (groupId) => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    try {
      await firestore()
        .collection('groups')
        .doc(groupId)
        .update({
          members: firestore.FieldValue.arrayUnion(currentUser.uid)
        });

      Alert.alert('Thành công', 'Đã tham gia nhóm');
    } catch (error) {
      console.error('Error joining group:', error);
      Alert.alert('Lỗi', 'Không thể tham gia nhóm');
    }
  };

  const leaveGroup = async (groupId) => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    try {
      await firestore()
        .collection('groups')
        .doc(groupId)
        .update({
          members: firestore.FieldValue.arrayRemove(currentUser.uid)
        });

      Alert.alert('Thành công', 'Đã rời khỏi nhóm');
    } catch (error) {
      console.error('Error leaving group:', error);
      Alert.alert('Lỗi', 'Không thể rời khỏi nhóm');
    }
  };

  const renderGroup = ({ item }) => {
    const currentUser = auth().currentUser;
    const isMember = item.members.includes(currentUser?.uid);
    const isAdmin = item.admins.includes(currentUser?.uid);

    return (
      <View style={styles.groupItem}>
        <Image
          source={{
            uri: item.avatar || 'https://cdn-icons-png.flaticon.com/512/166/166258.png'
          }}
          style={styles.groupAvatar}
        />
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.groupDescription}>{item.description}</Text>
          <Text style={styles.memberCount}>
            {item.members.length} thành viên
          </Text>
        </View>
        {isMember ? (
          <TouchableOpacity
            style={[styles.actionButton, styles.leaveButton]}
            onPress={() => leaveGroup(item.id)}
          >
            <Text style={styles.buttonText}>Rời nhóm</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, styles.joinButton]}
            onPress={() => joinGroup(item.id)}
          >
            <Text style={styles.buttonText}>Tham gia</Text>
          </TouchableOpacity>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nhóm</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.createButtonText}>+ Tạo nhóm</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={groups}
        renderItem={renderGroup}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.groupList}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tạo nhóm mới</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Tên nhóm"
              value={newGroupName}
              onChangeText={setNewGroupName}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Mô tả nhóm"
              value={newGroupDescription}
              onChangeText={setNewGroupDescription}
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.createButton]}
                onPress={createNewGroup}
              >
                <Text style={styles.buttonText}>Tạo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GroupScreen; 