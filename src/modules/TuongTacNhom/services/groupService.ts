import firestore from '@react-native-firebase/firestore';
import { Group } from '../types';

const groupsCollection = firestore().collection('groups');

export const groupService = {
  // Lấy danh sách nhóm
  async getGroups(): Promise<Group[]> {
    const snapshot = await groupsCollection.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Group[];
  },

  // Tạo nhóm mới
  async createGroup(groupData: Omit<Group, 'id'>): Promise<Group> {
    const docRef = await groupsCollection.add(groupData);
    return {
      id: docRef.id,
      ...groupData,
    };
  },

  // Cập nhật thông tin nhóm
  async updateGroup(groupId: string, data: Partial<Group>): Promise<void> {
    await groupsCollection.doc(groupId).update(data);
  },

  // Thêm thành viên vào nhóm
  async addMember(groupId: string, userId: string): Promise<void> {
    await groupsCollection.doc(groupId).update({
      members: firestore.FieldValue.arrayUnion(userId),
      memberCount: firestore.FieldValue.increment(1),
    });
  },

  // Xóa thành viên khỏi nhóm
  async removeMember(groupId: string, userId: string): Promise<void> {
    await groupsCollection.doc(groupId).update({
      members: firestore.FieldValue.arrayRemove(userId),
      memberCount: firestore.FieldValue.increment(-1),
    });
  },

  // Lắng nghe thay đổi của một nhóm
  subscribeToGroup(groupId: string, callback: (group: Group) => void) {
    return groupsCollection.doc(groupId).onSnapshot(doc => {
      if (doc.exists) {
        const data = doc.data();
        callback({
          id: doc.id,
          ...data,
          createdAt: data?.createdAt.toDate(),
        } as Group);
      }
    });
  }
}; 