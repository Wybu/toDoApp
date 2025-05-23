import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

interface InternalMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  type?: 'firmware' | 'software' | 'normal';
}

interface InternalMessageListProps {
  externalMessageId: string;
  onBack: () => void;
}

export const InternalMessageList: React.FC<InternalMessageListProps> = ({
  externalMessageId,
  onBack,
}) => {
  // Mock data - trong thực tế sẽ lấy từ API dựa vào externalMessageId
  const messages: InternalMessage[] = [
    {
      id: '1',
      content: 'Cập nhật firmware phiên bản 2.0.1',
      sender: {
        id: '1',
        name: 'Kỹ thuật viên A',
      },
      timestamp: '11:30',
      type: 'firmware',
    },
    {
      id: '2',
      content: 'Đã kiểm tra và xác nhận hoạt động tốt',
      sender: {
        id: '2',
        name: 'Kỹ thuật viên B',
      },
      timestamp: '11:35',
      type: 'software',
    },
    {
      id: '3',
      content: 'Ghi nhận phản hồi từ người dùng',
      sender: {
        id: '3',
        name: 'Hỗ trợ viên',
      },
      timestamp: '11:40',
    },
  ];

  const renderMessage = ({ item }: { item: InternalMessage }) => (
    <View style={[
      styles.messageItem,
      item.type === 'firmware' && styles.firmwareMessage,
      item.type === 'software' && styles.softwareMessage,
    ]}>
      <View style={styles.avatarContainer}>
        <Image
          source={item.sender.avatar ? { uri: item.sender.avatar } : require('../assets/user-avatar.png')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.sender.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tin nhắn trong</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backText: {
    fontSize: 24,
    color: '#ffffff',
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
    backgroundColor: '#283593',
  },
  firmwareMessage: {
    backgroundColor: '#00695c',
  },
  softwareMessage: {
    backgroundColor: '#4a148c',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
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