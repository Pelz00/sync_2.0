/**
 * Sync module registry — single source of truth for the 8 service modules
 * plus the "Around you" hub. Drives ModuleNav, the (app) sidebar, and the
 * mobile bottom nav.
 *
 * Order here is the display order in nav. Don't sort at render time.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  Calendar,
  Compass,
  Hammer,
  Scissors,
  ShoppingBag,
  Sofa,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';

export interface ModuleEntry {
  /** URL slug for `/app/<slug>`. */
  slug: string;
  /** Display label in nav. */
  label: string;
  /** Short tagline used on landing pages and the around-you hub. */
  tagline: string;
  /** Lucide icon component. */
  icon: LucideIcon;
}

export const MODULES: readonly ModuleEntry[] = [
  { slug: 'around', label: 'Around you', tagline: 'Everything nearby, right now', icon: Compass },
  { slug: 'hostels', label: 'Hostels', tagline: 'Verified rooms, no agent runaround', icon: Building2 },
  { slug: 'food', label: 'Food', tagline: 'Order from kitchens you can trust', icon: UtensilsCrossed },
  { slug: 'events', label: 'Events', tagline: 'Tickets for what’s on this week', icon: Calendar },
  { slug: 'beauty', label: 'Beauty', tagline: 'Stylists, nails, barbers — booked in a tap', icon: Sparkles },
  { slug: 'workmanship', label: 'Trades', tagline: 'Plumbers, sparks, fixers — verified', icon: Hammer },
  { slug: 'laundry', label: 'Laundry', tagline: 'Pickup & dropoff, scheduled', icon: ShoppingBag },
  { slug: 'hotspots', label: 'Hot spots', tagline: 'Lounges & spots worth knowing', icon: Sofa },
];

export const getModule = (slug: string) => MODULES.find((m) => m.slug === slug);

/** Convenience re-export for the icon-only "scissors" used in beauty submenu later. */
export { Scissors };
