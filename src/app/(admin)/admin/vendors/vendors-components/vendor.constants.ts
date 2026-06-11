import type { Vendor, VendorStats, VendorStatusFilter } from "./vendor.types";

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const VENDORS: Vendor[] = [
  {
    id: "1", vendorId: "VEN-2843",
    name: "Fresh Foods Market",
    email: "contact@freshfoods.com",
    phone: "+234 801 234 5678",
    location: "Lagos, Nigeria",
    status: "Active",
    orders: 1247, revenue: 2450000, rating: 4.8,
    category: "Food & Grocery",
    joinedDate: "Jan 2025",
    isVerified: true,
  },
  {
    id: "2", vendorId: "VEN-2842",
    name: "Organic Grocers",
    email: "info@organicgrocers.com",
    phone: "+234 802 345 6789",
    location: "Abuja, Nigeria",
    status: "Active",
    orders: 892, revenue: 1820000, rating: 4.6,
    category: "Food & Grocery",
    joinedDate: "Mar 2025",
    isVerified: true,
  },
  {
    id: "3", vendorId: "VEN-2841",
    name: "Quick Mart",
    email: "support@quickmart.com",
    phone: "+234 803 456 7890",
    location: "Port Harcourt, Nigeria",
    status: "Pending",
    orders: 0, revenue: 0, rating: null,
    category: "Convenience Store",
    joinedDate: "Jun 2026",
    isVerified: false,
  },
  {
    id: "4", vendorId: "VEN-2840",
    name: "Super Store Ltd",
    email: "hello@superstore.ng",
    phone: "+234 804 567 8901",
    location: "Kano, Nigeria",
    status: "Active",
    orders: 2341, revenue: 4120000, rating: 4.9,
    category: "Supermarket",
    joinedDate: "Nov 2024",
    isVerified: true,
  },
  {
    id: "5", vendorId: "VEN-2839",
    name: "Daily Needs Shop",
    email: "contact@dailyneeds.ng",
    phone: "+234 805 678 9012",
    location: "Ibadan, Nigeria",
    status: "Suspended",
    orders: 456, revenue: 780000, rating: 3.2,
    category: "Convenience Store",
    joinedDate: "Aug 2024",
    isVerified: false,
  },
  {
    id: "6", vendorId: "VEN-2838",
    name: "Premium Groceries",
    email: "info@premiumgroceries.com",
    phone: "+234 806 789 0123",
    location: "Enugu, Nigeria",
    status: "Active",
    orders: 1567, revenue: 3340000, rating: 4.7,
    category: "Food & Grocery",
    joinedDate: "Feb 2025",
    isVerified: true,
  },
  {
    id: "7", vendorId: "VEN-2837",
    name: "Campus Bites",
    email: "hello@campusbites.ng",
    phone: "+234 807 890 1234",
    location: "Ilorin, Nigeria",
    status: "Active",
    orders: 743, revenue: 1150000, rating: 4.5,
    category: "Food & Canteen",
    joinedDate: "Apr 2025",
    isVerified: true,
  },
  {
    id: "8", vendorId: "VEN-2836",
    name: "UniPharma Plus",
    email: "info@unipharma.ng",
    phone: "+234 808 901 2345",
    location: "Ile-Ife, Nigeria",
    status: "Pending",
    orders: 0, revenue: 0, rating: null,
    category: "Pharmacy",
    joinedDate: "Jun 2026",
    isVerified: false,
  },
];

// ─── Status filter options ────────────────────────────────────────────────────

export const VENDOR_STATUS_FILTERS: VendorStatusFilter[] = [
  "All Vendors", "Active", "Pending", "Suspended",
];

// ─── Live stats derived from vendors array ────────────────────────────────────

export function computeVendorStats(vendors: Vendor[]): VendorStats {
  return {
    total: vendors.length,
    active: vendors.filter(v => v.status === "Active").length,
    pending: vendors.filter(v => v.status === "Pending").length,
    suspended: vendors.filter(v => v.status === "Suspended").length,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatRevenue(amount: number): string {
  if (amount === 0) return "₦0";
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}k`;
  return `₦${amount}`;
}
