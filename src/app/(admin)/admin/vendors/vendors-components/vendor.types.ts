// ─── Vendor Types ─────────────────────────────────────────────────────────────

export type VendorStatus = "Active" | "Pending" | "Suspended";

export interface Vendor {
  id: string;
  vendorId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: VendorStatus;
  orders: number;
  revenue: number;       // raw naira value
  rating: number | null; // null = N/A
  category: string;
  joinedDate: string;
  isVerified: boolean;
}

export interface VendorStats {
  total: number;
  active: number;
  pending: number;
  suspended: number;
}

export type VendorStatusFilter = "All Vendors" | VendorStatus;

export interface VendorActionOption {
  label: string;
  value: string;
  danger?: boolean;
}
