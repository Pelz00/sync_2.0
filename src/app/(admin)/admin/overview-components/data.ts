// ─── Types ────────────────────────────────────────────────────────────────────

export interface StatCard {
  key: string;
  label: string;
  value: number;
  change: number;  
  iconBg: string;
  icon: string;  
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface GrowthPoint {
  month: string;
  users: number;
}

export interface Activity {
  id: number;
  text: string;
  timeAgo: string;
  type: "vendor" | "dispute" | "verification" | "user";
}

export interface VendorStatusData {
  active: number;
  pending: number;
  suspended: number;
}

// ─── Seed data ────────────────────────────────────────────────────────────────

export const STAT_CARDS: StatCard[] = [
  { key: "vendors", label: "Total Vendors", value: 1248, change: 12, iconBg: "bg-blue-500", icon: "vendors" },
  { key: "users", label: "Active Users", value: 8542, change: 18, iconBg: "bg-emerald-500", icon: "users" },
  { key: "verifications", label: "Pending Verifications",value: 47, change: -5, iconBg: "bg-orange-500", icon: "verifications" },
  { key: "disputes", label: "Open Disputes", value: 23, change: 3, iconBg: "bg-red-500", icon: "disputes" },
];

export const REVENUE_DATA: RevenuePoint[] = [
  { month: "Jan", revenue: 44000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 47000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
];

export const GROWTH_DATA: GrowthPoint[] = [
  { month: "Jan", users: 3100 },
  { month: "Feb", users: 4100 },
  { month: "Mar", users: 5300 },
  { month: "Apr", users: 6400 },
  { month: "May", users: 7500 },
  { month: "Jun", users: 8700 },
];

export const ACTIVITIES: Activity[] = [
  { id: 1, text: "New vendor registration: Fresh Foods Market", timeAgo: "5 minutes ago", type: "vendor" },
  { id: 2, text: "Dispute #DR-2843 resolved", timeAgo: "12 minutes ago", type: "dispute" },
  { id: 3, text: "Verification completed for Organic Grocers", timeAgo: "1 hour ago", type: "verification" },
  { id: 4, text: "500 new user registrations today", timeAgo: "2 hours ago", type: "user" },
];

export const VENDOR_STATUS: VendorStatusData = {
  active: 1024,
  pending: 147,
  suspended: 77,
};
