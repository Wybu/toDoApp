import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './chatstyles';

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user's chat rooms
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    const unsubscribe = firestore()
      .collection('chatRooms')
      .where('participants', 'array-contains', currentUser.uid)
      .onSnapshot(snapshot => {
        const rooms = [];
        snapshot.forEach(doc => {
          rooms.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setChatRooms(rooms);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  // Fetch messages for current room
  useEffect(() => {
    if (!currentRoom) return;

    const unsubscribe = firestore()
      .collection('chatRooms')
      .doc(currentRoom.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .onSnapshot(snapshot => {
        const newMessages = [];
        snapshot.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setMessages(newMessages);
      });

    return () => unsubscribe();
  }, [currentRoom]);

  const handleSend = async () => {
    if (!inputMessage.trim() || !currentRoom) return;

    const currentUser = auth().currentUser;
    if (!currentUser) return;

    try {
      await firestore()
        .collection('chatRooms')
        .doc(currentRoom.id)
        .collection('messages')
        .add({
          text: inputMessage.trim(),
          senderId: currentUser.uid,
          senderName: currentUser.displayName || currentUser.email,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Lỗi', 'Không thể gửi tin nhắn');
    }
  };

  const selectRoom = (room) => {
    setCurrentRoom(room);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessage = ({ item }) => {
    const currentUser = auth().currentUser;
    const isOwnMessage = item.senderId === currentUser?.uid;

    return (
      <View style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.otherMessage
      ]}>
        {!isOwnMessage && (
          <Text style={styles.senderName}>{item.senderName}</Text>
        )}
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
      </View>
    );
  };

  const renderChatRoom = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.roomItem,
        currentRoom?.id === item.id && styles.selectedRoom
      ]}
      onPress={() => selectRoom(item)}
    >
      <Image
        source={{uri: item.icon || "https://via.placeholder.com/40"}}
        style={styles.roomIcon}
      />
      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomLastMessage} numberOfLines={1}>
          {item.lastMessage || 'Chưa có tin nhắn'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      <View style={styles.content}>
        {/* Chat rooms list */}
        <View style={styles.roomsList}>
          <FlatList
            data={chatRooms}
            renderItem={renderChatRoom}
            keyExtractor={item => item.id}
            horizontal={false}
          />
        </View>

        {/* Chat messages area */}
        <View style={styles.chatArea}>
          {currentRoom ? (
            <>
              <View style={styles.chatHeader}>
                <Text style={styles.chatRoomName}>{currentRoom.name}</Text>
              </View>
              <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                inverted
                style={styles.messagesList}
              />
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
              >
                <TextInput
                  style={styles.input}
                  value={inputMessage}
                  onChangeText={setInputMessage}
                  placeholder="Nhập tin nhắn..."
                  multiline
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSend}
                >
                  <Text style={styles.sendButtonText}>Gửi</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </>
          ) : (
            <View style={styles.noChatSelected}>
              <Text>Chọn một cuộc trò chuyện để bắt đầu</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen; 