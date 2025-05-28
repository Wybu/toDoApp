import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const GroupCard = ({
  group,
  onPress,
  onJoin,
  showJoinButton = false,
  isMember = false,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(group)}>
      <Image
        source={{ uri: group.avatar || 'https://via.placeholder.com/50' }}
        style={styles.avatar}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{group.name}</Text>
        <Text style={styles.memberCount}>
          {group.members?.length || 0} thành viên
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {group.description || 'Chưa có mô tả'}
        </Text>
      </View>
      {showJoinButton && (
        <TouchableOpacity
          style={[styles.joinButton, isMember && styles.joinedButton]}
          onPress={() => onJoin(group)}
        >
          <Text style={[styles.joinButtonText, isMember && styles.joinedButtonText]}>
            {isMember ? 'Đã tham gia' : 'Tham gia'}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1e3a8a',
  },
  memberCount: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666666',
  },
  joinButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: '#E5E7EB',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  joinedButtonText: {
    color: '#374151',
  },
});

export default GroupCard; 