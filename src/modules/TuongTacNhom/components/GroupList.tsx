import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

interface GroupListItem {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar?: string;
}

interface GroupListProps {
  onSelectGroup: (groupId: string) => void;
}

export const GroupList: React.FC<GroupListProps> = ({ onSelectGroup }) => {
  // Mock data - trong thực tế sẽ lấy từ API
  const groups: GroupListItem[] = [
    {
      id: '1',
      name: 'Nhóm Firmware A',
      lastMessage: 'Cập nhật firmware mới',
      timestamp: '11:40',
      unreadCount: 3,
    },
    {
      id: '2',
      name: 'Nhóm Phát triển B',
      lastMessage: 'Review code xong chưa?',
      timestamp: '11:20',
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Dự án C',
      lastMessage: 'Meeting lúc 2h chiều nhé',
      timestamp: '10:30',
      unreadCount: 1,
    },
  ];

  const renderGroup = ({ item }: { item: GroupListItem }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => onSelectGroup(item.id)}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={item.avatar ? { uri: item.avatar } : require('../assets/user-avatar.png')}
          style={styles.avatar}
        />
        {item.unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.groupName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh sách nhóm</Text>
      </View>
      <FlatList
        data={groups}
        renderItem={renderGroup}
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
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  list: {
    flex: 1,
  },
  groupItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#f44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  groupName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#9fa8da',
  },
  lastMessage: {
    fontSize: 14,
    color: '#c5cae9',
  },
}); 