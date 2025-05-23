import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

interface ExternalMessage {
  id: string;
  title: string;
  sender: string;
  timestamp: string;
  unreadCount: number;
  avatar?: string;
}

interface ExternalMessageListProps {
  onSelectMessage: (messageId: string) => void;
}

export const ExternalMessageList: React.FC<ExternalMessageListProps> = ({
  onSelectMessage,
}) => {
  // Mock data - trong thực tế sẽ lấy từ API
  const messages: ExternalMessage[] = [
    {
      id: '1',
      title: 'Thông báo cập nhật firmware',
      sender: 'Phòng Kỹ thuật',
      timestamp: '11:30',
      unreadCount: 2,
    },
    {
      id: '2',
      title: 'Yêu cầu báo cáo tiến độ',
      sender: 'Ban Quản lý',
      timestamp: '10:45',
      unreadCount: 0,
    },
    {
      id: '3',
      title: 'Lịch họp tuần',
      sender: 'Văn phòng',
      timestamp: '09:15',
      unreadCount: 1,
    },
  ];

  const renderMessage = ({ item }: { item: ExternalMessage }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => onSelectMessage(item.id)}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={item.avatar ? { uri: item.avatar } : require('../assets/user-avatar.png')}
          style={styles.avatar}
        />
        {item.unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.sender} numberOfLines={1}>{item.sender}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tin nhắn ngoài</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
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
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#f44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
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
  sender: {
    fontSize: 14,
    color: '#c5cae9',
  },
}); 