/**
 * Mock hostel data for the marketing landing and /hostels browse. Real
 * student-housing names + areas around KWASU, Malete (our launch market).
 *
 * Each entry maps cleanly to <ListingCard> props plus a few hostel-specific
 * extras (amenities chip list). Swap for `modules/hostels/queries.ts` calls
 * once Supabase + RLS are wired.
 */

export interface MockHostel {
  slug: string;
  name: string;
  /** Short location e.g. "4 min walk · KWASU Gate". */
  location: string;
  /** Hero image URL. */
  image: string;
  /** Price per session in Naira. */
  pricePerSession: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  /** Top-left ribbon: 'Top rated' / 'Verified' / 'New' / etc. */
  ribbon?: string;
  /** Amenity chips shown under the location row. */
  amenities: string[];
  /** Launch market is KWASU only for now. */
  campus: 'KWASU';
  /** Malete area/zone the hostel sits in. */
  area: 'KWASU Gate' | 'Safari' | 'Malete Town' | 'Amao' | 'Nifeskwasu';
  type: 'Self-contain' | 'Sharing' | 'Female only' | 'Male only';
}

export const MOCK_HOSTELS: MockHostel[] = [
  {
    slug: 'woss-hostel',
    name: 'Woss Hostel',
    location: '4 min walk · KWASU Gate',
    image: '/images/hostel.jpeg',
    pricePerSession: 180_000,
    rating: 4.9,
    reviewCount: 142,
    verified: true,
    ribbon: 'Top rated',
    amenities: ['Wi-Fi', 'Water', '24h light'],
    campus: 'KWASU',
    area: 'KWASU Gate',
    type: 'Self-contain',
  },
  {
    slug: 'la-marida-malete',
    name: 'La Marida Hotel',
    location: '9 min walk · Malete Town',
    image: '/images/hostel1.jpeg',
    pricePerSession: 150_000,
    rating: 4.7,
    reviewCount: 96,
    verified: true,
    ribbon: 'Verified',
    amenities: ['Wi-Fi', 'Water', '24h light'],
    campus: 'KWASU',
    area: 'Malete Town',
    type: 'Self-contain',
  },
  {
    slug: 'amina-villa',
    name: 'Amina Villa',
    location: '12 min walk · Malete Town',
    image: '/images/hostelariel.jpeg',
    pricePerSession: 95_000,
    rating: 4.6,
    reviewCount: 64,
    verified: true,
    ribbon: 'New',
    amenities: ['Wi-Fi', 'Water', '24h light'],
    campus: 'KWASU',
    area: 'Malete Town',
    type: 'Female only',
  },
  {
    slug: 'success-hostel',
    name: 'Success Hostel',
    location: '15 min walk · Malete Town',
    image: '/images/hostel1.jpeg',
    pricePerSession: 70_000,
    rating: 4.5,
    reviewCount: 38,
    verified: true,
    amenities: ['Water', '24h light'],
    campus: 'KWASU',
    area: 'Malete Town',
    type: 'Sharing',
  },
  {
    slug: 'montresor-capitol',
    name: 'MonTresor Capitol Hostel',
    location: '11 min walk · Safari',
    image: '/images/hostelariel.jpeg',
    pricePerSession: 165_000,
    rating: 4.8,
    reviewCount: 112,
    verified: true,
    amenities: ['Wi-Fi', 'Water', '24h light', 'Security'],
    campus: 'KWASU',
    area: 'Safari',
    type: 'Self-contain',
  },
  {
    slug: 'eniduro-villa',
    name: 'Eniduro Villa',
    location: '13 min walk · Malete Town',
    image: '/images/hostel.jpeg',
    pricePerSession: 110_000,
    rating: 4.6,
    reviewCount: 51,
    verified: true,
    amenities: ['Wi-Fi', 'Water'],
    campus: 'KWASU',
    area: 'Malete Town',
    type: 'Male only',
  },
];

/** Top 3 for the "Hostels students love" landing rail. */
export const FEATURED_HOSTELS = MOCK_HOSTELS.slice(0, 3);

/** Compact preview thumbnails for the hero block. */
export const HERO_THUMBS = MOCK_HOSTELS.slice(0, 3).map((h) => ({
  slug: h.slug,
  name: h.name.replace(/ (Hostel|Hotel|Villa)$/, ''),
  image: h.image,
}));

export const HOSTEL_STATS = {
  verifiedCount: 412,
  /** Launch market label - KWASU, Malete only for now. */
  market: 'KWASU, Malete',
};
