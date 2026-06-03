/**
 * Domain types for the 'vendor' module.
 * Cross-module shared types belong in @/types.
 */
export {};

export interface ChatContact {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount?: number;
  isOnline?: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  isVendor: boolean;
}

export interface ChatOrder {
  orderId: string;
  items: string;
  total: string;
  status: 'Processing' | 'Completed' | 'Cancelled' | 'Pending';
}

export interface ChatCustomer {
  id: string;
  name: string;
  avatarUrl?: string;
  location: string;
  memberSince: string;
  totalOrders: number;
  totalSpent: string;
  recentOrders: ChatOrder[];
}
