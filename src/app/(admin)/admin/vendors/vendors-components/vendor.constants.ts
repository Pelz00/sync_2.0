import type { Vendor, VendorStats, VendorStatusFilter } from "./vendor.types";

// ─── Shared assets ────────────────────────────────────────────────────────────

const INSPECTION_PHOTOS = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
  "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&q=80",
  "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600&q=80",
];

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const VENDORS: Vendor[] = [
  {
    id: "1", vendorId: "VEN-2843",
    name: "Fresh Foods Market",
    email: "contact@freshfoods.com", phone: "+234 801 234 5678",
    location: "Lagos, Nigeria",
    status: "Active", orders: 1247, revenue: 2450000, rating: 4.8,
    category: "Food & Grocery", joinedDate: "Jan 2025", isVerified: true,
    verificationNote: "Inspector confirmed store is operational and stocked. Products match listing. Clean and well-organised environment.",
    businessPhotos: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&q=80",
    ],
    kycDocuments: [
      { label: "CAC Business Registration", url: "#", uploadedAt: "Jan 3, 2025" },
      { label: "Means of Identification", url: "#", uploadedAt: "Jan 3, 2025" },
      { label: "Proof of Business Address", url: "#", uploadedAt: "Jan 4, 2025" },
    ],
    nin: { nin: "NIN-XXXX-XXXX-2843", submittedAt: "Jan 3, 2025", slipPhoto: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80" },
    livenessCheck: { status: "Passed", date: "Jan 3, 2025", selfiePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
    storeInspection: {
      status: "Confirmed",
      inspector: { name: "Tunde Bakare", phone: "+234 803 222 1190" },
      inspectionFee: 8000,
      report: {
        photos: INSPECTION_PHOTOS,
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Store is fully stocked and operational. Clean environment, proper labelling on all products. Staff present and professional.",
        submittedAt: "Jan 8, 2025",
      },
    },
    products: [
      { name: "Organic Tomatoes Basket", price: 4500 },
      { name: "Fresh Habanero Peppers (Atarodo)", price: 2000 },
      { name: "Sweet Potatoes (Big Sack)", price: 12000 },
      { name: "Local Rice 5kg", price: 7500 },
    ],
  },

  {
    id: "2", vendorId: "VEN-2842",
    name: "Organic Grocers",
    email: "info@organicgrocers.com", phone: "+234 802 345 6789",
    location: "Abuja, Nigeria",
    status: "Active", orders: 892, revenue: 1820000, rating: 4.6,
    category: "Food & Grocery", joinedDate: "Mar 2025", isVerified: true,
    verificationNote: "Store visit confirmed. Organic produce sourcing verified. Storage conditions are appropriate.",
    businessPhotos: ["https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=80"],
    kycDocuments: [
      { label: "CAC Business Registration", url: "#", uploadedAt: "Mar 5, 2025" },
      { label: "Means of Identification", url: "#", uploadedAt: "Mar 5, 2025" },
    ],
    nin: { nin: "NIN-XXXX-XXXX-2842", submittedAt: "Mar 5, 2025", slipPhoto: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&q=80" },
    livenessCheck: { status: "Passed", date: "Mar 5, 2025", selfiePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" },
    storeInspection: {
      status: "Confirmed",
      inspector: { name: "Chiamaka Eze", phone: "+234 807 441 9981" },
      inspectionFee: 8000,
      report: {
        photos: [
          "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=80",
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Small but well-organised organic store. Produce is fresh and properly stored. Owner was present and cooperative.",
        submittedAt: "Mar 10, 2025",
      },
    },
    products: [
      { name: "Organic Honey Extract", price: 6000 },
      { name: "Unrefined Brown Sugar 1kg", price: 3500 },
      { name: "Almond Milk 1L", price: 4200 },
    ],
  },

  {
    id: "3", vendorId: "VEN-2841",
    name: "Quick Mart",
    email: "support@quickmart.com", phone: "+234 803 456 7890",
    location: "Port Harcourt, Nigeria",
    status: "Pending", orders: 0, revenue: 0, rating: null,
    category: "Convenience Store", joinedDate: "Jun 2026", isVerified: false,
    businessPhotos: ["https://images.unsplash.com/photo-1621985220374-7a05c3b4e2e1?w=600&q=80"],
    kycDocuments: [
      { label: "CAC Business Registration", url: "#", uploadedAt: "Jun 22, 2026" },
      { label: "Means of Identification", url: "#", uploadedAt: "Jun 22, 2026" },
      { label: "Proof of Business Address", url: "#", uploadedAt: "Jun 23, 2026" },
    ],
    nin: { nin: "NIN-XXXX-XXXX-2841", submittedAt: "Jun 22, 2026", slipPhoto: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80" },
    livenessCheck: { status: "Passed", date: "Jun 22, 2026", selfiePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
    storeInspection: {
      status: "Under Review",
      inspector: { name: "Yusuf Ibrahim", phone: "+234 816 552 3310" },
      inspectionFee: 8000,
      report: {
        photos: [
          "https://images.unsplash.com/photo-1621985220374-7a05c3b4e2e1?w=600&q=80",
          "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600&q=80",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Visited the store. Small convenience shop near a university hostel gate. Products visible and stocked. Awaiting super admin review before listing goes live.",
        submittedAt: "Jun 26, 2026",
      },
    },
    products: [
      { name: "Chilled Soda Can", price: 600 },
      { name: "Potato Chips Pack", price: 1200 },
      { name: "Energy Drink 330ml", price: 1500 },
      { name: "Bottled Water 75cl", price: 400 },
      { name: "Salted Peanuts Pack", price: 800 },
    ],
  },

  {
    id: "4", vendorId: "VEN-2840",
    name: "Super Store Ltd",
    email: "hello@superstore.ng", phone: "+234 804 567 8901",
    location: "Kano, Nigeria",
    status: "Active", orders: 2341, revenue: 4120000, rating: 4.9,
    category: "Supermarket", joinedDate: "Nov 2024", isVerified: true,
    verificationNote: "Large format supermarket confirmed. Wide product range verified. Food safety standards observed.",
    businessPhotos: ["https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600&q=80"],
    kycDocuments: [
      { label: "CAC Business Registration", url: "#", uploadedAt: "Nov 2, 2024" },
      { label: "Means of Identification", url: "#", uploadedAt: "Nov 2, 2024" },
      { label: "NAFDAC Certification", url: "#", uploadedAt: "Nov 3, 2024" },
    ],
    nin: { nin: "NIN-XXXX-XXXX-2840", submittedAt: "Nov 2, 2024", slipPhoto: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80" },
    livenessCheck: { status: "Passed", date: "Nov 2, 2024", selfiePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
    storeInspection: {
      status: "Confirmed",
      inspector: { name: "Tunde Bakare", phone: "+234 803 222 1190" },
      inspectionFee: 10000,
      report: {
        photos: INSPECTION_PHOTOS,
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Large well-stocked supermarket. Cold chain products properly refrigerated. CCTV and security in place. All products from reputable brands.",
        submittedAt: "Nov 8, 2024",
      },
    },
    products: [
      { name: "Premium Washing Powder 2kg", price: 5800 },
      { name: "Vegetable Cooking Oil 3L", price: 9400 },
      { name: "Spaghetti Carton (20 Packs)", price: 15000 },
    ],
  },

  {
    id: "5", vendorId: "VEN-2839",
    name: "Daily Needs Shop",
    email: "contact@dailyneeds.ng", phone: "+234 805 678 9012",
    location: "Ibadan, Nigeria",
    status: "Suspended", orders: 456, revenue: 780000, rating: 3.2,
    category: "Convenience Store", joinedDate: "Aug 2024", isVerified: false,
    suspendReason: "Multiple unresolved complaints from students regarding order quality and delayed deliveries.",
    businessPhotos: ["https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80"],
    kycDocuments: [
      { label: "Means of Identification", url: "#", uploadedAt: "Aug 1, 2024" },
    ],
    nin: { nin: "NIN-XXXX-XXXX-2839", submittedAt: "Aug 1, 2024" },
    livenessCheck: { status: "Passed", date: "Aug 1, 2024" },
    storeInspection: {
      status: "Confirmed",
      inspector: { name: "Chiamaka Eze", phone: "+234 807 441 9981" },
      inspectionFee: 8000,
      report: {
        photos: ["https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80"],
        notes: "Store was operational at time of visit. Minor cleanliness issues noted but acceptable.",
        submittedAt: "Aug 6, 2024",
      },
    },
    products: [
      { name: "Toiletries Pack", price: 3200 },
      { name: "Rechargeable Bulb 15W", price: 4500 },
    ],
  },

  {
    id: "6", vendorId: "VEN-2838",
    name: "Premium Groceries",
    email: "info@premiumgroceries.com", phone: "+234 806 789 0123",
    location: "Enugu, Nigeria",
    status: "Active", orders: 1567, revenue: 3340000, rating: 4.7,
    category: "Food & Grocery", joinedDate: "Feb 2025", isVerified: true,
    verificationNote: "Premium grocery store confirmed. Imported goods verified authentic. Proper cold storage for dairy.",
    businessPhotos: ["https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80"],
    kycDocuments: [
      { label: "CAC Business Registration", url: "#", uploadedAt: "Feb 3, 2025" },
      { label: "Means of Identification", url: "#", uploadedAt: "Feb 3, 2025" },
    ],
    nin: { nin: "NIN-XXXX-XXXX-2838", submittedAt: "Feb 3, 2025" },
    livenessCheck: { status: "Passed", date: "Feb 3, 2025", selfiePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" },
    storeInspection: {
      status: "Confirmed",
      inspector: { name: "Yusuf Ibrahim", phone: "+234 816 552 3310" },
      inspectionFee: 8000,
      report: {
        photos: [
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "High-end grocery store with imported and premium local products. Store is well-lit, clean and properly refrigerated.",
        submittedAt: "Feb 8, 2025",
      },
    },
    products: [
      { name: "Imported Salted Butter", price: 4800 },
      { name: "Whole Grain Wheat Oats 1kg", price: 3900 },
      { name: "Premium Cheddar Cheese Block", price: 7200 },
    ],
  },

  {
    id: "7", vendorId: "VEN-2837",
    name: "Campus Bites",
    email: "hello@campusbites.ng", phone: "+234 807 890 1234",
    location: "Ilorin, Nigeria",
    status: "Active", orders: 743, revenue: 1150000, rating: 4.5,
    category: "Food & Canteen", joinedDate: "Apr 2025", isVerified: true,
    verificationNote: "Kitchen hygiene verified. Food storage conditions acceptable. Active service confirmed during visit.",
    businessPhotos: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"],
    kycDocuments: [
      { label: "CAC Business Registration", url: "#", uploadedAt: "Apr 2, 2025" },
      { label: "Means of Identification", url: "#", uploadedAt: "Apr 2, 2025" },
      { label: "NAFDAC / Health Certificate", url: "#", uploadedAt: "Apr 3, 2025" },
    ],
    nin: { nin: "NIN-XXXX-XXXX-2837", submittedAt: "Apr 2, 2025", slipPhoto: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&q=80" },
    livenessCheck: { status: "Passed", date: "Apr 2, 2025", selfiePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
    storeInspection: {
      status: "Confirmed",
      inspector: { name: "Chiamaka Eze", phone: "+234 807 441 9981" },
      inspectionFee: 8000,
      report: {
        photos: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Active canteen with good student traffic. Kitchen is clean, food properly covered. Meals prepared fresh on the day.",
        submittedAt: "Apr 7, 2025",
      },
    },
    products: [
      { name: "Chicken Shawarma (Double Sausage)", price: 5500 },
      { name: "Beef Burger with Fries", price: 6200 },
      { name: "Special Fried Rice & Grilled Chicken", price: 4800 },
      { name: "Chilled Chapman Drink", price: 1800 },
    ],
  },

  {
    id: "8", vendorId: "VEN-2836",
    name: "UniPharma Plus",
    email: "info@unipharma.ng", phone: "+234 808 901 2345",
    location: "Ile-Ife, Nigeria",
    status: "Pending", orders: 0, revenue: 0, rating: null,
    category: "Pharmacy", joinedDate: "Jun 2026", isVerified: false,
    businessPhotos: ["https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80"],
    kycDocuments: [
      { label: "Pharmacist License (PCN)", url: "#", uploadedAt: "Jun 24, 2026" },
      { label: "CAC Business Registration", url: "#", uploadedAt: "Jun 24, 2026" },
      { label: "Means of Identification", url: "#", uploadedAt: "Jun 24, 2026" },
    ],
    nin: { nin: "NIN-XXXX-XXXX-2836", submittedAt: "Jun 24, 2026", slipPhoto: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80" },
    livenessCheck: { status: "Passed", date: "Jun 24, 2026", selfiePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
    storeInspection: {
      status: "Visit Scheduled",
      inspector: { name: "Tunde Bakare", phone: "+234 803 222 1190" },
      inspectionFee: 8000,
    },
    products: [
      { name: "Vitamin C Effervescent (Pack of 20)", price: 3500 },
      { name: "First Aid Basic Kits Box", price: 8500 },
    ],
  },

  {
    id: "12", vendorId: "VEN-2832",
    name: "CampusPrint Hub",
    email: "print@campushub.ng", phone: "+234 812 345 6789",
    location: "Enugu, Nigeria",
    status: "Pending", orders: 0, revenue: 0, rating: null,
    category: "Print & Stationery", joinedDate: "Jun 2026", isVerified: false,
    businessPhotos: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80"],
    kycDocuments: [
      { label: "CAC Business Registration", url: "#", uploadedAt: "Jun 21, 2026" },
      { label: "Means of Identification", url: "#", uploadedAt: "Jun 21, 2026" },
    ],
    nin: { nin: "NIN-XXXX-XXXX-2832", submittedAt: "Jun 21, 2026" },
    livenessCheck: { status: "Pending" },
    storeInspection: {
      status: "Not Visited",
      inspectionFee: 8000,
    },
    products: [
      { name: "A4 Laser Printing (Per Page Black/White)", price: 50 },
      { name: "Full Color Project Hard Binding Booklet", price: 4500 },
      { name: "Premium Spiral Notebook Diary", price: 2500 },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const VENDOR_STATUS_FILTERS: VendorStatusFilter[] = [
  "All Vendors", "Active", "Pending", "Suspended",
];

export function computeVendorStats(vendors: Vendor[]): VendorStats {
  return {
    total: vendors.length,
    active: vendors.filter(v => v.status === "Active").length,
    pending: vendors.filter(v => v.status === "Pending").length,
    suspended: vendors.filter(v => v.status === "Suspended").length,
  };
}

export function formatRevenue(amount: number): string {
  if (amount === 0) return "₦0";
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}k`;
  return `₦${amount}`;
}

export const CATEGORY_COLORS: Record<string, string> = {
  "Food & Grocery": "bg-green-100 text-green-700",
  "Convenience Store": "bg-blue-100 text-blue-700",
  "Supermarket": "bg-purple-100 text-purple-700",
  "Food & Canteen": "bg-orange-100 text-orange-700",
  "Pharmacy": "bg-red-100 text-red-700",
  "Student Hostel": "bg-teal-100 text-teal-700",
  "Event Tickets": "bg-pink-100 text-pink-700",
  "Print & Stationery": "bg-yellow-100 text-yellow-700",
};

export const INSPECTION_STATUS_COLORS: Record<string, string> = {
  "Not Visited": "bg-gray-100 text-gray-600 border border-gray-200",
  "Visit Scheduled": "bg-blue-100 text-blue-700 border border-blue-200",
  "Under Review": "bg-orange-100 text-orange-600 border border-orange-200",
  "Confirmed": "bg-green-100 text-green-700 border border-green-200",
  "Rejected": "bg-red-100 text-red-600 border border-red-200",
};
