/**
 * ROUTE: /landlord
 * ACCESS: authenticated vendor (category=landlord)
 * PURPOSE: Landlord dashboard overview — KPIs, booking requests, revenue, hostels.
 *
 * Same shared design as every other dashboard via <RoleDashboard variant="landlord">.
 * This page only supplies landlord *data* (KPIs, booking requests, chart) and the
 * landlord-specific lower section (hostels).
 */
import type { Metadata } from 'next';
import type { PendingRequestItem } from '@/components/dashboard/pending-request-card';
import { getDashboardProfile } from '@/components/layouts/dashboard-profile';
import { properties, revenueWeekly } from '@/mock/StatsCard';
import { LandlordOverview } from './(components)/landlord-overview';

export const metadata: Metadata = { title: 'Landlord dashboard' };

const pending: PendingRequestItem[] = [
  {
    id: 'aisha-o',
    name: 'Aisha O.',
    avatarUrl:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww',
    tags: ['Tanke Crescent', '3B', '2h'],
  },
  {
    id: 'maryam-a',
    name: 'Maryam A.',
    avatarUrl:
      'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D',
    tags: ['Tanke Crescent', '1A', '2h'],
  },
  {
    id: 'muiz-o',
    name: 'Muiz O.',
    avatarUrl:
      'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww',
    tags: ['Tanke Crescent', '3B', '2h'],
  },
];

export default function Page() {
  return <LandlordPage />;
}

async function LandlordPage() {
  const profile = await getDashboardProfile('landlord');
  return (
    <LandlordOverview
      name={profile.name}
      pending={pending}
      chart={revenueWeekly}
      properties={properties}
    />
  );
}
