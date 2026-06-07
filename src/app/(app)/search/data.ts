// ─── Types ────────────────────────────────────────────────────────────────────

export type RoomType = "Self-contain" | "Single" | "Shared" | "Bedsitter" | "Mini-flat";

export type Amenity =
  | "Wi-Fi"
  | "24h light"
  | "Borehole water"
  | "CCTV"
  | "Inverter"
  | "Tiled"
  | "Kitchen";

export type VerifiedBy = "Sync team visit" | "Student reviewed";

export type BadgeType = "Top rated" | "Verified" | "Female only" | "Best value" | "New";

export interface Listing {
  id: number;
  name: string;
  distance: string;
  area: string;
  price: number;          // in thousands ₦
  rating: number;
  reviewCount: number;
  badge?: BadgeType;
  amenities: Amenity[];
  image: string;
  roomType: RoomType;
  verified: boolean;
  roomsAvailable: number; // rooms currently vacant
  roomsTotal: number;     // total rooms in the hostel
}

export interface SearchFilters {
  priceMin: number;
  priceMax: number;
  roomTypes: RoomType[];
  amenities: Amenity[];
  verifiedBy: VerifiedBy[];
}

export type SortOption = "Best match" | "Price: Low to High" | "Price: High to Low" | "Highest rated";
export type ViewMode = "Grid" | "List";

// ─── Constants ────────────────────────────────────────────────────────────────

export const ROOM_TYPES: RoomType[] = ["Self-contain", "Single", "Shared", "Bedsitter", "Mini-flat"];

export const AMENITIES: Amenity[] = [
  "Wi-Fi", "24h light", "Borehole water", "CCTV", "Inverter", "Tiled", "Kitchen",
];

export const VERIFIED_BY: VerifiedBy[] = ["Sync team visit", "Student reviewed"];

export const SORT_OPTIONS: SortOption[] = [
  "Best match", "Price: Low to High", "Price: High to Low", "Highest rated",
];

export const DEFAULT_FILTERS: SearchFilters = {
  priceMin: 100,
  priceMax: 250,
  roomTypes: ["Self-contain", "Single"],
  amenities: ["Wi-Fi", "24h light", "Borehole water"],
  verifiedBy: ["Sync team visit"],
};

export const EMPTY_FILTERS: SearchFilters = {
  priceMin:   50,
  priceMax:   450,
  roomTypes:  [],
  amenities:  [],
  verifiedBy: [],
};

// ─── Seed data ────────────────────────────────────────────────────────────────

export const ALL_LISTINGS: Listing[] = [
  {
    id: 1,
    name: "Tanke Crescent Lodge",
    distance: "4 min walk",
    area: "UNILORIN PS",
    price: 180,
    rating: 4.9,
    reviewCount: 86,
    badge: "Top rated",
    amenities: ["Wi-Fi", "24h light", "Borehole water", "CCTV"],
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=420&fit=crop",
    roomType: "Self-contain",
    verified: true,
    roomsAvailable: 3,
    roomsTotal: 20,
  },
  {
    id: 2,
    name: "Safari Self-Contain",
    distance: "8 min",
    area: "UNILORIN main",
    price: 150,
    rating: 4.7,
    reviewCount: 64,
    badge: "Verified",
    amenities: ["Wi-Fi", "24h light", "Borehole water", "CCTV"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=420&fit=crop",
    roomType: "Self-contain",
    verified: true,
    roomsAvailable: 7,
    roomsTotal: 30,
  },
  {
    id: 3,
    name: "Oke-Odo Female Hall",
    distance: "12 min",
    area: "KWASU shuttle",
    price: 95,
    rating: 4.6,
    reviewCount: 112,
    badge: "Female only",
    amenities: ["Wi-Fi", "24h light", "Borehole water", "CCTV"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=420&fit=crop",
    roomType: "Single",
    verified: true,
    roomsAvailable: 12,
    roomsTotal: 50,
  },
  {
    id: 4,
    name: "Pipeline Court",
    distance: "15 min",
    area: "Ilorin Poly",
    price: 120,
    rating: 4.5,
    reviewCount: 49,
    badge: "Best value",
    amenities: ["Wi-Fi", "24h light", "Borehole water", "CCTV"],
    image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=600&h=420&fit=crop",
    roomType: "Single",
    verified: false,
    roomsAvailable: 1,
    roomsTotal: 24,
  },
  {
    id: 5,
    name: "Basin Heights",
    distance: "6 min",
    area: "UNILORIN PS",
    price: 200,
    rating: 4.8,
    reviewCount: 33,
    badge: "New",
    amenities: ["Wi-Fi", "24h light", "Inverter", "Tiled", "Kitchen"],
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&h=420&fit=crop",
    roomType: "Self-contain",
    verified: true,
    roomsAvailable: 18,
    roomsTotal: 18,
  },
  {
    id: 6,
    name: "Oloje Student Lodge",
    distance: "10 min",
    area: "KWASU",
    price: 80,
    rating: 4.3,
    reviewCount: 28,
    amenities: ["24h light", "Borehole water"],
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=420&fit=crop",
    roomType: "Shared",
    verified: false,
    roomsAvailable: 0,
    roomsTotal: 16,
  },
];
