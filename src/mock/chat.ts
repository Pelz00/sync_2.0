import { ChatContact, ChatCustomer, ChatMessage } from '@/modules/vendor/types';

export const mockContacts: ChatContact[] = [
  {
    id: '1',
    name: 'Aisha Bello',
    lastMessage: 'Is my order ready for pickup?',
    timeAgo: '2m ago',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Peter Adeyemi',
    lastMessage: 'Thank you! It was delicious 🔥',
    timeAgo: '1h ago',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Maryam Aliyu',
    lastMessage: 'Do you have Nkwobi today?',
    timeAgo: '3h ago',
    unreadCount: 1,
    isOnline: false,
  },
];

export const mockMessages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      content: 'Hi! I just placed an order. How long will it take?',
      timestamp: '10:14 AM',
      isVendor: false,
    },
    {
      id: '2',
      content: 'Hello Aisha! Your order will be ready in about 25-30 minutes. 😊',
      timestamp: '10:16 AM',
      isVendor: true,
    },
    {
      id: '3',
      content: 'Great! Can I get extra pepper on the Jollof?',
      timestamp: '10:18 AM',
      isVendor: false,
    },
    {
      id: '4',
      content: "Absolutely, no problem at all. I've noted that for you!",
      timestamp: '10:19 AM',
      isVendor: true,
    },
    { id: '5', content: 'Is my order ready for pickup?', timestamp: '10:44 AM', isVendor: false },
  ],
  '2': [
    {
      id: '1',
      content: 'Just got my order, this Suya is incredible!',
      timestamp: '9:30 AM',
      isVendor: false,
    },
    {
      id: '2',
      content: 'So glad you enjoyed it Peter! Come back anytime 🙏',
      timestamp: '9:32 AM',
      isVendor: true,
    },
    { id: '3', content: 'Thank you! It was delicious 🔥', timestamp: '9:35 AM', isVendor: false },
  ],
  '3': [
    {
      id: '1',
      content: 'Good morning! Do you have Nkwobi today?',
      timestamp: '8:00 AM',
      isVendor: false,
    },
    {
      id: '2',
      content: 'Good morning Maryam! Yes we do, available from 12pm.',
      timestamp: '8:05 AM',
      isVendor: true,
    },
    { id: '3', content: 'Do you have Nkwobi today?', timestamp: '8:10 AM', isVendor: false },
  ],
};

export const mockCustomers: Record<string, ChatCustomer> = {
  '1': {
    id: '1',
    name: 'Aisha Bello',
    location: 'Lagos Island, Lagos',
    memberSince: 'Jan 2025',
    totalOrders: 14,
    totalSpent: '₦58,400',
    recentOrders: [
      { orderId: '#ORD-5821', items: 'Jollof Rice × 2', total: '₦8,400', status: 'Processing' },
      { orderId: '#ORD-5790', items: 'Suya Combo × 1', total: '₦3,500', status: 'Completed' },
    ],
  },
  '2': {
    id: '2',
    name: 'Peter Adeyemi',
    location: 'Ikeja, Lagos',
    memberSince: 'Mar 2025',
    totalOrders: 6,
    totalSpent: '₦21,000',
    recentOrders: [
      { orderId: '#ORD-5810', items: 'Suya Combo × 2', total: '₦7,000', status: 'Completed' },
      { orderId: '#ORD-5780', items: 'Pepper Soup × 1', total: '₦4,500', status: 'Completed' },
    ],
  },
  '3': {
    id: '3',
    name: 'Maryam Aliyu',
    location: 'Surulere, Lagos',
    memberSince: 'Feb 2025',
    totalOrders: 9,
    totalSpent: '₦34,200',
    recentOrders: [
      { orderId: '#ORD-5815', items: 'Amala + Ewedu × 1', total: '₦3,200', status: 'Pending' },
      { orderId: '#ORD-5799', items: 'Nkwobi × 1', total: '₦5,500', status: 'Completed' },
    ],
  },
};
