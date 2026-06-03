export type Order = {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: number;
  payment: 'Paid' | 'Pending' | 'Failed';
  status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
};
