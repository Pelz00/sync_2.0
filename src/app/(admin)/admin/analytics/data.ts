// ─── Types ────────────────────────────────────────────────────────────────────

export type TimeRange = "Last 7 days" | "Last 30 days" | "Last 90 days" | "Last year";

export interface StatCard {
  key: string;
  label: string;
  value: string;
  change: number;
  iconBg: string;
  icon: string;
}

export interface TrendPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface CategorySlice {
  label: string;
  pct: number;
  color: string;
}

export interface HourPoint {
  hour: string;
  users: number;
}

export interface VendorBar {
  name: string;
  revenue: number;
}

export interface TopProduct {
  rank: number;
  name: string;
  orders: number;
  revenue: number;
}

// ─── Stat cards ───────────────────────────────────────────────────────────────

export const STAT_CARDS: StatCard[] = [
  { key: "revenue", label: "Total Revenue", value: "₦1.2M", change: 23.5, iconBg: "bg-emerald-500", icon: "revenue"   },
  { key: "orders", label: "Total Orders", value: "12,456", change: 18.2, iconBg: "bg-blue-500", icon: "orders"    },
  { key: "avg", label: "Avg Order Value", value: "₦96.35", change: 4.3, iconBg: "bg-orange-500", icon: "avg"       },
  { key: "customers", label: "Active Customers", value: "7,823",  change: -2.1, iconBg: "bg-purple-500", icon: "customers" },
];

// ─── Revenue & Orders trend ───────────────────────────────────────────────────

function makeTrend(): TrendPoint[] {
  const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const points: TrendPoint[] = [];
  const start = new Date("2026-01-01");

  for (let i = 0; i < 148; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const label = `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
    const progress = i / 147;
    points.push({
      date:    label,
      revenue: Math.round(1000 + progress * 79000 + (Math.sin(i * 0.3) * 4000) + Math.random() * 2000),
      orders:  Math.round(5 + progress * 990 + (Math.sin(i * 0.4) * 50) + Math.random() * 20),
    });
  }
  return points;
}

const ALL_TREND: TrendPoint[] = makeTrend();

export function getTrendData(range: TimeRange): TrendPoint[] {
  const n: Record<TimeRange, number> = {
    "Last 7 days": 7,
    "Last 30 days": 30,
    "Last 90 days": 90,
    "Last year": 148,
  };
  return ALL_TREND.slice(-n[range]);
}

// ─── Sales by category ────────────────────────────────────────────────────────

export const CATEGORY_DATA: CategorySlice[] = [
  { label: "Groceries", pct: 28, color: "#90d505" },
  { label: "Fresh Produce", pct: 20, color: "#3b82f6" },
  { label: "Dairy", pct: 18, color: "#a855f7" },
  { label: "Beverages", pct: 13, color: "#f97316" },
  { label: "Snacks", pct: 11, color: "#ec4899" },
  { label: "Others", pct: 10, color: "#14b8a6" },
];

// ─── User activity by hour ────────────────────────────────────────────────────

export const HOUR_DATA: HourPoint[] = [
  { hour: "12 AM", users: 12  }, { hour: "1 AM",  users: 8   },
  { hour: "2 AM",  users: 5   }, { hour: "3 AM",  users: 4   },
  { hour: "4 AM",  users: 6   }, { hour: "5 AM",  users: 18  },
  { hour: "6 AM",  users: 45  }, { hour: "7 AM",  users: 120 },
  { hour: "8 AM",  users: 210 }, { hour: "9 AM",  users: 310 },
  { hour: "10 AM", users: 420 }, { hour: "11 AM", users: 490 },
  { hour: "12 PM", users: 530 }, { hour: "1 PM",  users: 510 },
  { hour: "2 PM",  users: 480 }, { hour: "3 PM",  users: 560 },
  { hour: "4 PM",  users: 590 }, { hour: "5 PM",  users: 620 },
  { hour: "6 PM",  users: 680 }, { hour: "7 PM",  users: 640 },
  { hour: "8 PM",  users: 500 }, { hour: "9 PM",  users: 410 },
];

// ─── Top performing vendors ───────────────────────────────────────────────────

export const VENDOR_DATA: VendorBar[] = [
  { name: "Fresh Foods", revenue: 320000 },
  { name: "Organic Grocers", revenue: 265000 },
  { name: "Super Store", revenue: 580000 },
  { name: "Premium Groceries", revenue: 370000 },
  { name: "Quick Mart", revenue: 142000 },
];

// ─── Top products ─────────────────────────────────────────────────────────────

export const TOP_PRODUCTS: TopProduct[] = [
  { rank: 1, name: "Fresh Tomatoes (1kg)", orders: 1234, revenue: 123400 },
  { rank: 2, name: "Rice (5kg)", orders: 987, revenue: 246750 },
  { rank: 3, name: "Palm Oil (2L)", orders: 666, revenue: 171200 },
  { rank: 4, name: "Onions (1kg)", orders: 745, revenue: 74500  },
  { rank: 5, name: "Chicken (whole)", orders: 634, revenue: 190200 },
];
