import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface MessageInputProps {
  groupId: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ groupId }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // Xử lý gửi tin nhắn ở đây
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.replyButton}>
        <Text style={styles.replyText}>Nhắn tin nhận</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#9fa8da"
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Icon
            name="send"
            size={24}
            color={message.trim() ? '#304ffe' : '#9fa8da'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a237e',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  replyButton: {
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  replyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#283593',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#ffffff',
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 