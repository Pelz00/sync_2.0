// ─── Types ────────────────────────────────────────────────────────────────────

export type VisitStatus = "Scheduled" | "In Progress" | "Completed" | "Failed";

export interface VerificationVisit {
  id: string;
  vendorId: string;
  vendor: string;
  date: string;
  time: string;
  location: string;
  inspector: string;
  status: VisitStatus;
  notes?: string;
  result?: string;
  category: string;
  phone?: string;
}

export interface VisitStats {
  total: number;
  scheduled: number;
  completed: number;
  failed: number;
}


export const VISITS: VerificationVisit[] = [
  {
    id: "VIS-1024", 
    vendorId: "VEN-2843",
    vendor: "Fresh Foods Market",
    date: "05 Jun 2026", 
    time: "10:00 AM",
    location: "12 Marina Street, Lagos",
    inspector: "Inspector John Doe",
    status: "Scheduled",
    notes: "Initial verification visit",
    category: "Food & Grocery", 
    phone: "+234 801 234 5678",
  },
  {
    id: "VIS-1023", 
    vendorId: "VEN-2842",
    vendor: "Organic Grocers",
    date: "03 Jun 2026", 
    time: "2:00 PM",
    location: "45 Wuse 2, Abuja",
    inspector: "Inspector Jane Smith",
    status: "Completed",
    notes: "All documents verified. Standards met.", 
    result: "Passed",
    category: "Food & Grocery", 
    phone: "+234 802 345 6789",
  },
  {
    id: "VIS-1022", 
    vendorId: "VEN-2841",
    vendor: "Quick Mart",
    date: "04 Jun 2026", 
    time: "11:30 AM",
    location: "78 Trans Amadi, Port Harcourt",
    inspector: "Inspector John Doe",
    status: "In Progress",
    notes: "Inspector on-site, review underway",
    category: "Convenience Store", 
    phone: "+234 803 456 7890",
  },
  {
    id: "VIS-1021", 
    vendorId: "VEN-2839",
    vendor: "Daily Needs Shop",
    date: "02 Jun 2026", 
    time: "9:00 AM",
    location: "23 Bodija Road, Ibadan",
    inspector: "Inspector Jane Smith",
    status: "Failed",
    notes: "Vendor did not have required documentation",
    result: "Failed - License issues",
    category: "Convenience Store", 
    phone: "+234 804 567 8901",
  },
  {
    id: "VIS-1020", 
    vendorId: "VEN-2838",
    vendor: "Premium Groceries",
    date: "06 Jun 2026", 
    time: "3:00 PM",
    location: "56 Independence Layout, Enugu",
    inspector: "Inspector Mike Johnson",
    status: "Scheduled",
    notes: "Follow-up verification after document resubmission",
    category: "Food & Grocery", 
    phone: "+234 805 678 9012",
  },
  {
    id: "VIS-1019", 
    vendorId: "VEN-2837",
    vendor: "Campus Bites",
    date: "01 Jun 2026", 
    time: "1:00 PM",
    location: "UNILORIN Campus Gate, Ilorin",
    inspector: "Inspector John Doe",
    status: "Completed",
    notes: "Spot-check on food safety compliance", 
    result: "Passed",
    category: "Food & Canteen", 
    phone: "+234 806 789 0123",
  },
];

// live stats from the visits array.
export function computeStats(visits: VerificationVisit[]): VisitStats {
  return {
    total: visits.length,
    scheduled: visits.filter(v => v.status === "Scheduled").length,
    completed: visits.filter(v => v.status === "Completed").length,
    failed: visits.filter(v => v.status === "Failed").length,
  };
}

export const STATUS_FILTER_OPTIONS = [
  "All Visits", "Scheduled", "In Progress", "Completed", "Failed",
] as const;
export type StatusFilter = typeof STATUS_FILTER_OPTIONS[number];