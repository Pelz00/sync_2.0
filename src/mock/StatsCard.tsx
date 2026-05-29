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

// Properties fake data for LandlordCards component
export interface Property {
  id: string;
  name: string;
  roomsTotal: number;
  roomsBooked: number;
  status?: 'Active' | 'Inactive';
  imageUrl?: string;
}

export const properties: Property[] = [
  {
    id: '1',
    name: 'Tanke Crescent',
    roomsTotal: 12,
    roomsBooked: 4,
    status: 'Active' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zdGVsc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '2',
    name: 'Harmony Estate',
    roomsTotal: 8,
    roomsBooked: 6,
    status: 'Active' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9zdGVsc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '3',
    name: 'Gra Layout',
    roomsTotal: 20,
    roomsBooked: 11,
    status: 'Inactive' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvc3RlbHN8ZW58MHx8MHx8fDA%3D',
  },
];
