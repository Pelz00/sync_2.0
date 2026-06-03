/**
 * Per-role dashboard sidebar navigation. Every role (vendor, landlord, admin,
 * student) gets its OWN sidebar config here - the shared <DashboardSidebar>
 * just renders whichever config it's handed by `navKey`.
 *
 * Items are grouped into labelled sections (the eyebrow headers in the sidebar,
 * e.g. "BUSINESS", "OVERSIGHT"). `badge` is an optional count pill.
 *
 * This module is icon-data only (no hooks) so it's safe to import from the
 * client <DashboardSidebar> - that avoids passing icon components across the
 * server→client boundary.
 */
import {
  AlertOctagon,
  BarChart3,
  Bell,
  Bookmark,
  Building2,
  ClipboardCheck,
  ClipboardList,
  Inbox,
  LayoutDashboard,
  List,
  Megaphone,
  MessageCircle,
  Newspaper,
  ScrollText,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  User,
  Users,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type DashboardNavKey = 'vendor' | 'landlord' | 'admin' | 'student';

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Optional count pill rendered on the right of the row. */
  badge?: number;
}

export interface DashboardNavSection {
  /** Eyebrow header above the group (omit for the primary, unlabelled group). */
  label?: string;
  items: DashboardNavItem[];
}

export interface DashboardNavConfig {
  /** Role label shown under the wordmark, e.g. "Vendor". */
  brandLabel: string;
  /** Base route for the role - used so the overview row only matches exactly. */
  rootHref: string;
  sections: DashboardNavSection[];
}

export const DASHBOARD_NAV: Record<DashboardNavKey, DashboardNavConfig> = {
  vendor: {
    brandLabel: 'Vendor',
    rootHref: '/vendor',
    sections: [
      {
        items: [
          { href: '/vendor', label: 'Overview', icon: LayoutDashboard },
          { href: '/vendor/listings', label: 'Listings', icon: List },
          { href: '/vendor/orders', label: 'Orders', icon: ShoppingBag },
          { href: '/vendor/inbox', label: 'Inbox', icon: Inbox },
        ],
      },
      {
        label: 'Business',
        items: [
          { href: '/vendor/earnings', label: 'Earnings', icon: Wallet },
          { href: '/vendor/promotions', label: 'Promotions', icon: Megaphone },
          { href: '/vendor/plan', label: 'Plan', icon: Sparkles },
        ],
      },
      {
        label: 'Account',
        items: [
          { href: '/vendor/documents', label: 'Documents', icon: ScrollText },
          { href: '/vendor/settings', label: 'Settings', icon: Settings },
        ],
      },
    ],
  },
  landlord: {
    brandLabel: 'Landlord',
    rootHref: '/landlord',
    sections: [
      {
        items: [
          { href: '/landlord', label: 'Overview', icon: LayoutDashboard },
          { href: '/landlord/properties', label: 'Properties', icon: Building2 },
          { href: '/landlord/tenants', label: 'Tenants', icon: Users },
          { href: '/landlord/requests', label: 'Booking requests', icon: ClipboardList },
          { href: '/landlord/inbox', label: 'Inbox', icon: Inbox },
        ],
      },
      {
        label: 'Business',
        items: [{ href: '/landlord/earnings', label: 'Earnings', icon: Wallet }],
      },
      {
        label: 'Account',
        items: [
          { href: '/landlord/documents', label: 'Documents', icon: ScrollText },
          { href: '/landlord/settings', label: 'Settings', icon: Settings },
        ],
      },
    ],
  },
  admin: {
    brandLabel: 'Admin',
    rootHref: '/admin',
    sections: [
      {
        items: [
          { href: '/admin', label: 'Overview', icon: LayoutDashboard },
          { href: '/admin/vendors', label: 'Vendors', icon: ShieldCheck },
          { href: '/admin/verify-visits', label: 'Verification visits', icon: ClipboardCheck },
          { href: '/admin/users', label: 'Users', icon: Users },
        ],
      },
      {
        label: 'Insights',
        items: [
          { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
          { href: '/admin/editorial', label: 'Editorial', icon: Newspaper },
        ],
      },
      {
        label: 'Oversight',
        items: [
          { href: '/admin/disputes', label: 'Disputes', icon: AlertOctagon },
          { href: '/admin/settings', label: 'Settings', icon: Settings },
        ],
      },
    ],
  },
  student: {
    brandLabel: 'Account',
    rootHref: '/me',
    sections: [
      {
        items: [
          { href: '/me', label: 'Overview', icon: LayoutDashboard },
          { href: '/me/saved', label: 'Saved', icon: Bookmark },
          { href: '/me/bookings', label: 'Bookings', icon: ClipboardList },
          { href: '/me/messages', label: 'Messages', icon: MessageCircle },
        ],
      },
      {
        label: 'Activity',
        items: [
          { href: '/me/notifications', label: 'Notifications', icon: Bell },
          { href: '/me/reviews', label: 'Reviews', icon: Star },
        ],
      },
      {
        label: 'Account',
        items: [
          { href: '/me/profile', label: 'Profile', icon: User },
          { href: '/me/settings', label: 'Settings', icon: Settings },
        ],
      },
    ],
  },
};
