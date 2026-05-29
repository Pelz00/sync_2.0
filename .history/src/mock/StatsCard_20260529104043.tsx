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
