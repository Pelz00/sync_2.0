import { ArrowUp, Plus, LucideIcon } from 'lucide-react';

interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon?: LucideIcon;
}

export const stats: StatCard[] = [
  { label: 'THIS MONTH', value: '₦420,000', sub: '18%', icon: Plus },
  { label: 'OCCUPANCY', value: '87%', sub: '4 rooms', icon: ArrowUp },
  { label: 'BOOKING REQ.', value: '8', sub: '3 pending' },
  { label: 'LISTING VIEWS', value: '1,248', sub: 'past 7 days' },
];

/** Weekly revenue for the landlord dashboard chart (last 12 weeks). */
export const revenueWeekly: { week: string; revenue: number }[] = [
  { week: 'Feb W1', revenue: 3200 },
  { week: 'Feb W2', revenue: 4100 },
  { week: 'Feb W3', revenue: 3700 },
  { week: 'Mar W1', revenue: 5200 },
  { week: 'Mar W2', revenue: 4600 },
  { week: 'Mar W3', revenue: 5600 },
  { week: 'Mar W4', revenue: 5100 },
  { week: 'Apr W1', revenue: 6300 },
  { week: 'Apr W2', revenue: 6000 },
  { week: 'Apr W3', revenue: 6800 },
  { week: 'Apr W4', revenue: 6500 },
  { week: 'May W1', revenue: 7800 },
];

// Properties fake data for LandlordCards component
export type PropertyAvailability = 'available' | 'occupied' | 'review';

export interface Property {
  id: string;
  name: string;
  roomsTotal: number;
  roomsBooked: number;
  status?: 'Active' | 'Inactive';
  imageUrl?: string;
  /**
   * Extended fields for the dedicated /landlord/properties CRUD flow and the
   * Bookings/Earnings pages. Optional — anticipating the backend adding these
   * — so existing consumers (the Overview "MY HOSTELS" section) still work
   * unchanged with just the original five fields.
   */
  address?: string;
  price?: number;
  term?: 'per session' | 'per year' | 'per semester';
  roomType?: string;
  beds?: number;
  baths?: number;
  amenities?: string[];
  availability?: PropertyAvailability;
  rating?: number;
  description?: string;
  houseRules?: string;
}

export const properties: Property[] = [
  {
    id: '1',
    name: 'Tanke Crescent',
    roomsTotal: 12,
    roomsBooked: 12,
    status: 'Active' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zdGVsc3xlbnwwfHwwfHx8MA%3D%3D',
    address: 'Tanke Crescent, off Fate Road, Ilorin',
    price: 180000,
    term: 'per session',
    roomType: 'Self-contained',
    beds: 1,
    baths: 1,
    amenities: ['Wi-Fi', '24/7 Power', 'Water', 'Security'],
    availability: 'occupied',
    rating: 4.6,
  },
  {
    id: '2',
    name: 'Harmony Estate',
    roomsTotal: 8,
    roomsBooked: 6,
    status: 'Active' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9zdGVsc3xlbnwwfHwwfHx8MA%3D%3D',
    address: 'Harmony Estate, Tanke, Ilorin',
    price: 150000,
    term: 'per session',
    roomType: 'Shared room',
    beds: 2,
    baths: 1,
    amenities: ['Wi-Fi', 'Water', 'Security', 'Kitchen'],
    availability: 'available',
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Gra Layout',
    roomsTotal: 20,
    roomsBooked: 0,
    status: 'Inactive' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvc3RlbHN8ZW58MHx8MHx8fDA%3D',
    address: 'GRA Layout, Ilorin',
    price: 200000,
    term: 'per session',
    roomType: 'Single room',
    beds: 1,
    baths: 1,
    amenities: ['Wi-Fi', 'Security'],
    availability: 'review',
    rating: 0,
  },
];
