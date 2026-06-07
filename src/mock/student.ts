/**
 * Mock data for the student dashboard (/me) - the personal tracking hub:
 * bookings + how long until they end, events attended/upcoming, tickets, and a
 * usage/spending summary. Numbers are static (no date math) so they render the
 * same on server + client. Swap for the per-module queries.ts once Supabase lands.
 */
import {
  BedDouble,
  Bell,
  CalendarDays,
  MessageCircle,
  PiggyBank,
  Star,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

export interface UsageStat {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
}

/** KPI strip: "track what you're buying / using". */
export const studentUsage: UsageStat[] = [
  { label: 'TOTAL SPENT', value: '₦312,500', sub: 'this session', icon: Wallet },
  { label: 'ACTIVE BOOKINGS', value: '2', sub: '1 ending soon', icon: BedDouble },
  { label: 'UPCOMING EVENTS', value: '3', sub: '2 tickets held', icon: CalendarDays },
  { label: 'SAVED VIA SYNC', value: '₦18,200', sub: 'across deals', icon: PiggyBank },
];

export type BookingStatus = 'active' | 'awaiting' | 'ending_soon' | 'upcoming' | 'completed';

export interface StudentBooking {
  id: string;
  property: string;
  room: string;
  area: string;
  status: BookingStatus;
  /** Human move-in label, e.g. "Sept 5". */
  moveIn: string;
  /** Human end label, e.g. "Jul 30, 2027". */
  endDate: string;
  /** Days until the countdown target (end date, or move-in for upcoming). */
  daysLeft: number;
  pricePerSession: number;
  image: string;
}

export const studentBookings: StudentBooking[] = [
  {
    id: 'bk_1',
    property: 'Tanke Crescent Lodge',
    room: 'Room 4B',
    area: 'KWASU Gate',
    status: 'awaiting',
    moveIn: 'Sept 5',
    endDate: 'Jul 30, 2027',
    daysLeft: 18,
    pricePerSession: 165_000,
    image: '/images/hostel.jpeg',
  },
  {
    id: 'bk_2',
    property: 'Safari View Hostel',
    room: 'Self-contain B2',
    area: 'Safari',
    status: 'ending_soon',
    moveIn: 'Oct 1, 2025',
    endDate: 'Jun 30, 2026',
    daysLeft: 25,
    pricePerSession: 150_000,
    image: '/images/hostel.jpeg',
  },
  {
    id: 'bk_3',
    property: 'Pipeline Court',
    room: 'Sharing · Bed 3',
    area: 'Malete Town',
    status: 'active',
    moveIn: 'Jan 12, 2026',
    endDate: 'Dec 20, 2026',
    daysLeft: 198,
    pricePerSession: 95_000,
    image: '/images/hostel.jpeg',
  },
];

export type EventStatus = 'upcoming' | 'attended';

export interface StudentEvent {
  id: string;
  name: string;
  venue: string;
  date: string;
  time: string;
  status: EventStatus;
}

export const studentEvents: StudentEvent[] = [
  {
    id: 'ev_1',
    name: 'KWASU Tech Week',
    venue: 'CBT Auditorium',
    date: 'Jun 18, 2026',
    time: '10:00 AM',
    status: 'upcoming',
  },
  {
    id: 'ev_2',
    name: 'Malete Music Festival',
    venue: 'Mini Stadium',
    date: 'Jun 27, 2026',
    time: '6:00 PM',
    status: 'upcoming',
  },
  {
    id: 'ev_3',
    name: 'Founders Mixer',
    venue: 'SUB Hall',
    date: 'Jul 4, 2026',
    time: '4:00 PM',
    status: 'upcoming',
  },
  {
    id: 'ev_4',
    name: 'Afrobeats Night',
    venue: 'Safari Lounge',
    date: 'May 24, 2026',
    time: '8:00 PM',
    status: 'attended',
  },
  {
    id: 'ev_5',
    name: 'Career Fair 2026',
    venue: 'CBT Auditorium',
    date: 'May 10, 2026',
    time: '9:00 AM',
    status: 'attended',
  },
];

export type TicketStatus = 'valid' | 'used';

export interface StudentTicket {
  id: string;
  eventName: string;
  reference: string;
  date: string;
  venue: string;
  type: string;
  price: number;
  status: TicketStatus;
}

export const studentTickets: StudentTicket[] = [
  {
    id: 'tk_1',
    eventName: 'KWASU Tech Week',
    reference: 'SYNC-7F3A',
    date: 'Jun 18, 2026',
    venue: 'CBT Auditorium',
    type: 'Regular',
    price: 2_000,
    status: 'valid',
  },
  {
    id: 'tk_2',
    eventName: 'Malete Music Festival',
    reference: 'SYNC-91KD',
    date: 'Jun 27, 2026',
    venue: 'Mini Stadium',
    type: 'VIP',
    price: 7_500,
    status: 'valid',
  },
  {
    id: 'tk_3',
    eventName: 'Afrobeats Night',
    reference: 'SYNC-22XQ',
    date: 'May 24, 2026',
    venue: 'Safari Lounge',
    type: 'Regular',
    price: 3_000,
    status: 'used',
  },
  {
    id: 'tk_4',
    eventName: 'Career Fair 2026',
    reference: 'SYNC-5M0P',
    date: 'May 10, 2026',
    venue: 'CBT Auditorium',
    type: 'Free',
    price: 0,
    status: 'used',
  },
];

/** Past (completed) bookings - shown under the "Past" tab on /me/bookings. */
export const pastBookings: StudentBooking[] = [
  {
    id: 'pb_1',
    property: 'Harmony Lodge',
    room: 'Self-contain A1',
    area: 'KWASU Gate',
    status: 'completed',
    moveIn: 'Sep 1, 2024',
    endDate: 'Jul 15, 2025',
    daysLeft: 0,
    pricePerSession: 140_000,
    image: '/images/hostel.jpeg',
  },
  {
    id: 'pb_2',
    property: 'Unity Hostel',
    room: 'Sharing · Bed 1',
    area: 'Safari',
    status: 'completed',
    moveIn: 'Sep 3, 2023',
    endDate: 'Jul 20, 2024',
    daysLeft: 0,
    pricePerSession: 88_000,
    image: '/images/hostel.jpeg',
  },
];

export interface StudentNotification {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  timeAgo: string;
  unread: boolean;
  /** Where clicking navigates. `to` is a path suffix under the dashboard base
   *  (e.g. 'bookings' → /<handle>/bookings). `action: 'chat'` opens the chat. */
  to?: string;
  action?: 'chat';
}

export const studentNotifications: StudentNotification[] = [
  {
    id: 'n_1',
    icon: BedDouble,
    title: 'Booking update',
    body: 'Tanke Crescent Lodge accepted your booking request.',
    timeAgo: '12m ago',
    unread: true,
    to: 'bookings',
  },
  {
    id: 'n_2',
    icon: MessageCircle,
    title: 'New message',
    body: 'Mama Yetunde: “Your order is ready for pickup 🔥”.',
    timeAgo: '1h ago',
    unread: true,
    action: 'chat',
  },
  {
    id: 'n_3',
    icon: CalendarDays,
    title: 'Event reminder',
    body: 'KWASU Tech Week starts in 2 days. Your ticket is ready.',
    timeAgo: '5h ago',
    unread: true,
    to: 'events',
  },
  {
    id: 'n_4',
    icon: Wallet,
    title: 'Payment received',
    body: 'We confirmed your ₦7,500 payment for Malete Music Festival.',
    timeAgo: 'Yesterday',
    unread: false,
    to: 'insights',
  },
  {
    id: 'n_5',
    icon: Star,
    title: 'Leave a review',
    body: 'How was Harmony Lodge? Share a quick review.',
    timeAgo: '2d ago',
    unread: false,
    to: 'reviews',
  },
  {
    id: 'n_6',
    icon: Bell,
    title: 'New hostels near you',
    body: '3 new verified hostels match your Tanke + ₦250k search.',
    timeAgo: '3d ago',
    unread: false,
    to: 'saved',
  },
];

/** Custom event the chat float listens for, so a "message" notification can
 *  open the floating chat from anywhere. */
export const OPEN_CHAT_EVENT = 'sync:open-chat';

// ── Wallet ──────────────────────────────────────────────────────────────────
export type WalletTxnDirection = 'in' | 'out';

export interface WalletTxn {
  id: string;
  label: string;
  sub: string;
  amount: number;
  direction: WalletTxnDirection;
  date: string;
  status: 'completed' | 'pending';
  // Expandable detail (who we sent to / received from + account info).
  counterparty: string;
  accountNumber: string;
  bank: string;
  reference: string;
  method: string;
  time: string;
  fee: number;
}

export const walletBalance = 48_250;
export const walletStats = { addedThisMonth: 60_000, spentThisMonth: 31_750 };

export const walletTransactions: WalletTxn[] = [
  {
    id: 'wt_1',
    label: 'Top-up',
    sub: 'Bank transfer',
    amount: 50_000,
    direction: 'in',
    date: 'Jun 4, 2026',
    status: 'completed',
    counterparty: 'Muiz Owolabi',
    accountNumber: '0123456789',
    bank: 'GTBank',
    reference: 'SYNC-TP-7F3A2K',
    method: 'Bank transfer',
    time: '9:14 AM',
    fee: 0,
  },
  {
    id: 'wt_2',
    label: 'Tanke Crescent Lodge',
    sub: 'Hostel · booking deposit',
    amount: 25_000,
    direction: 'out',
    date: 'Jun 3, 2026',
    status: 'completed',
    counterparty: 'Tanke Crescent Lodge Ltd',
    accountNumber: '1029384756',
    bank: 'Moniepoint MFB',
    reference: 'SYNC-PAY-91KD7Q',
    method: 'Sync balance',
    time: '4:02 PM',
    fee: 0,
  },
  {
    id: 'wt_3',
    label: 'Mama Yetunde Kitchen',
    sub: 'Food · ORD-1180',
    amount: 4_500,
    direction: 'out',
    date: 'Jun 2, 2026',
    status: 'completed',
    counterparty: 'Yetunde Adeyemi',
    accountNumber: '2233445566',
    bank: 'OPay',
    reference: 'SYNC-PAY-22XQ8M',
    method: 'Sync balance',
    time: '1:37 PM',
    fee: 0,
  },
  {
    id: 'wt_4',
    label: 'Malete Music Festival',
    sub: 'Event ticket · VIP',
    amount: 7_500,
    direction: 'out',
    date: 'May 30, 2026',
    status: 'completed',
    counterparty: 'Sync Events',
    accountNumber: '9988776655',
    bank: 'Wema Bank',
    reference: 'SYNC-TKT-5M0P3L',
    method: 'Sync balance',
    time: '6:21 PM',
    fee: 0,
  },
  {
    id: 'wt_5',
    label: 'Refund',
    sub: 'Workmanship · cancelled job',
    amount: 3_000,
    direction: 'in',
    date: 'May 28, 2026',
    status: 'pending',
    counterparty: 'Sync Workmanship',
    accountNumber: '4455667788',
    bank: 'Sync',
    reference: 'SYNC-RFD-1180AA',
    method: 'Refund',
    time: '11:05 AM',
    fee: 0,
  },
  {
    id: 'wt_6',
    label: 'Top-up',
    sub: 'Card',
    amount: 10_000,
    direction: 'in',
    date: 'May 25, 2026',
    status: 'completed',
    counterparty: 'Muiz Owolabi',
    accountNumber: '**** **** **** 4291',
    bank: 'Verve · debit card',
    reference: 'SYNC-TP-0L9C2V',
    method: 'Card',
    time: '8:48 PM',
    fee: 50,
  },
];

/** Completed bookings/events awaiting a review (the "To review" tab). */
export interface ReviewPrompt {
  id: string;
  target: string;
  sub: string;
  date: string;
}

export const toReview: ReviewPrompt[] = [
  {
    id: 'tr_1',
    target: 'Harmony Lodge',
    sub: 'Hostel · KWASU Gate',
    date: 'Stayed until Jul 2025',
  },
  { id: 'tr_2', target: 'Afrobeats Night', sub: 'Event · Safari Lounge', date: 'Attended May 24' },
  {
    id: 'tr_3',
    target: 'Mama Yetunde Kitchen',
    sub: 'Food · Order #ORD-1180',
    date: 'Delivered May 30',
  },
];

/** Reviews the student has already posted (the "Posted" tab). */
export interface PostedReview {
  id: string;
  target: string;
  sub: string;
  rating: number;
  body: string;
  date: string;
}

export const postedReviews: PostedReview[] = [
  {
    id: 'pr_1',
    target: 'Unity Hostel',
    sub: 'Hostel · Safari',
    rating: 4,
    body: 'Quiet, secure, and close to the gate. Water supply was steady. Wardens were helpful all session.',
    date: 'Aug 2, 2024',
  },
  {
    id: 'pr_2',
    target: 'Suya Spot by Ali',
    sub: 'Food · Malete Town',
    rating: 5,
    body: 'Best suya around Malete, no cap. Always fresh and the delivery is fast.',
    date: 'Apr 18, 2026',
  },
  {
    id: 'pr_3',
    target: 'GlowUp Beauty',
    sub: 'Beauty · KWASU Gate',
    rating: 4,
    body: 'Neat braids and they kept to the appointment time. Will book again.',
    date: 'Mar 9, 2026',
  },
];
