export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  coverImage?: string;
  createdAt: Date;
  createdBy: string;
  members: string[]; // array of user IDs
}

export interface Message {
  id: string;
  groupId: string;
  content: string;
  createdAt: Date;
  createdBy: string;
  type: 'text' | 'image' | 'file';
  attachments?: string[]; // URLs for attachments
}

export interface Notification {
  id: string;
  groupId: string;
  type: 'new_message' | 'new_member' | 'group_update';
  content: string;
  createdAt: Date;
  isRead: boolean;
  userId: string; // người nhận thông báo
} 