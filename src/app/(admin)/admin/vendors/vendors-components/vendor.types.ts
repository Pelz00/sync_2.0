// ─── Vendor Types ─────────────────────────────────────────────────────────────

export type VendorStatus = "Active" | "Pending" | "Suspended";
export type VendorView = "grid" | "list";

export interface VendorProduct {
  name: string;
  price: number;
}

// ─── KYC & Verification ───────────────────────────────────────────────────────

export interface KycDocument {
  label: string;
  url: string;
  uploadedAt: string;
}

export interface NinVerification {
  nin: string;           // masked e.g. "NIN-XXXX-XXXX-2843"
  submittedAt: string;
  slipPhoto?: string;
}

export interface LivenessCheck {
  status: "Passed" | "Failed" | "Pending";
  date?: string;
  selfiePhoto?: string;
}

// ─── Store Inspection ─────────────────────────────────────────────────────────

export type StoreInspectionStatus =
  | "Not Visited"
  | "Visit Scheduled"
  | "Under Review"
  | "Confirmed"
  | "Rejected";

export interface StoreInspector {
  name: string;
  phone?: string;
}

export interface StoreInspectionReport {
  photos: string[];
  video?: string;
  notes: string;
  submittedAt: string;
}

export interface StoreInspection {
  status: StoreInspectionStatus;
  inspector?: StoreInspector;
  inspectionFee?: number;
  report?: StoreInspectionReport;
}

// ─── Core Vendor ──────────────────────────────────────────────────────────────

export interface Vendor {
  id: string;
  vendorId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: VendorStatus;
  orders: number;
  revenue: number;
  rating: number | null;
  category: string;
  joinedDate: string;
  isVerified: boolean;
  suspendReason?: string;
  rejectionReason?: string;
  verificationNote?: string;     // admin note written when verifying
  businessPhotos?: string[];
  products?: VendorProduct[];
  kycDocuments?: KycDocument[];
  nin?: NinVerification;
  livenessCheck?: LivenessCheck;
  storeInspection?: StoreInspection;
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
