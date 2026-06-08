export type Transaction = {
  id: string;
  description: string;
  type: 'order' | 'withdrawal' | 'refund';
  customer?: string;
  date: string;
  amount: number; // positive = credit, negative = debit
  status: 'Settled' | 'Completed' | 'Processed' | 'Pending';
};

export type TopProduct = {
  name: string;
  revenue: number;
};

export type RevenueDataPoint = {
  label: string; // e.g. "Jan", "Feb W1"
  revenue: number;
};

export type EarningsData = {
  availableBalance: number;
  pendingBalance: number;
  lifetimeEarnings: number;
  totalWithdrawn: number;
  lifetimeGrowthPct: number;
  totalPayouts: number;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  nextPayoutDate: string;
  monthlyRevenue: RevenueDataPoint[];
  weeklyRevenue: RevenueDataPoint[];
  topProducts: TopProduct[];
  transactions: Transaction[];
};
