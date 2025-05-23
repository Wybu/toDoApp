import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

interface MessageListProps {
  messages?: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages = [] }) => {
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageItem}>
      <View style={styles.messageHeader}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  listContent: {
    padding: 16,
  },
  messageItem: {
    backgroundColor: '#283593',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sender: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  timestamp: {
    color: '#9fa8da',
    fontSize: 12,
  },
  content: {
    color: '#c5cae9',
    fontSize: 14,
  },
}); 