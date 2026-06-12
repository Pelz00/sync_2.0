import type {
  Dispute, DisputeStats,
  StatusFilterOption, PriorityFilterOption,
} from "./dispute.types";

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const DISPUTES: Dispute[] = [
  {
    id: "DR-2843", orderId: "ORD-12456",
    category: "Product Quality", amount: 12450,
    description: "Received spoiled vegetables. Product was not fresh as advertised.",
    status: "Open", priority: "High",
    customer: "Chioma Adebayo", customerInitials: "CA",
    vendor: "Fresh Foods Market",
    createdDate: "Jun 1, 2026", comments: 3,
  },
  {
    id: "DR-2842", orderId: "ORD-12355",
    category: "Delivery Issue", amount: 8200,
    description: "Order was not delivered to the correct address. Still waiting for resolution.",
    status: "In Progress", priority: "Medium",
    customer: "Ibrahim Musa", customerInitials: "IM",
    vendor: "Organic Grocers",
    createdDate: "May 30, 2026", comments: 7,
    assignedTo: "Support Agent 1",
  },
  {
    id: "DR-2841", orderId: "ORD-12234",
    category: "Wrong Item", amount: 6600,
    description: "Received wrong product. Ordered rice but got beans instead.",
    status: "Resolved", priority: "Low",
    customer: "Ngozi Okafor", customerInitials: "NO",
    vendor: "Super Store Ltd",
    createdDate: "May 28, 2026", comments: 5,
    resolution: "Refund issued and correct item shipped.",
  },
  {
    id: "DR-2840", orderId: "ORD-12123",
    category: "Missing Items", amount: 15800,
    description: "Three items from my order are missing. Only received 5 out of 8 items.",
    status: "Open", priority: "High",
    customer: "Emeka Nwachukwu", customerInitials: "EN",
    vendor: "Premium Groceries",
    createdDate: "May 27, 2026", comments: 2,
  },
  {
    id: "DR-2839", orderId: "ORD-12001",
    category: "Refund Request", amount: 9400,
    description: "Cancelled order but refund has not been processed after 5 days.",
    status: "In Progress", priority: "Medium",
    customer: "Fatima Hassan", customerInitials: "FH",
    vendor: "Quick Mart",
    createdDate: "May 25, 2026", comments: 9,
    assignedTo: "Support Agent 2",
  },
  {
    id: "DR-2838", orderId: "ORD-11960",
    category: "Product Quality", amount: 6700,
    description: "Purchased expired products. This is a serious health concern.",
    status: "Escalated", priority: "High",
    customer: "Oluwaseun Balogun", customerInitials: "OB",
    vendor: "Daily Needs Shop",
    createdDate: "May 24, 2026", comments: 12,
    assignedTo: "Senior Manager",
  },
  {
    id: "DR-2837", orderId: "ORD-11854",
    category: "Delivery Issue", amount: 4500,
    description: "Package was delivered to wrong street. Neighbour handed it over two days later.",
    status: "Resolved", priority: "Low",
    customer: "Aisha Suleiman", customerInitials: "AS",
    vendor: "Campus Bites",
    createdDate: "May 22, 2026", comments: 4,
    resolution: "Vendor apologised and issued partial refund.",
  },
  {
    id: "DR-2836", orderId: "ORD-11800",
    category: "Wrong Item", amount: 11200,
    description: "Ordered chicken but received fish. Dietary restrictions were not respected.",
    status: "Escalated", priority: "High",
    customer: "Tunde Fashola", customerInitials: "TF",
    vendor: "Fresh Foods Market",
    createdDate: "May 20, 2026", comments: 6,
    assignedTo: "Senior Manager",
  },
];

// ─── Filter options ───────────────────────────────────────────────────────────

export const STATUS_FILTERS: StatusFilterOption[] = [
  "All Status", "Open", "In Progress", "Escalated", "Resolved",
];

export const PRIORITY_FILTERS: PriorityFilterOption[] = [
  "All Priority", "High", "Medium", "Low",
];

// ─── Live stats derived from current disputes array ───────────────────────────

export function computeDisputeStats(disputes: Dispute[]): DisputeStats {
  return {
    total:      disputes.length,
    open:       disputes.filter(d => d.status === "Open").length,
    inProgress: disputes.filter(d => d.status === "In Progress").length,
    escalated:  disputes.filter(d => d.status === "Escalated").length,
    resolved:   disputes.filter(d => d.status === "Resolved").length,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatAmount(n: number): string {
  return `₦${n.toLocaleString()}`;
}
