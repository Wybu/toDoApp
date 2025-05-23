import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { GroupList } from './components/GroupList';
import { MessageList } from './components/MessageList';
import { NotificationList } from './components/NotificationList';
import { GroupHeader } from './components/GroupHeader';
import { ExternalMessageList } from './components/ExternalMessageList';
import { InternalMessageList } from './components/InternalMessageList';
import { GroupHome } from './components/GroupHome';

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  coverImage?: string;
}

interface TuongTacNhomScreenProps {
  navigation: any;
}

type TabType = 'groups' | 'notifications' | 'external' | 'internal';

export const TuongTacNhomScreen: React.FC<TuongTacNhomScreenProps> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('groups');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedExternalMessageId, setSelectedExternalMessageId] = useState<string | null>(null);

  // Mock data - trong thực tế sẽ lấy từ API
  const selectedGroup = selectedGroupId ? {
    id: selectedGroupId,
    name: 'Nhóm Firmware A',
    description: 'Nhóm thảo luận và chia sẻ về firmware cho các thiết bị IoT',
    memberCount: 156,
    coverImage: 'https://example.com/group-cover.jpg',
  } : null;

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
  };

  const handleSelectNotification = (notification: any) => {
    // Xử lý khi chọn thông báo
    console.log('Selected notification:', notification);
  };

  const handleSelectExternalMessage = (messageId: string) => {
    setSelectedExternalMessageId(messageId);
    setSelectedTab('internal');
  };

  const handleBackFromInternalMessages = () => {
    setSelectedExternalMessageId(null);
    setSelectedTab('external');
  };

  const handleBackFromGroup = () => {
    setSelectedGroupId(null);
  };

  const renderContent = () => {
    if (selectedTab === 'notifications') {
      return (
        <NotificationList onSelectNotification={handleSelectNotification} />
      );
    }

    if (selectedTab === 'external') {
      return (
        <ExternalMessageList onSelectMessage={handleSelectExternalMessage} />
      );
    }

    if (selectedTab === 'internal' && selectedExternalMessageId) {
      return (
        <InternalMessageList
          externalMessageId={selectedExternalMessageId}
          onBack={handleBackFromInternalMessages}
        />
      );
    }

    if (selectedGroupId && selectedGroup) {
      return (
        <GroupHome
          group={selectedGroup}
          onBack={handleBackFromGroup}
        />
      );
    }

    return (
      <GroupList onSelectGroup={handleSelectGroup} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'groups' && styles.selectedTab]}
          onPress={() => setSelectedTab('groups')}
        >
          <Text style={[styles.tabText, selectedTab === 'groups' && styles.selectedTabText]}>
            Nhóm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'notifications' && styles.selectedTab]}
          onPress={() => setSelectedTab('notifications')}
        >
          <Text style={[styles.tabText, selectedTab === 'notifications' && styles.selectedTabText]}>
            Thông báo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, (selectedTab === 'external' || selectedTab === 'internal') && styles.selectedTab]}
          onPress={() => setSelectedTab('external')}
        >
          <Text style={[styles.tabText, (selectedTab === 'external' || selectedTab === 'internal') && styles.selectedTabText]}>
            Tin nhắn
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  tabBar: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#283593',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
  },
  tabText: {
    fontSize: 16,
    color: '#c5cae9',
  },
  selectedTabText: {
    color: '#ffffff',
    fontWeight: '600',
  },
}); 