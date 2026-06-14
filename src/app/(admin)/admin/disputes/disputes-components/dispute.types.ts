// ─── Dispute Types ────────────────────────────────────────────────────────────

export type DisputeStatus   = "Open" | "In Progress" | "Escalated" | "Resolved";
export type DisputePriority = "High" | "Medium" | "Low";
export type DisputeCategory = "Product Quality" | "Delivery Issue" | "Wrong Item" | "Missing Items" | "Refund Request" | "Other";

export interface Dispute {
  id: string;              // e.g. "DR-2843"
  orderId: string;         // e.g. "ORD-12456"
  category: DisputeCategory;
  amount: number;          // raw naira
  description: string;
  status: DisputeStatus;
  priority: DisputePriority;
  customer: string;
  customerInitials: string;
  vendor: string;
  createdDate: string;     // e.g. "Jun 1, 2026"
  comments: number;
  assignedTo?: string;
  resolution?: string;
}

export interface DisputeStats {
  total:      number;
  open:       number;
  inProgress: number;
  escalated:  number;
  resolved:   number;
}

export type StatusFilterOption   = "All Status"   | DisputeStatus;
export type PriorityFilterOption = "All Priority" | DisputePriority;
