import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  images?: string[];
  timestamp: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

interface GroupPostProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
}

export const GroupPost: React.FC<GroupPostProps> = ({
  post,
  onLike,
  onComment,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={post.author.avatar ? { uri: post.author.avatar } : require('../assets/user-avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.authorName}>{post.author.name}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.images && post.images.length > 0 && (
        <View style={styles.imageContainer}>
          {post.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.postImage}
              resizeMode="cover"
            />
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionButton, post.isLiked && styles.likedButton]}
          onPress={() => onLike?.(post.id)}
        >
          <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
            👍 {post.likeCount} Thích
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onComment?.(post.id)}
        >
          <Text style={styles.actionText}>
            💬 {post.commentCount} Bình luận
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#283593',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    marginLeft: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  timestamp: {
    fontSize: 12,
    color: '#9fa8da',
    marginTop: 2,
  },
  content: {
    fontSize: 14,
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingBottom: 12,
    lineHeight: 20,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16/9,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#c5cae9',
  },
  likedButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
  },
  likedText: {
    color: '#64b5f6',
  },
}); 