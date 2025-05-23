import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Message } from '../types';

const messagesCollection = firestore().collection('messages');

export const messageService = {
  // Lấy tin nhắn của một nhóm
  async getGroupMessages(groupId: string): Promise<Message[]> {
    const snapshot = await messagesCollection
      .where('groupId', '==', groupId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Message[];
  },

  // Gửi tin nhắn văn bản
  async sendTextMessage(message: Omit<Message, 'id' | 'type'>): Promise<Message> {
    const messageData = {
      ...message,
      type: 'text',
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await messagesCollection.add(messageData);
    return {
      id: docRef.id,
      ...messageData,
      type: 'text' as const,
    };
  },

  // Gửi tin nhắn với file đính kèm
  async sendFileMessage(
    message: Omit<Message, 'id' | 'type'>,
    file: { uri: string; name: string; type: string }
  ): Promise<Message> {
    // Upload file to Firebase Storage
    const fileRef = storage().ref(`group-messages/${message.groupId}/${file.name}`);
    await fileRef.putFile(file.uri);
    const fileUrl = await fileRef.getDownloadURL();

    const messageData = {
      ...message,
      type: 'file',
      attachments: [fileUrl],
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await messagesCollection.add(messageData);
    return {
      id: docRef.id,
      ...messageData,
      type: 'file' as const,
    };
  },

  // Lắng nghe tin nhắn mới trong nhóm
  subscribeToGroupMessages(groupId: string, callback: (messages: Message[]) => void) {
    return messagesCollection
      .where('groupId', '==', groupId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as Message[];
        callback(messages);
      });
  },

  // Xóa tin nhắn
  async deleteMessage(messageId: string): Promise<void> {
    await messagesCollection.doc(messageId).delete();
  }
}; 