import firestore from '@react-native-firebase/firestore';
import { Notification } from '../types';

const notificationsCollection = firestore().collection('notifications');

export const notificationService = {
  // Lấy thông báo của người dùng
  async getUserNotifications(userId: string): Promise<Notification[]> {
    const snapshot = await notificationsCollection
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Notification[];
  },

  // Tạo thông báo mới
  async createNotification(notification: Omit<Notification, 'id'>): Promise<Notification> {
    const notificationData = {
      ...notification,
      createdAt: firestore.FieldValue.serverTimestamp(),
      isRead: false,
    };
    const docRef = await notificationsCollection.add(notificationData);
    return {
      id: docRef.id,
      ...notificationData,
    };
  },

  // Đánh dấu thông báo đã đọc
  async markAsRead(notificationId: string): Promise<void> {
    await notificationsCollection.doc(notificationId).update({
      isRead: true,
    });
  },

  // Đánh dấu tất cả thông báo của người dùng đã đọc
  async markAllAsRead(userId: string): Promise<void> {
    const batch = firestore().batch();
    const snapshot = await notificationsCollection
      .where('userId', '==', userId)
      .where('isRead', '==', false)
      .get();

    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, { isRead: true });
    });

    await batch.commit();
  },

  // Lắng nghe thông báo mới của người dùng
  subscribeToUserNotifications(userId: string, callback: (notifications: Notification[]) => void) {
    return notificationsCollection
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const notifications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as Notification[];
        callback(notifications);
      });
  }
}; 