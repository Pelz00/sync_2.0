/**
 * Mock hostel data for the marketing landing and /hostels browse. Realistic
 * Nigerian student-housing names/locations around KWASU + UNILORIN.
 *
 * Each entry maps cleanly to <ListingCard> props plus a few hostel-specific
 * extras (amenities chip list). Swap for `modules/hostels/queries.ts` calls
 * once Supabase + RLS are wired.
 */

export interface MockHostel {
  slug: string;
  name: string;
  /** Short location e.g. "6 min walk · UNILORIN PG". */
  location: string;
  /** Hero image URL. Unsplash for now. */
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
  campus: 'UNILORIN PG' | 'UNILORIN Main' | 'KWASU' | 'Al-Hikmah' | 'Ilorin Poly';
  type: 'Self-contain' | 'Sharing' | 'Female only' | 'Male only';
}

export const MOCK_HOSTELS: MockHostel[] = [
  {
    slug: 'tanke-crescent-lodge',
    name: 'Tanke Crescent Lodge',
    location: '6 min walk · UNILORIN PG',
    image: '/images/hostel.jpeg',
    pricePerSession: 180_000,
    rating: 4.9,
    reviewCount: 142,
    verified: true,
    ribbon: 'Top rated',
    amenities: ['Wi-Fi', 'Water', '24h light'],
    campus: 'UNILORIN PG',
    type: 'Self-contain',
  },
  {
    slug: 'safari-self-contain',
    name: 'Safari Self-Contain',
    location: '8 min walk · UNILORIN',
    image: '/images/hostel1.jpeg',
    pricePerSession: 150_000,
    rating: 4.7,
    reviewCount: 96,
    verified: true,
    ribbon: 'Verified',
    amenities: ['Wi-Fi', 'Water', '24h light'],
    campus: 'UNILORIN Main',
    type: 'Self-contain',
  },
  {
    slug: 'oke-odo-female-hall',
    name: 'Oke-Odo Female Hall',
    location: '12 min walk · KWASU shuttle',
    image: '/images/hostelariel.jpeg',
    pricePerSession: 95_000,
    rating: 4.6,
    reviewCount: 64,
    verified: true,
    ribbon: 'New',
    amenities: ['Wi-Fi', 'Water', '24h light'],
    campus: 'KWASU',
    type: 'Female only',
  },
  {
    slug: 'pipeline-court',
    name: 'Pipeline Court',
    location: '14 min walk · Ilorin Poly',
    image: '/images/hostel1.jpeg',
    pricePerSession: 70_000,
    rating: 4.5,
    reviewCount: 38,
    verified: true,
    amenities: ['Water', '24h light'],
    campus: 'Ilorin Poly',
    type: 'Sharing',
  },
  {
    slug: 'basin-view-lodge',
    name: 'Basin View Lodge',
    location: '9 min walk · UNILORIN PG',
    image: '/images/hostelariel.jpeg',
    pricePerSession: 165_000,
    rating: 4.8,
    reviewCount: 112,
    verified: true,
    amenities: ['Wi-Fi', 'Water', '24h light', 'Security'],
    campus: 'UNILORIN PG',
    type: 'Self-contain',
  },
  {
    slug: 'al-hikmah-male-block',
    name: 'Al-Hikmah Male Block',
    location: '11 min walk · Al-Hikmah',
    image: '/images/hostel.jpeg',
    pricePerSession: 110_000,
    rating: 4.6,
    reviewCount: 51,
    verified: true,
    amenities: ['Wi-Fi', 'Water'],
    campus: 'Al-Hikmah',
    type: 'Male only',
  },
];

/** Top 3 for the "Hostels students love" landing rail. */
export const FEATURED_HOSTELS = MOCK_HOSTELS.slice(0, 3);

/** Compact preview thumbnails for the hero block. */
export const HERO_THUMBS = MOCK_HOSTELS.slice(0, 3).map((h) => ({
  slug: h.slug,
  name: h.name.replace(/ (Lodge|Self-Contain|Hall)$/, ''),
  image: h.image,
}));

export const HOSTEL_STATS = {
  verifiedCount: 412,
  campusCount: 4,
};

export interface Hostel {
  id: string;
  name: string;
  price: number;
  distanceMinutes: number;
  landmark: string;
  imageUrl?: string;
}

export const hostels: Hostel[] = [
  {
    id: '1',
    name: 'Hostel 1',
    price: 165000,
    distanceMinutes: 5,
    landmark: 'UNILORIN',
    imageUrl:
      'https://images.unsplash.com/photo-1633411187642-f84216917af1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvc3RlbHN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '2',
    name: 'Hostel 2',
    price: 150000,
    distanceMinutes: 6,
    landmark: 'UNILORIN',
    imageUrl:
      'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvc3RlbHN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '3',
    name: 'Hostel 3',
    price: 135000,
    distanceMinutes: 7,
    landmark: 'UNILORIN',
    imageUrl:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zdGVsc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '4',
    name: 'Hostel 3',
    price: 135000,
    distanceMinutes: 7,
    landmark: 'UNILORIN',
    imageUrl:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zdGVsc3xlbnwwfHwwfHx8MA%3D%3D',
  },
];
