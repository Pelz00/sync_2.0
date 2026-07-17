// ─── Landlord Types ───────────────────────────────────────────────────────────

export type LandlordStatus = "Active" | "Pending" | "Suspended";
export type LandlordView = "grid" | "list";

export interface KycDocument {
  label: string;
  url: string;
  uploadedAt: string;
}

export interface NinVerification {
  nin: string;           // masked e.g. "NIN-XXXX-XXXX-7890"
  submittedAt: string;
  slipPhoto?: string;    // photo of the NIN card/slip
}

export interface LivenessCheck {
  status: "Passed" | "Failed" | "Pending";
  date?: string;
  selfiePhoto?: string;  // captured selfie during check
}

export type HostelVisitStatus =
  | "Not Visited"
  | "Visit Scheduled"
  | "Under Review"
  | "Verified"
  | "Rejected";

export interface Ambassador {
  name: string;
  avatar?: string;
  phone?: string;
}

export interface HostelVisitReport {
  photos: string[];
  video?: string;
  notes: string;
  submittedAt: string;
}

export interface LandlordHostel {
  id: string;
  slug: string;
  name: string;
  price: number;
  rooms?: number;
  inspectionFee?: number;
  visitStatus: HostelVisitStatus;
  ambassador?: Ambassador;
  visitReport?: HostelVisitReport;
}

export interface Landlord {
  id: string;
  landlordId: string;
  slug: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: LandlordStatus;
  bookings: number;
  revenue: number;
  rating: number | null;
  category: string;
  joinedDate: string;
  isVerified: boolean;
  suspendReason?: string;
  rejectionReason?: string;
  businessPhotos?: string[];
  kycDocuments?: KycDocument[];
  nin?: NinVerification;
  livenessCheck?: LivenessCheck;
  hostels?: LandlordHostel[];
}

export interface LandlordStats {
  total: number;
  active: number;
  pending: number;
  suspended: number;
}

export type LandlordStatusFilter = "All Landlords" | LandlordStatus;

export interface LandlordActionOption {
  label: string;
  value: string;
  danger?: boolean;
}
