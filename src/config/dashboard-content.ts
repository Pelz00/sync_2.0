/**
 * Per-variant CONTENT for the shared dashboard overview. The layout/design lives
 * once in <RoleDashboard>; this module only supplies the words (and an optional
 * CTA) that differ between vendor types. Data (KPIs, pending rows, chart) is
 * passed in by each route's page from its own source.
 *
 * Icon-data only (no hooks/JSX) so it stays cheap to import on the server.
 */
import { Megaphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type DashboardVariant = 'vendor' | 'landlord';

export interface DashboardContentConfig {
  /** Eyebrow prefix, e.g. "VENDOR DASHBOARD" (store name is appended live). */
  eyebrow: string;
  /** Headline split into a plain lead and an accent-coloured tail, given the count. */
  headline: (count: number) => { lead: string; accent: string };
  /** Title above the pending list, e.g. "Pending orders". */
  pendingTitle: string;
  /** "View all" target for the pending list. */
  pendingViewAllHref?: string;
  /** Optional primary CTA shown by the headline (vendor advertises; landlord doesn't). */
  action?: { label: string; href: string; icon: LucideIcon };
  /** Badge text shown when the account isn't verified yet. */
  unverifiedBadge: string;
}

export const DASHBOARD_CONTENT: Record<DashboardVariant, DashboardContentConfig> = {
  vendor: {
    eyebrow: 'VENDOR DASHBOARD',
    headline: (count) => ({ lead: `${count} new`, accent: 'orders.' }),
    pendingTitle: 'Pending orders',
    pendingViewAllHref: '/vendor/orders',
    action: { label: 'Advertise now', href: '/vendor/promotions', icon: Megaphone },
    unverifiedBadge: 'Verify your store',
  },
  landlord: {
    eyebrow: 'LANDLORD DASHBOARD',
    headline: (count) => ({ lead: `${count} new requests`, accent: 'this week.' }),
    pendingTitle: 'Pending booking requests',
    pendingViewAllHref: '/landlord/requests',
    unverifiedBadge: 'Verify your account',
  },
};
