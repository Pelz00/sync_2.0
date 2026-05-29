/**
 * Layout for /admin/* - internal admin console (Raavon team only).
 * Authorization (role=admin) enforced by middleware.ts.
 */
import {
  AlertOctagon,
  BarChart3,
  ClipboardCheck,
  LayoutDashboard,
  Newspaper,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { AdminShell, type AdminNavItem } from '@/components/layouts/admin-shell';

const ITEMS: AdminNavItem[] = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/vendors', label: 'Vendors', icon: ShieldCheck },
  { href: '/admin/verify-visits', label: 'Verification visits', icon: ClipboardCheck },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/editorial', label: 'Editorial', icon: Newspaper },
  { href: '/admin/disputes', label: 'Disputes', icon: AlertOctagon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell items={ITEMS}>{children}</AdminShell>;
}
