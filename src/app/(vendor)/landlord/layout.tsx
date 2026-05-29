/**
 * Layout for /landlord - landlord-specific dashboard. Distinct from /vendor
 * because landlords run a fundamentally different flow (long-term tenancy
 * with caution fees) and need their own navigation.
 *
 * Authorization (role=vendor, category=landlord) is enforced by middleware.ts.
 */
import {
  Building2,
  ClipboardList,
  Inbox,
  LayoutDashboard,
  ScrollText,
  Users,
  Wallet,
} from 'lucide-react';
import { VendorShell, type VendorNavItem } from '@/components/layouts/vendor-shell';

const ITEMS: VendorNavItem[] = [
  { href: '/landlord', label: 'Overview', icon: LayoutDashboard },
  { href: '/landlord/properties', label: 'Properties', icon: Building2 },
  { href: '/landlord/tenants', label: 'Tenants', icon: Users },
  { href: '/landlord/requests', label: 'Booking requests', icon: ClipboardList },
  { href: '/landlord/inbox', label: 'Inbox', icon: Inbox },
  { href: '/landlord/earnings', label: 'Earnings', icon: Wallet },
  { href: '/landlord/documents', label: 'Documents', icon: ScrollText },
];

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  return (
    <VendorShell items={ITEMS} shellLabel="Landlord">
      {children}
    </VendorShell>
  );
}
