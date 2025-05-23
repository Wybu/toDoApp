import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface Notification {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  type: 'firmware' | 'software' | 'normal';
  isRead: boolean;
}

interface NotificationListProps {
  onSelectNotification: (notification: Notification) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  onSelectNotification,
}) => {
  // Mock data - trong thực tế sẽ lấy từ API
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Cập nhật firmware mới',
      content: 'Đã phát hành phiên bản firmware 2.0.1 cho thiết bị ABC',
      timestamp: '10:30',
      type: 'firmware',
      isRead: false,
    },
    {
      id: '2',
      title: 'Cập nhật phần mềm',
      content: 'Vui lòng cập nhật phần mềm quản lý lên phiên bản mới nhất',
      timestamp: '09:45',
      type: 'software',
      isRead: true,
    },
    {
      id: '3',
      title: 'Thông báo họp nhóm',
      content: 'Cuộc họp nhóm sẽ diễn ra vào lúc 14:00 hôm nay',
      timestamp: '09:00',
      type: 'normal',
      isRead: false,
    },
  ];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'firmware':
        return '🔧';
      case 'software':
        return '💻';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'firmware':
        return '#00695c';
      case 'software':
        return '#4a148c';
      default:
        return '#283593';
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        { backgroundColor: getNotificationColor(item.type) },
        !item.isRead && styles.unreadNotification,
      ]}
      onPress={() => onSelectNotification(item)}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{getNotificationIcon(item.type)}</Text>
        {!item.isRead && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.content} numberOfLines={2}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  list: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  icon: {
    fontSize: 24,
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f44336',
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#9fa8da',
  },
  content: {
    fontSize: 14,
    color: '#c5cae9',
    lineHeight: 20,
  },
}); 