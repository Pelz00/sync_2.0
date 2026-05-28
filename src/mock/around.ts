/**
 * Mock data for the /around home hub - modelled on the hi-fi design guide
 * §02 / Around you · Home Hub. Realistic Tanke / KWASU / UNILORIN copy.
 *
 * Other devs own the real hostel/event/food modules - when their queries
 * land, swap each block here for their module's live query.
 */

// ─── Personalisation (mocked) ───────────────────────────────────────
export const MOCK_USER = {
  name: 'Aisha',
  hostel: 'Tanke Crescent',
  campus: 'KWASU, Malete',
};

export const VERIFIED_SPOTS_COUNT = 412;

// ─── Quick stats (right side of hero) ───────────────────────────────
export const QUICK_STATS = [
  { value: '3', label: 'rooms left, Tanke Crescent', accent: true },
  { value: '240', label: 'students going tonight' },
  { value: '28 min', label: 'delivery, Mama Put' },
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
  slug: 'mama-put-tanke',
  name: 'Mama Put Tanke',
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
  hostel: 'Tanke Crescent',
  posts: [
    { id: '1', title: 'Anyone going to the night market? 🛒', author: 'Aisha', age: '5m' },
    { id: '2', title: 'Lost: blue ID near gate', author: 'David', age: '1h' },
    { id: '3', title: 'Free firewood-jollof on the corner', author: 'Yetunde', age: '2h' },
  ],
};

// ─── Resume booking ─────────────────────────────────────────────────
export const RESUME_BOOKING = {
  hostelSlug: 'tanke-crescent-lodge',
  hostelName: 'Tanke Crescent Lodge',
  roomsLeft: 3,
  pricePerYear: 200_000,
};
