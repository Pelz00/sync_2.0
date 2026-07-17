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
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Inbox,
  LayoutDashboard,
  List,
  Megaphone,
  Newspaper,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  TicketIcon,
  TrendingUp,
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
  /** Descriptive page title for the header (falls back to `label`). */
  heading?: string;
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

/**
 * The nav item the current path falls under (longest-prefix match), resolving
 * handle-based hrefs the same way the sidebar does. Used by the header to show
 * "what screen we're on": `label` for the breadcrumb, `heading` for the big
 * title. Falls back to the role's brand label.
 */
export function activeNav(
  navKey: DashboardNavKey,
  pathname: string,
  handle?: string,
): { label: string; heading: string } {
  const { sections, brandLabel, rootHref } = DASHBOARD_NAV[navKey];
  const toHref = (href: string) => (handle ? `/${handle}${href.slice(rootHref.length)}` : href);
  let label = brandLabel;
  let heading = brandLabel;
  let bestLen = -1;
  for (const section of sections) {
    for (const item of section.items) {
      const href = toHref(item.href);
      if ((pathname === href || pathname.startsWith(href + '/')) && href.length > bestLen) {
        label = item.label;
        heading = item.heading ?? item.label;
        bestLen = href.length;
      }
    }
  }
  return { label, heading };
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
        items: [{ href: '/vendor/settings', label: 'Settings', icon: Settings }],
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
        items: [{ href: '/landlord/settings', label: 'Settings', icon: Settings }],
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
          { href: '/admin/landlord', label: '  Landlords', icon: Building2},
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
          { href: '/me', label: 'Overview', heading: 'Your dashboard', icon: LayoutDashboard },
          {
            href: '/me/insights',
            label: 'Insights',
            heading: 'Your spending & usage',
            icon: TrendingUp,
          },
          { href: '/me/wallet', label: 'Wallet', heading: 'Your wallet', icon: Wallet },
          { href: '/me/saved', label: 'Saved', heading: 'Saved places', icon: Bookmark },
          {
            href: '/me/bookings',
            label: 'Bookings',
            heading: 'Your bookings',
            icon: ClipboardList,
          },
        ],
      },
      {
        label: 'Activity',
        items: [
          { href: '/me/events', label: 'Events', heading: 'Your events', icon: CalendarDays },
          { href: '/me/tickets', label: 'Tickets', heading: 'Your tickets', icon: TicketIcon },
          {
            href: '/me/notifications',
            label: 'Notifications',
            heading: 'Notifications',
            icon: Bell,
          },
          { href: '/me/reviews', label: 'Reviews', heading: 'Your reviews', icon: Star },
        ],
      },
    ],
  },
};
