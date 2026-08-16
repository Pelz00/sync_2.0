import { properties, type Property } from '@/mock/StatsCard';

export { properties };
export type { Property };

/* ============================================================
   Formatting helpers
   ============================================================ */

export function formatNaira(amount: number, compact = false): string {
  if (compact) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

/* ============================================================
   Bookings & Tenants
   ============================================================ */

export type PaymentStatus = 'paid' | 'due' | 'overdue';

export type BookingRequest = {
  id: string;
  name: string;
  avatar?: string;
  propertyId: string;
  property: string;
  requestedMoveIn: string;
  amount: number;
  studentVerified: boolean;
  submitted: string;
};

export const bookingRequests: BookingRequest[] = [
  {
    id: 'br1',
    name: 'Aisha Okonkwo',
    propertyId: '1',
    property: 'Tanke Crescent',
    requestedMoveIn: '2026-09-05',
    amount: 180000,
    studentVerified: true,
    submitted: '2 hours ago',
  },
  {
    id: 'br2',
    name: 'Maryam Abdullahi',
    propertyId: '2',
    property: 'Harmony Estate',
    requestedMoveIn: '2026-09-01',
    amount: 150000,
    studentVerified: true,
    submitted: '5 hours ago',
  },
  {
    id: 'br3',
    name: 'Muiz Olawale',
    propertyId: '1',
    property: 'Tanke Crescent',
    requestedMoveIn: '2026-09-10',
    amount: 180000,
    studentVerified: false,
    submitted: 'Yesterday',
  },
];

export type Tenant = {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  school: string;
  studentVerified: boolean;
  propertyId: string;
  property: string;
  moveIn: string;
  leaseEnd: string;
  paymentStatus: PaymentStatus;
  bookingHistory: { property: string; period: string }[];
};

export const tenants: Tenant[] = [
  {
    id: 'tn1',
    name: 'Chidinma Balogun',
    email: 'chidinma.b@example.edu.ng',
    phone: '+234 802 111 2233',
    school: 'University of Ilorin',
    studentVerified: true,
    propertyId: '1',
    property: 'Tanke Crescent',
    moveIn: '2025-09-10',
    leaseEnd: '2026-07-15',
    paymentStatus: 'paid',
    bookingHistory: [{ property: 'Tanke Crescent', period: 'Sep 2025 – Jul 2026' }],
  },
  {
    id: 'tn2',
    name: 'Emeka Nwosu',
    email: 'emeka.n@example.edu.ng',
    phone: '+234 803 222 3344',
    school: 'Kwara State University',
    studentVerified: true,
    propertyId: '2',
    property: 'Harmony Estate',
    moveIn: '2025-09-08',
    leaseEnd: '2026-07-10',
    paymentStatus: 'due',
    bookingHistory: [{ property: 'Harmony Estate', period: 'Sep 2025 – Jul 2026' }],
  },
  {
    id: 'tn3',
    name: 'Grace Udo',
    email: 'grace.udo@example.edu.ng',
    phone: '+234 805 333 4455',
    school: 'University of Ilorin',
    studentVerified: true,
    propertyId: '2',
    property: 'Harmony Estate',
    moveIn: '2025-09-12',
    leaseEnd: '2026-07-18',
    paymentStatus: 'overdue',
    bookingHistory: [{ property: 'Harmony Estate', period: 'Sep 2025 – Jul 2026' }],
  },
];

/* ============================================================
   Verification (KYC)
   ============================================================ */

export type KycStatus = 'not_started' | 'submitted' | 'under_review' | 'verified' | 'rejected';

export const kycStatus: KycStatus = 'under_review';
export const kycRejectionReason: string | null = null;

export type KycDocument = {
  id: string;
  label: string;
  description: string;
  fileName?: string;
  uploadedAt?: string;
};

export const kycDocuments: KycDocument[] = [
  {
    id: 'id',
    label: 'Government ID',
    description: "NIN slip, driver's licence or international passport",
    fileName: 'nin-slip.pdf',
    uploadedAt: '2 Aug 2026',
  },
  {
    id: 'address',
    label: 'Proof of Address',
    description: 'Utility bill issued within the last 3 months',
    fileName: 'phcn-bill-july.jpg',
    uploadedAt: '2 Aug 2026',
  },
  {
    id: 'business',
    label: 'Business Registration',
    description: 'CAC certificate (optional for individual landlords)',
  },
];

/* ============================================================
   Inbox / Inquiries
   ============================================================ */

export type ChatMessage = {
  id: string;
  from: 'student' | 'landlord';
  body: string;
  time: string;
};

export type Inquiry = {
  id: string;
  studentName: string;
  studentInitials: string;
  propertyId: string;
  propertyName: string;
  preview: string;
  unread: boolean;
  time: string;
  thread: ChatMessage[];
};

export const inquiries: Inquiry[] = [
  {
    id: 'i1',
    studentName: 'Chidinma Okeke',
    studentInitials: 'CO',
    propertyId: '1',
    propertyName: 'Tanke Crescent',
    preview: 'Is the room still available for the new session?',
    unread: true,
    time: '09:24',
    thread: [
      { id: 'm1', from: 'student', body: 'Hi, good morning!', time: '09:20' },
      { id: 'm2', from: 'student', body: 'Is the room still available for the new session?', time: '09:24' },
    ],
  },
  {
    id: 'i2',
    studentName: 'Emeka Nwosu',
    studentInitials: 'EN',
    propertyId: '2',
    propertyName: 'Harmony Estate',
    preview: "Thank you, I'll transfer the deposit today.",
    unread: false,
    time: 'Yesterday',
    thread: [
      { id: 'm1', from: 'student', body: 'Please can I get the account details for the deposit?', time: 'Yesterday' },
      { id: 'm2', from: 'landlord', body: "Sure, I'll send them to you shortly.", time: 'Yesterday' },
      { id: 'm3', from: 'student', body: "Thank you, I'll transfer the deposit today.", time: 'Yesterday' },
    ],
  },
  {
    id: 'i3',
    studentName: 'Aisha Okonkwo',
    studentInitials: 'AO',
    propertyId: '1',
    propertyName: 'Tanke Crescent',
    preview: 'Does the rent cover electricity and water?',
    unread: true,
    time: 'Mon',
    thread: [{ id: 'm1', from: 'student', body: 'Does the rent cover electricity and water?', time: 'Mon' }],
  },
];

export const quickReplies: string[] = [
  'Yes, the room is still available.',
  'The rent covers water but electricity is metered separately.',
  'You can come for an inspection this weekend.',
  'Kindly send me your full name and matric number to proceed.',
];

/* ============================================================
   Earnings & Payouts
   ============================================================ */

export type EarningsPoint = { period: string; amount: number };

export const monthlyEarnings: EarningsPoint[] = [
  { period: 'Jan', amount: 240000 },
  { period: 'Feb', amount: 310000 },
  { period: 'Mar', amount: 280000 },
  { period: 'Apr', amount: 420000 },
  { period: 'May', amount: 390000 },
  { period: 'Jun', amount: 510000 },
  { period: 'Jul', amount: 620000 },
  { period: 'Aug', amount: 480000 },
];

export const yearlyEarnings: EarningsPoint[] = [
  { period: '2022', amount: 1850000 },
  { period: '2023', amount: 2640000 },
  { period: '2024', amount: 3120000 },
  { period: '2025', amount: 3980000 },
  { period: '2026', amount: 2450000 },
];

export type TransactionStatus = 'paid' | 'pending' | 'failed';

export type Transaction = {
  id: string;
  date: string;
  tenant: string;
  property: string;
  amount: number;
  status: TransactionStatus;
};

export const transactions: Transaction[] = [
  { id: 't1', date: '6 Aug 2026', tenant: 'Emeka Nwosu', property: 'Harmony Estate', amount: 150000, status: 'paid' },
  { id: 't2', date: '3 Aug 2026', tenant: 'Grace Udo', property: 'Harmony Estate', amount: 150000, status: 'paid' },
  { id: 't3', date: '1 Aug 2026', tenant: 'Chidinma Balogun', property: 'Tanke Crescent', amount: 180000, status: 'pending' },
  { id: 't4', date: '24 Jul 2026', tenant: 'Grace Udo', property: 'Harmony Estate', amount: 150000, status: 'failed' },
];

export type PayoutMethod = { bankName: string; accountName: string; accountNumber: string } | null;

export const payoutMethod: PayoutMethod = {
  bankName: 'Guaranty Trust Bank',
  accountName: 'Adaeze Okonkwo',
  accountNumber: '0123456789',
};

export const availableBalance = 470000;
export const pendingPayout = 200000;

/* ============================================================
   Reviews
   ============================================================ */

export type Review = {
  id: string;
  studentName: string;
  studentInitials: string;
  propertyName: string;
  rating: number;
  date: string;
  body: string;
  response?: string;
};

export const reviews: Review[] = [
  {
    id: 'r1',
    studentName: 'Grace Udo',
    studentInitials: 'GU',
    propertyName: 'Harmony Estate',
    rating: 5,
    date: '4 Aug 2026',
    body: 'Very clean and secure. The landlord responds quickly and the location is close to campus.',
    response: 'Thank you Grace! It was a pleasure hosting you this session.',
  },
  {
    id: 'r2',
    studentName: 'Emeka Nwosu',
    studentInitials: 'EN',
    propertyName: 'Harmony Estate',
    rating: 4,
    date: '30 Jul 2026',
    body: 'Good value for money. Water supply is steady but the compound could use better lighting at night.',
  },
  {
    id: 'r3',
    studentName: 'Chidinma Balogun',
    studentInitials: 'CB',
    propertyName: 'Tanke Crescent',
    rating: 5,
    date: '22 Jul 2026',
    body: 'Spacious room and friendly neighbours. The booking process on Sync was smooth.',
  },
];
