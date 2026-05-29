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
    imageUrl: 'https://unsplash.com/photos/black-metal-bunk-bed-WQJvWU_HZFo',
  },
  {
    id: '2',
    name: 'Harmony Estate',
    roomsTotal: 8,
    roomsBooked: 6,
    status: 'Active' as const,
    imageUrl:
      'https://unsplash.com/photos/a-couple-of-beds-sitting-in-a-bedroom-next-to-a-window-NHVI1dkl6WU',
  },
  {
    id: '3',
    name: 'Gra Layout',
    roomsTotal: 20,
    roomsBooked: 11,
    status: 'Inactive' as const,
    imageUrl:
      'https://unsplash.com/photos/a-room-filled-with-lots-of-bunk-beds-next-to-a-window-TzMGehZmocI',
  },
];
