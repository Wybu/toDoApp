import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { GroupHeader } from './GroupHeader';

interface GroupPost {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  coverImage?: string;
}

interface GroupHomeProps {
  group: Group;
  onBack: () => void;
}

export const GroupHome: React.FC<GroupHomeProps> = ({ group, onBack }) => {
  // Mock data - trong thực tế sẽ lấy từ API
  const posts: GroupPost[] = [
    {
      id: '1',
      content: 'Đã cập nhật firmware mới cho thiết bị ABC. Mọi người cập nhật và test giúp mình nhé!',
      author: {
        id: '1',
        name: 'Kỹ thuật viên A',
      },
      timestamp: '1 giờ trước',
      likes: 5,
      comments: 2,
      isLiked: true,
    },
    {
      id: '2',
      content: 'Báo cáo kết quả test firmware mới: Hoạt động ổn định, không phát hiện lỗi.',
      author: {
        id: '2',
        name: 'Kỹ thuật viên B',
      },
      timestamp: '30 phút trước',
      likes: 3,
      comments: 1,
      isLiked: false,
    },
  ];

  const renderPost = ({ item }: { item: GroupPost }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={item.author.avatar ? { uri: item.author.avatar } : require('../assets/user-avatar.png')}
          style={styles.authorAvatar}
        />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.authorName}>{item.author.name}</Text>
          <Text style={styles.postTimestamp}>{item.timestamp}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={[styles.actionText, item.isLiked && styles.likedText]}>
            ♥ {item.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 {item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <GroupHeader
        name={group.name}
        memberCount={group.memberCount}
        onBack={onBack}
      />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.postList}
        ListHeaderComponent={() => (
          <View style={styles.groupInfo}>
            <Text style={styles.groupDescription}>{group.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  groupInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  groupDescription: {
    fontSize: 14,
    color: '#c5cae9',
    lineHeight: 20,
  },
  postList: {
    flex: 1,
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeaderInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#9fa8da',
  },
  postContent: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
  },
  actionButton: {
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    color: '#9fa8da',
  },
  likedText: {
    color: '#f44336',
  },
}); 