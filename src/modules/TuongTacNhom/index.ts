// Screens
export { TuongTacNhomScreen } from './screens/TuongTacNhomScreen';

// Components
export { GroupList } from './components/GroupList';
export { GroupHeader } from './components/GroupHeader';
export { MessageList } from './components/MessageList';
export { NotificationList } from './components/NotificationList';
export { ExternalMessageList } from './components/ExternalMessageList';
export { InternalMessageList } from './components/InternalMessageList';
export { GroupHome } from './components/GroupHome';
export { GroupPost } from './components/GroupPost';

// Types
export type { Post } from './components/GroupPost';
export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  coverImage?: string;
}

export interface ExternalMessage {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  hasInternalMessages: boolean;
}

export interface InternalMessage {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'firmware' | 'software' | 'normal';
  timestamp: string;
  isRead: boolean;
} 