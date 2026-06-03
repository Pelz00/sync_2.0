import { Order } from '@/types/order';
import {
  AlertTriangle,
  CircleCheckBig,
  CircleOff,
  Clock4,
  LucideIcon,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
  Truck,
} from 'lucide-react';

export interface VendorCard {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}
export const vendorStats: VendorCard[] = [
  { label: 'TOTAL REVENUE', value: '₦420,000', sub: '+18% this week', icon: TrendingUp },
  { label: 'ORDERS', value: '24', sub: '6 pending fulfillment', icon: ShoppingBag },
  { label: 'STORE RATING', value: '4.8★', sub: '132 reviews', icon: Star },
  { label: 'STOCK ALERTS', value: '3', sub: 'low / out of stock', icon: AlertTriangle },
];

export interface BookingRequest {
  name: string;
  avatarUrl?: string;
  orderId: string;
  items: string;
  total: string;
  timeAgo: string;
  deliveryType: 'pickup' | 'delivery';
  onAccept?: () => void;
  onDecline?: () => void;
}

export const bookingRequests: BookingRequest[] = [
  {
    name: 'Peter A.',
    avatarUrl:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww',
    orderId: '#ORD-2041',
    items: '2× Jollof Rice, 1× Pepsi',
    total: '₦4,500',
    timeAgo: '2h',
    deliveryType: 'delivery' as const,
  },
  {
    name: 'Muiz O.',
    avatarUrl:
      'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D',
    orderId: '#ORD-2042',
    items: '1× Suya Combo, 2× Chapman',
    total: '₦6,200',
    timeAgo: '2h',
    deliveryType: 'pickup' as const,
  },
  {
    name: 'Maryam A.',
    avatarUrl:
      'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww',
    orderId: '#ORD-2043',
    items: '3× Amala + Ewedu, 1× Zobo',
    total: '₦8,100',
    timeAgo: '3h',
    deliveryType: 'delivery' as const,
  },
];

export interface Product {
  id: string;
  name: string;
  quantityAvailable: number;
  quantitySold: number;
  status?: 'Available' | 'Sold Out';
  imageUrl?: string;
}
export const foodProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Jollof Rice',
    quantityAvailable: 50,
    quantitySold: 38,
    status: 'Available',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'prod-002',
    name: 'Suya Combo',
    quantityAvailable: 30,
    quantitySold: 27,
    status: 'Available',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'prod-003',
    name: 'Amala + Ewedu',
    quantityAvailable: 40,
    quantitySold: 15,
    status: 'Available',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'prod-004',
    name: 'Pounded Yam + Egusi',
    quantityAvailable: 35,
    quantitySold: 35,
    status: 'Available',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'prod-005',
    name: 'Pepper Soup',
    quantityAvailable: 25,
    quantitySold: 25,
    status: 'Sold Out',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'prod-006',
    name: 'Fried Rice + Chicken',
    quantityAvailable: 45,
    quantitySold: 40,
    status: 'Available',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'prod-007',
    name: 'Moi Moi',
    quantityAvailable: 60,
    quantitySold: 22,
    status: 'Available',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'prod-008',
    name: 'Akara + Ogi',
    quantityAvailable: 50,
    quantitySold: 44,
    status: 'Available',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'prod-009',
    name: 'Ofada Rice + Ayamase',
    quantityAvailable: 20,
    quantitySold: 20,
    status: 'Sold Out',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'prod-010',
    name: 'Egusi Soup + Eba',
    quantityAvailable: 30,
    quantitySold: 28,
    status: 'Available',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
];

export interface EarningsSummary {
  thisWeek: number;
  lastWeek: number;
  thisMonth: number;
  lastMonth: number;
}

export const earningsSummary: EarningsSummary[] = [
  {
    thisWeek: 10000,
    lastWeek: 9000,
    thisMonth: 50000,
    lastMonth: 45000,
  },
];

export const orderStats = [
  {
    label: 'NEW',
    value: '3',
    sub: '+18% this week',
    icon: ShoppingBag,
    iconColor: 'text-lime-deep',
  },
  {
    label: 'PROCESSING',
    value: '3',
    sub: '6 pending fulfillment',
    icon: Package,
    iconColor: 'text-yellow-500',
  },
  { label: 'SHIPPED', value: '2', icon: Truck, iconColor: 'text-blue-500' },
  { label: 'COMPLETED', value: '2', icon: CircleCheckBig, iconColor: 'text-green-500' },
  { label: 'CANCELLED', value: '1', icon: CircleOff, iconColor: 'text-red-500' },
];

export const orders: Order[] = [
  {
    id: '#1234',
    customer: 'John Doe',
    product: 'Nike Air Max',
    date: '2026-06-01',
    amount: 50000,
    payment: 'Paid',
    status: 'Delivered',
  },
  {
    id: '#1235',
    customer: 'Mary Johnson',
    product: 'iPhone 17',
    date: '2026-06-02',
    amount: 1200000,
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: '#12356',
    customer: 'Mary Johnson',
    product: 'iPhone 17',
    date: '2026-06-02',
    amount: 1200000,
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: '#123567',
    customer: 'Mary Johnson',
    product: 'iPhone 17',
    date: '2026-06-02',
    amount: 1200000,
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: '#1235678',
    customer: 'Mary Johnson',
    product: 'iPhone 17',
    date: '2026-06-02',
    amount: 1200000,
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: '#12356789',
    customer: 'Mary Johnson',
    product: 'iPhone 17',
    date: '2026-06-02',
    amount: 1200000,
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: '#123567890',
    customer: 'Mary Johnson',
    product: 'iPhone 17',
    date: '2026-06-02',
    amount: 1200000,
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: '#1235678901',
    customer: 'Mary Johnson',
    product: 'iPhone 17',
    date: '2026-06-02',
    amount: 1200000,
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: '#12356789012',
    customer: 'Mary Johnson',
    product: 'iPhone 17',
    date: '2026-06-02',
    amount: 1200000,
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: '#123567890123',
    customer: 'Mary Johnson',
    product: 'iPhone 17',
    date: '2026-06-02',
    amount: 1200000,
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: '#1235678901234',
    customer: 'Mary Johnson',
    product: 'iPhone 17',
    date: '2026-06-02',
    amount: 1200000,
    payment: 'Pending',
    status: 'Processing',
  },
];
