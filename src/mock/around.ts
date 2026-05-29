/**
 * Mock data for the /around home hub - modelled on the hi-fi design guide
 * section 02 / Around you · Home Hub. Realistic Tanke / KWASU / UNILORIN copy.
 *
 * Other devs own the real hostel/event/food modules - when their queries
 * land, swap each block here for their module's live query.
 */

// ─── Personalisation (mocked) ───────────────────────────────────────
export const MOCK_USER = {
  name: 'Aisha',
  hostel: 'Woss Hostel',
  campus: 'KWASU, Malete',
};

export const VERIFIED_SPOTS_COUNT = 412;

// ─── Quick stats (right side of hero) ───────────────────────────────
export const QUICK_STATS = [
  { value: '3', label: 'rooms left, Woss Hostel', accent: true },
  { value: '240', label: 'students going tonight' },
  { value: '28 min', label: 'delivery, Mama Put Malete' },
];

// ─── Featured event (left column hero card) ─────────────────────────
export const FEATURED_EVENT = {
  slug: 'freshers-night-26',
  title: "Fresher's Night",
  performer: 'Phyno live',
  category: 'Concert · 18+',
  venue: 'KWASU Sports Hall · 3 min walk',
  when: 'Tonight · 8pm',
  priceFrom: 3500,
  goingCount: 240,
  friendsGoing: 38,
};

// ─── Food card ──────────────────────────────────────────────────────
export const FEATURED_FOOD = {
  slug: 'mama-put-malete',
  name: 'Mama Put Malete',
  etaMinutes: 20,
  rating: 4.8,
  priceTier: '₦',
  cuisine: 'Jollof · amala · gizdodo',
  promos: ['2-for-1 today', 'Free delivery'],
  priceFrom: 800,
};

// ─── Laundry promo ──────────────────────────────────────────────────
export const LAUNDRY_PROMO = {
  headlineParts: { lead: 'Drop a bag,', tail: 'get it back', accent: 'Sunday.' },
  perPiecePrice: 150,
  pickupLine: 'Free pickup',
  nextSlot: '4pm',
};

// ─── Sponsored slot (MTN) ───────────────────────────────────────────
export const SPONSORED_SLOT = {
  brand: 'MTN',
  headlineLead: '500MB free',
  headlineTail: 'every Saturday.',
  body: 'For KWASU students. Dial *345*99# to claim.',
  ctaLabel: 'Claim now',
  ctaHref: 'tel:*345*99#',
};

// ─── Hotspots trending ──────────────────────────────────────────────
export const HOTSPOTS_TRENDING = [
  {
    slug: 'cuisine-and-co-lounge',
    name: 'Cuisine & Co. Lounge',
    meta: 'Basin · ₦₦',
    hereCount: 84,
  },
  {
    slug: 'suya-spot-malete',
    name: 'Suya Spot Malete',
    meta: 'Junction · ₦',
    hereCount: 42,
  },
  {
    slug: 'asun-and-chill',
    name: 'Asun & Chill',
    meta: 'Town · ₦₦',
    hereCount: 31,
  },
];

// ─── Hostel board posts ─────────────────────────────────────────────
export const HOSTEL_BOARD = {
  hostel: 'Woss Hostel',
  posts: [
    { id: '1', title: 'Anyone going to the night market? 🛒', author: 'Aisha', age: '5m' },
    { id: '2', title: 'Lost: blue ID near gate', author: 'David', age: '1h' },
    { id: '3', title: 'Free firewood-jollof on the corner', author: 'Yetunde', age: '2h' },
  ],
};

// ─── Resume booking ─────────────────────────────────────────────────
export const RESUME_BOOKING = {
  hostelSlug: 'woss-hostel',
  hostelName: 'Woss Hostel',
  roomsLeft: 3,
  pricePerYear: 200_000,
};

// ─── Malete areas (location dropdown in the services dock) ──────────
export const MALETE_AREAS = [
  'Safari, Malete',
  'Malete Town',
  'KWASU Gate',
  'Amao',
  'Nifeskwasu',
] as const;

// ─── Nearby map drop-points (stylised spatial view) ─────────────────
// Mock geo for the AroundMap. `x`/`y` are positions on the mock surface as a
// percentage (0–100); `distance` is how far from the student. Swap for real
// coordinates when the map SDK + geo data land.
export type NearbyCategory =
  | 'hostel'
  | 'food'
  | 'event'
  | 'hotspot'
  | 'beauty'
  | 'workmanship'
  | 'laundry';

export interface NearbyPin {
  id: string;
  category: NearbyCategory;
  /** Place name, shown in the marker tooltip. */
  name: string;
  /** Distance from the user, e.g. "400m" or "1.2km". */
  distance: string;
  href: string;
  /** Real-world coordinates [lat, lng] for the Leaflet map. */
  lat: number;
  lng: number;
  /** The single lime-highlighted "best match" pin. */
  featured?: boolean;
}

// Approximate coordinates around KWASU, Malete (Kwara). Tune as needed - the
// campus gate sits NE of the Malete Town / Safari student-housing belt.
/** Default map view: centred on the student belt, town + gate in frame. */
export const MAP_VIEW = { center: [8.7138, 4.4466] as [number, number], zoom: 15 };

/** KWASU campus gate marker. */
export const MAP_CAMPUS_POINT = { label: 'KWASU, Malete', lat: 8.7178, lng: 4.4496 };

/** Where each area re-centres the map when picked in the location dropdown. */
export const AREA_COORDS: Record<(typeof MALETE_AREAS)[number], [number, number]> = {
  'Safari, Malete': [8.7138, 4.4462],
  'Malete Town': [8.7105, 4.4452],
  'KWASU Gate': [8.7162, 4.4478],
  Amao: [8.7128, 4.4398],
  Nifeskwasu: [8.7196, 4.4436],
};

export const NEARBY_PINS: NearbyPin[] = [
  // Hostels - Woss closest to the gate, others through Malete Town / Safari.
  { id: 'woss', category: 'hostel', name: 'Woss Hostel', distance: '300m', href: '/hostels/woss-hostel', lat: 8.7152, lng: 4.4478, featured: true },
  { id: 'la-marida', category: 'hostel', name: 'La Marida Hotel', distance: '650m', href: '/hostels/la-marida-malete', lat: 8.7108, lng: 4.4472 },
  { id: 'montresor', category: 'hostel', name: 'MonTresor Capitol', distance: '1.0km', href: '/hostels/montresor-capitol', lat: 8.7094, lng: 4.4436 },
  // Food - Arena eatery by the gate road.
  { id: 'arena', category: 'food', name: 'Arena · jollof & gizdodo', distance: '250m', href: '/food', lat: 8.7148, lng: 4.4468 },
  // Event - Fresher's Night at the KWASU Sports Hall (campus).
  { id: 'freshers', category: 'event', name: "Fresher's Night", distance: '700m', href: '/events', lat: 8.7172, lng: 4.4490 },
  { id: 'braids', category: 'beauty', name: 'Braids & nails', distance: '400m', href: '/beauty', lat: 8.7126, lng: 4.4452 },
  { id: 'plumber', category: 'workmanship', name: 'Verified plumber', distance: '600m', href: '/workmanship', lat: 8.7112, lng: 4.4482 },
  { id: 'laundry', category: 'laundry', name: 'Laundry pickup', distance: '200m', href: '/laundry', lat: 8.7142, lng: 4.4458 },
  { id: 'asun', category: 'hotspot', name: 'Asun & Chill', distance: '900m', href: '/hotspots', lat: 8.7136, lng: 4.4520 },
];
