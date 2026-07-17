import type {
  Landlord, LandlordStats, LandlordStatusFilter,
} from "./landlord.types";

export function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const VISIT_PHOTOS = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80",
];

export const LANDLORDS: Landlord[] = [

  // ── LANDLORD 1 — Active & Verified ──────────────────────────────────────────
  {
    id: "1", landlordId: "LRD-3041", slug: "landlord-1",
    name: "Landlord 1",
    email: "landlord1@sync.ng", phone: "+234 809 012 3456",
    location: "Ibadan, Nigeria",
    status: "Active", bookings: 522, revenue: 16800000, rating: 4.4,
    category: "Student Hostel", joinedDate: "Dec 2024", isVerified: true,
    businessPhotos: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80",
    ],
    kycDocuments: [
      { label: "Means of Identification", url: "#", uploadedAt: "Dec 1, 2024" },
      { label: "Proof of Ownership / Lease", url: "#", uploadedAt: "Dec 1, 2024" },
      { label: "CAC Certificate", url: "#", uploadedAt: "Dec 2, 2024" },
    ],
    nin: {
      nin: "NIN-XXXX-XXXX-3041",
      submittedAt: "Dec 1, 2024",
      slipPhoto: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    },
    livenessCheck: {
      status: "Passed",
      date: "Dec 1, 2024",
      selfiePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    },
    hostels: [
      {
        id: "1-h1", slug: "greenfield-hostels", name: "Greenfield Hostels",
        price: 300000, rooms: 40, inspectionFee: 5000, visitStatus: "Verified",
        ambassador: { name: "Tunde Bakare", phone: "+234 803 222 1190" },
        visitReport: {
          photos: VISIT_PHOTOS,
          video: "https://www.w3schools.com/html/mov_bbb.mp4",
          notes: "Property matches listing description. Rooms are clean, water and power supply confirmed functional. Fire extinguisher present on each floor.",
          submittedAt: "Dec 10, 2024",
        },
      },
      {
        id: "1-h2", slug: "pinnacle-properties", name: "Pinnacle Properties",
        price: 380000, rooms: 15, inspectionFee: 6500, visitStatus: "Verified",
        ambassador: { name: "Chiamaka Eze", phone: "+234 807 441 9981" },
        visitReport: {
          photos: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
          ],
          notes: "Standard rooms confirmed. Shared facilities clean and well maintained. Water supply consistent.",
          submittedAt: "Dec 12, 2024",
        },
      },
      {
        id: "1-h3", slug: "sunrise-lodge", name: "Sunrise Lodge",
        price: 95000, rooms: 16, inspectionFee: 5000, visitStatus: "Under Review",
        ambassador: { name: "Yusuf Ibrahim", phone: "+234 816 552 3310" },
        visitReport: {
          photos: ["https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&q=80"],
          video: "",
          notes: "Visited onsite. Shared rooms are moderate. Awaiting super admin review before listing goes live.",
          submittedAt: "Jun 18, 2026",
        },
      },
    ],
  },

  // ── LANDLORD 2 — Pending / Unverified ───────────────────────────────────────
  {
    id: "2", landlordId: "LRD-3042", slug: "landlord-2",
    name: "Landlord 2",
    email: "landlord2@sync.ng", phone: "+234 810 123 4567",
    location: "Ile-Ife, Nigeria",
    status: "Pending", bookings: 0, revenue: 0, rating: null,
    category: "Student Hostel", joinedDate: "Jun 2026", isVerified: false,
    businessPhotos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
    ],
    kycDocuments: [
      { label: "Means of Identification (Int'l Passport)", url: "#", uploadedAt: "Jun 20, 2026" },
      { label: "Proof of Ownership / Lease Agreement", url: "#", uploadedAt: "Jun 21, 2026" },
      { label: "Utility Bill (Last 3 months)", url: "#", uploadedAt: "Jun 21, 2026" },
    ],
    nin: {
      nin: "NIN-XXXX-XXXX-7042",
      submittedAt: "Jun 20, 2026",
      slipPhoto: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&q=80",
    },
    livenessCheck: {
      status: "Passed",
      date: "Jun 20, 2026",
      selfiePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    },
    hostels: [
      {
        id: "2-h1", slug: "royal-court-hostels", name: "Royal Court Hostels",
        price: 160000, rooms: 56, inspectionFee: 7500, visitStatus: "Not Visited",
      },
      {
        id: "2-h2", slug: "unity-hall-hostels", name: "Unity Hall Hostels",
        price: 110000, rooms: 14, inspectionFee: 5000, visitStatus: "Not Visited",
      },
      {
        id: "2-h3", slug: "heritage-court-apartments", name: "Heritage Court Apartments",
        price: 650000, rooms: 10, inspectionFee: 9000, visitStatus: "Not Visited",
      },
    ],
  },

  // ── LANDLORD 3 — Active & Verified ──────────────────────────────────────────
  {
    id: "3", landlordId: "LRD-3043", slug: "landlord-3",
    name: "Landlord 3",
    email: "landlord3@sync.ng", phone: "+234 815 678 9012",
    location: "Enugu, Nigeria",
    status: "Active", bookings: 156, revenue: 14200000, rating: 4.6,
    category: "Lodge", joinedDate: "Feb 2025", isVerified: true,
    businessPhotos: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    ],
    kycDocuments: [
      { label: "Means of Identification", url: "#", uploadedAt: "Feb 10, 2025" },
      { label: "Proof of Ownership / Lease", url: "#", uploadedAt: "Feb 10, 2025" },
      { label: "CAC Certificate", url: "#", uploadedAt: "Feb 11, 2025" },
    ],
    nin: {
      nin: "NIN-XXXX-XXXX-3043",
      submittedAt: "Feb 10, 2025",
      slipPhoto: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    },
    livenessCheck: {
      status: "Passed",
      date: "Feb 10, 2025",
      selfiePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
    },
    hostels: [
      {
        id: "3-h1", slug: "campus-view-standard-shared", name: "Campus View Lodge — Standard Shared",
        price: 100000, rooms: 8, inspectionFee: 5000, visitStatus: "Verified",
        ambassador: { name: "Chiamaka Eze", phone: "+234 807 441 9981" },
        visitReport: {
          photos: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
            "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&q=80",
          ],
          video: "https://www.w3schools.com/html/mov_bbb.mp4",
          notes: "Standard shared rooms are adequately furnished. Location is close to campus gate. Security confirmed present.",
          submittedAt: "Feb 20, 2025",
        },
      },
      {
        id: "3-h2", slug: "campus-view-deluxe-self-contain", name: "Campus View Lodge — Deluxe Self-Contain",
        price: 320000, rooms: 5, inspectionFee: 7500, visitStatus: "Verified",
        ambassador: { name: "Yusuf Ibrahim", phone: "+234 816 552 3310" },
        visitReport: {
          photos: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
            "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80",
          ],
          notes: "Deluxe self-contain units are well finished. AC and 24hr power backup confirmed.",
          submittedAt: "Feb 21, 2025",
        },
      },
      {
        id: "3-h3", slug: "campus-view-premium-studio", name: "Campus View Lodge — Premium Studio",
        price: 480000, rooms: 3, inspectionFee: 9000, visitStatus: "Visit Scheduled",
        ambassador: { name: "Tunde Bakare", phone: "+234 803 222 1190" },
      },
    ],
  },
];

// ─── Lookup helpers ────────────────────────────────────────────────────────────

export function getLandlordBySlug(landlords: Landlord[], slug: string): Landlord | undefined {
  return landlords.find(l => l.slug === slug);
}

export function getHostelBySlug(landlord: Landlord | undefined, hostelSlug: string) {
  return landlord?.hostels?.find(h => h.slug === hostelSlug);
}

// ─── Status filter options ────────────────────────────────────────────────────

export const LANDLORD_STATUS_FILTERS: LandlordStatusFilter[] = [
  "All Landlords", "Active", "Pending", "Suspended",
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export function computeLandlordStats(landlords: Landlord[]): LandlordStats {
  return {
    total: landlords.length,
    active: landlords.filter(l => l.status === "Active").length,
    pending: landlords.filter(l => l.status === "Pending").length,
    suspended: landlords.filter(l => l.status === "Suspended").length,
  };
}

// ─── Formatters ───────────────────────────────────────────────────────────────

export function formatRevenue(amount: number): string {
  if (amount === 0) return "₦0";
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}k`;
  return `₦${amount}`;
}

export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

// ─── Color maps ───────────────────────────────────────────────────────────────

export const CATEGORY_COLORS: Record<string, string> = {
  "Student Hostel": "bg-teal-100 text-teal-700",
  "Self-Contain": "bg-blue-100 text-blue-700",
  "Lodge": "bg-purple-100 text-purple-700",
  "Apartment": "bg-pink-100 text-pink-700",
};

export const VISIT_STATUS_COLORS: Record<string, string> = {
  "Not Visited": "bg-gray-100 text-gray-600 border border-gray-200",
  "Visit Scheduled": "bg-blue-100 text-blue-700 border border-blue-200",
  "Under Review": "bg-orange-100 text-orange-600 border border-orange-200",
  "Verified": "bg-green-100 text-green-700 border border-green-200",
  "Rejected": "bg-red-100 text-red-600 border border-red-200",
};
