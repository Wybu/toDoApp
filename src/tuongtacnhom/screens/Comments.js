import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Comments = ({ route, navigation }) => {
  const { postId, groupId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribePost = firestore()
      .collection('groups')
      .doc(groupId)
      .collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        if (doc.exists) {
          setPost({ id: doc.id, ...doc.data() });
        }
        setLoading(false);
      });

    const unsubscribeComments = firestore()
      .collection('groups')
      .doc(groupId)
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const commentsData = [];
        snapshot.forEach(doc => {
          commentsData.push({ id: doc.id, ...doc.data() });
        });
        setComments(commentsData);
      });

    return () => {
      unsubscribePost();
      unsubscribeComments();
    };
  }, [groupId, postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const currentUser = auth().currentUser;
    if (!currentUser) return;

    try {
      const commentRef = await firestore()
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .add({
          content: newComment.trim(),
          userId: currentUser.uid,
          userName: currentUser.displayName || currentUser.email,
          userAvatar: currentUser.photoURL,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      // Cập nhật số lượng comment trong post
      await firestore()
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .doc(postId)
        .update({
          commentCount: firestore.FieldValue.increment(1),
        });

      // Tạo thông báo cho người đăng bài
      if (currentUser.uid !== post.userId) {
        await firestore().collection('notifications').add({
          type: 'new_comment',
          groupId,
          postId,
          commentId: commentRef.id,
          userId: currentUser.uid,
          targetUserId: post.userId,
          title: 'Bình luận mới',
          message: `${currentUser.displayName || currentUser.email} đã bình luận về bài viết của bạn`,
          timestamp: firestore.FieldValue.serverTimestamp(),
          read: false,
        });
      }

      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <Image
        source={{ uri: item.userAvatar || 'https://via.placeholder.com/40' }}
        style={styles.userAvatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.commentText}>{item.content}</Text>
        <Text style={styles.timestamp}>
          {item.createdAt?.toDate().toLocaleString() || 'Vừa xong'}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bình luận</Text>
        <View style={styles.headerRight} />
      </View>

      {post && (
        <View style={styles.postPreview}>
          <Image
            source={{ uri: post.userAvatar || 'https://via.placeholder.com/40' }}
            style={styles.postUserAvatar}
          />
          <View style={styles.postContent}>
            <Text style={styles.postUserName}>{post.userName}</Text>
            <Text style={styles.postText} numberOfLines={2}>
              {post.content}
            </Text>
          </View>
        </View>
      )}

      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.commentsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có bình luận nào</Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Viết bình luận..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !newComment.trim() && styles.disabledButton]}
          onPress={handleAddComment}
          disabled={!newComment.trim()}
        >
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  postPreview: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  postUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postContent: {
    flex: 1,
    marginLeft: 12,
  },
  postUserName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  postText: {
    fontSize: 14,
    color: '#374151',
  },
  commentsList: {
    padding: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  commentContent: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
});

export default Comments; 