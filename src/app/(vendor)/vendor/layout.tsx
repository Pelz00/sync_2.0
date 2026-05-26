/**
 * Layout for /vendor/* (generic vendor dashboard — food, beauty, trades,
 * laundry, events). The landlord variant has its own layout at
 * /landlord/layout.tsx so the two can diverge cleanly.
 *
 * Authorization (role=vendor) is enforced by middleware.ts.
 */
import {
  Inbox,
  LayoutDashboard,
  List,
  Megaphone,
  ScrollText,
  ShoppingBag,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { VendorShell, type VendorNavItem } from '@/components/layouts/vendor-shell';

const ITEMS: VendorNavItem[] = [
  { href: '/vendor', label: 'Overview', icon: LayoutDashboard },
  { href: '/vendor/listings', label: 'Listings', icon: List },
  { href: '/vendor/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/vendor/inbox', label: 'Inbox', icon: Inbox },
  { href: '/vendor/earnings', label: 'Earnings', icon: Wallet },
  { href: '/vendor/promotions', label: 'Promotions', icon: Megaphone },
  { href: '/vendor/plan', label: 'Plan', icon: Sparkles },
  { href: '/vendor/documents', label: 'Documents', icon: ScrollText },
];

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <VendorShell items={ITEMS} shellLabel="Vendor">
      {children}
    </VendorShell>
  );
}
