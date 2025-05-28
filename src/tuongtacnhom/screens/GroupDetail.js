import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const GroupDetail = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [group, setGroup] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeGroup = firestore()
      .collection('groups')
      .doc(groupId)
      .onSnapshot(doc => {
        if (doc.exists) {
          setGroup({ id: doc.id, ...doc.data() });
        } else {
          Alert.alert('Lỗi', 'Không tìm thấy nhóm');
          navigation.goBack();
        }
        setLoading(false);
      });

    const unsubscribePosts = firestore()
      .collection('groups')
      .doc(groupId)
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const postsData = [];
        snapshot.forEach(doc => {
          postsData.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postsData);
      });

    return () => {
      unsubscribeGroup();
      unsubscribePosts();
    };
  }, [groupId]);

  const handlePost = async () => {
    if (!newPost.trim()) return;

    const currentUser = auth().currentUser;
    if (!currentUser) return;

    try {
      await firestore()
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .add({
          content: newPost.trim(),
          userId: currentUser.uid,
          userName: currentUser.displayName || currentUser.email,
          userAvatar: currentUser.photoURL,
          createdAt: firestore.FieldValue.serverTimestamp(),
          likes: [],
          comments: [],
        });

      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Lỗi', 'Không thể đăng bài');
    }
  };

  const handleLike = async (postId) => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    const postRef = firestore()
      .collection('groups')
      .doc(groupId)
      .collection('posts')
      .doc(postId);

    const post = posts.find(p => p.id === postId);
    const likes = post.likes || [];
    const userLiked = likes.includes(currentUser.uid);

    try {
      await postRef.update({
        likes: userLiked
          ? firestore.FieldValue.arrayRemove(currentUser.uid)
          : firestore.FieldValue.arrayUnion(currentUser.uid),
      });
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const renderPost = ({ item }) => {
    const currentUser = auth().currentUser;
    const isLiked = item.likes?.includes(currentUser?.uid);

    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image
            source={{ uri: item.userAvatar || 'https://via.placeholder.com/40' }}
            style={styles.userAvatar}
          />
          <View style={styles.postHeaderInfo}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.postTime}>
              {item.createdAt?.toDate().toLocaleString() || 'Vừa xong'}
            </Text>
          </View>
        </View>

        <Text style={styles.postContent}>{item.content}</Text>

        <View style={styles.postActions}>
          <TouchableOpacity
            style={[styles.actionButton, isLiked && styles.likedButton]}
            onPress={() => handleLike(item.id)}
          >
            <Text style={[styles.actionText, isLiked && styles.likedText]}>
              ❤️ {item.likes?.length || 0}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Comments', { postId: item.id, groupId })}
          >
            <Text style={styles.actionText}>
              💬 {item.comments?.length || 0}
            </Text>
          </TouchableOpacity>
        </View>
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{group?.name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('GroupMembers', { groupId })}
        >
          <Text style={styles.membersButton}>
            👥 {group?.members?.length || 0}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.createPost}>
            <TextInput
              style={styles.input}
              placeholder="Chia sẻ điều gì đó với nhóm..."
              value={newPost}
              onChangeText={setNewPost}
              multiline
            />
            <TouchableOpacity
              style={styles.postButton}
              onPress={handlePost}
            >
              <Text style={styles.postButtonText}>Đăng</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
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
  membersButton: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  createPost: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeaderInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  postTime: {
    fontSize: 12,
    color: '#666666',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    color: '#666666',
    marginLeft: 4,
  },
  likedButton: {
    opacity: 1,
  },
  likedText: {
    color: '#e11d48',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GroupDetail; 