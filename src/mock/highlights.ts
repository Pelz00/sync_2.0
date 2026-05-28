/**
 * Hero highlights pool — a mix across every Sync service so the landing's
 * featured card varies per load (one visitor sees a party as the big card,
 * another sees a hostel). Shuffled client-side by <HeroHighlights>.
 *
 * Add more entries as other module owners ship real imagery; the component
 * picks 1 big + 3 thumbnails from whatever is here.
 */

export interface Highlight {
  id: string;
  /** Service label shown as the card badge (Hostel / Event / Food / Hot spot). */
  service: string;
  title: string;
  /** Short meta line (price, time, etc.). */
  meta: string;
  image: string;
  href: string;
}

export const HIGHLIGHTS: Highlight[] = [
  {
    id: 'freshers-night',
    service: 'Event',
    title: "Fresher's Night '26",
    meta: 'Tonight · 8pm · from ₦3,500',
    image: '/images/party.jpeg',
    href: '/events/freshers-night-26',
  },
  {
    id: 'tanke-crescent',
    service: 'Hostel',
    title: 'Tanke Crescent Lodge',
    meta: 'UNILORIN PG · from ₦180k',
    image: '/images/hostel.jpeg',
    href: '/hostels/tanke-crescent-lodge',
  },
  {
    id: 'safari',
    service: 'Hostel',
    title: 'Safari Self-Contain',
    meta: 'UNILORIN · from ₦150k',
    image: '/images/hostel1.jpeg',
    href: '/hostels/safari-self-contain',
  },
  {
    id: 'oke-odo',
    service: 'Hostel',
    title: 'Oke-Odo Female Hall',
    meta: 'KWASU shuttle · from ₦95k',
    image: '/images/hostelariel.jpeg',
    href: '/hostels/oke-odo-female-hall',
  },
  {
    id: 'campus-aerial',
    service: 'Around you',
    title: 'Everything around campus',
    meta: '412 verified spots near you',
    image: '/images/background.jpeg',
    href: '/around',
  },
];
