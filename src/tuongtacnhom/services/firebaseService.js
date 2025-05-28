import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const groupService = {
  // Group operations
  async createGroup(groupData, imageUri) {
    try {
      let avatarUrl = null;
      if (imageUri) {
        const reference = storage().ref(`group-avatars/${Date.now()}`);
        await reference.putFile(imageUri);
        avatarUrl = await reference.getDownloadURL();
      }

      const currentUser = auth().currentUser;
      const newGroupData = {
        ...groupData,
        avatar: avatarUrl,
        createdBy: currentUser.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        members: [currentUser.uid],
        admins: [currentUser.uid],
      };

      const groupRef = await firestore().collection('groups').add(newGroupData);
      return groupRef.id;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  },

  // Get group details
  getGroupDetails(groupId) {
    return firestore().collection('groups').doc(groupId);
  },

  // Update group
  async updateGroup(groupId, updateData) {
    try {
      await firestore()
        .collection('groups')
        .doc(groupId)
        .update({
          ...updateData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  },

  // Delete group
  async deleteGroup(groupId) {
    try {
      await firestore().collection('groups').doc(groupId).delete();
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  },

  // Get user's groups
  getUserGroups() {
    const currentUser = auth().currentUser;
    return firestore()
      .collection('groups')
      .where('members', 'array-contains', currentUser.uid);
  },

  // Get public groups
  getPublicGroups() {
    return firestore()
      .collection('groups')
      .where('isPrivate', '==', false);
  },
};

export const postService = {
  // Create post
  async createPost(groupId, postData) {
    try {
      const currentUser = auth().currentUser;
      const newPostData = {
        ...postData,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email,
        userAvatar: currentUser.photoURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
        likes: [],
        commentCount: 0,
      };

      const postRef = await firestore()
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .add(newPostData);

      return postRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Get group posts
  getGroupPosts(groupId) {
    return firestore()
      .collection('groups')
      .doc(groupId)
      .collection('posts')
      .orderBy('createdAt', 'desc');
  },

  // Toggle like
  async toggleLike(groupId, postId) {
    try {
      const currentUser = auth().currentUser;
      const postRef = firestore()
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .doc(postId);

      const post = await postRef.get();
      const likes = post.data().likes || [];
      const isLiked = likes.includes(currentUser.uid);

      await postRef.update({
        likes: isLiked
          ? firestore.FieldValue.arrayRemove(currentUser.uid)
          : firestore.FieldValue.arrayUnion(currentUser.uid),
      });
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  },
};

export const commentService = {
  // Add comment
  async addComment(groupId, postId, content) {
    try {
      const currentUser = auth().currentUser;
      const commentData = {
        content,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email,
        userAvatar: currentUser.photoURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      const batch = firestore().batch();

      // Add comment
      const commentRef = firestore()
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .doc();

      batch.set(commentRef, commentData);

      // Update comment count
      const postRef = firestore()
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .doc(postId);

      batch.update(postRef, {
        commentCount: firestore.FieldValue.increment(1),
      });

      await batch.commit();
      return commentRef.id;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  // Get post comments
  getPostComments(groupId, postId) {
    return firestore()
      .collection('groups')
      .doc(groupId)
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'desc');
  },
};

export const memberService = {
  // Add member
  async addMember(groupId, userId) {
    try {
      await firestore()
        .collection('groups')
        .doc(groupId)
        .update({
          members: firestore.FieldValue.arrayUnion(userId),
        });
    } catch (error) {
      console.error('Error adding member:', error);
      throw error;
    }
  },

  // Remove member
  async removeMember(groupId, userId) {
    try {
      const batch = firestore().batch();
      const groupRef = firestore().collection('groups').doc(groupId);

      batch.update(groupRef, {
        members: firestore.FieldValue.arrayRemove(userId),
        admins: firestore.FieldValue.arrayRemove(userId),
      });

      await batch.commit();
    } catch (error) {
      console.error('Error removing member:', error);
      throw error;
    }
  },

  // Toggle admin status
  async toggleAdmin(groupId, userId) {
    try {
      const groupRef = firestore().collection('groups').doc(groupId);
      const group = await groupRef.get();
      const admins = group.data().admins || [];
      const isAdmin = admins.includes(userId);

      await groupRef.update({
        admins: isAdmin
          ? firestore.FieldValue.arrayRemove(userId)
          : firestore.FieldValue.arrayUnion(userId),
      });
    } catch (error) {
      console.error('Error toggling admin status:', error);
      throw error;
    }
  },
};

export const notificationService = {
  // Create notification
  async createNotification(notificationData) {
    try {
      await firestore().collection('notifications').add({
        ...notificationData,
        timestamp: firestore.FieldValue.serverTimestamp(),
        read: false,
      });
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  // Get user notifications
  getUserNotifications() {
    const currentUser = auth().currentUser;
    return firestore()
      .collection('notifications')
      .where('targetUserId', '==', currentUser.uid)
      .orderBy('timestamp', 'desc');
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      await firestore()
        .collection('notifications')
        .doc(notificationId)
        .update({
          read: true,
        });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },
}; 