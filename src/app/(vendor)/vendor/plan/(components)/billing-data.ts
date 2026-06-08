import type { Plan, CurrentPlan, PaymentMethod, Invoice } from '../types';

// ─── Plans ────────────────────────────────────────────────────────────────────

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Perfect for new vendors just getting started',
    price: 0,
    priceLabel: 'Free',
    commission: 5,
    features: [
      { label: 'Up to 10 listings' },
      { label: '5% platform commission' },
      { label: 'Basic analytics' },
      { label: 'Email support' },
      { label: 'Standard storefront' },
    ],
    cta: 'downgrade',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For vendors scaling their business',
    price: 4999,
    priceLabel: '₦4,999',
    commission: 3,
    features: [
      { label: 'Up to 50 listings' },
      { label: '3% platform commission' },
      { label: 'Advanced analytics' },
      { label: 'Priority support' },
      { label: 'Custom storefront' },
      { label: 'Promotional tools' },
      { label: 'Order management' },
    ],
    cta: 'current',
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For established sellers needing more power',
    price: 12999,
    priceLabel: '₦12,999',
    commission: 2,
    features: [
      { label: 'Unlimited listings' },
      { label: '2% platform commission' },
      { label: 'Full analytics suite' },
      { label: 'Dedicated support' },
      { label: 'Custom domain' },
      { label: 'Featured placement' },
      { label: 'API access' },
      { label: 'Team accounts (3)' },
    ],
    cta: 'upgrade',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Tailored solutions for large operations',
    price: null,
    priceLabel: 'Custom',
    commission: null,
    features: [
      { label: 'Unlimited everything' },
      { label: '1% platform commission' },
      { label: 'Custom analytics' },
      { label: '24/7 dedicated support' },
      { label: 'White-label storefront' },
      { label: 'Custom integrations' },
      { label: 'SLA guarantee' },
      { label: 'Unlimited team members' },
    ],
    cta: 'contact',
    highlighted: true,
  },
];

// ─── Current Plan ─────────────────────────────────────────────────────────────

export const CURRENT_PLAN: CurrentPlan = {
  planId: 'growth',
  name: 'Growth',
  price: 4999,
  renewsAt: '2026-07-01',
  commission: 3,
  features: ['Up to 50 listings', '3% platform commission', 'Advanced analytics', 'Priority support'],
};

// ─── Payment Method ───────────────────────────────────────────────────────────

// Set to null to simulate a first-time user with no card on file
export const PAYMENT_METHOD: PaymentMethod | null = {
  last4: '4321',
  brand: 'Mastercard',
  expiresAt: '09/2028',
  billingEmail: 'john@johnsstore.com',
};

// ─── Invoices ─────────────────────────────────────────────────────────────────

export const INVOICES: Invoice[] = [
  {
    id: 'INV-1024',
    date: '2026-06-01',
    plan: 'Growth',
    amount: 4999,
    status: 'Paid',
  },
  {
    id: 'INV-1023',
    date: '2026-05-01',
    plan: 'Growth',
    amount: 4999,
    status: 'Paid',
  },
  {
    id: 'INV-1022',
    date: '2026-04-01',
    plan: 'Growth',
    amount: 4999,
    status: 'Paid',
  },
  {
    id: 'INV-1021',
    date: '2026-03-01',
    plan: 'Starter',
    amount: 2499,
    status: 'Paid',
  },
  {
    id: 'INV-1020',
    date: '2026-02-01',
    plan: 'Starter',
    amount: 2499,
    status: 'Failed',
  },
  {
    id: 'INV-1019',
    date: '2026-01-01',
    plan: 'Starter',
    amount: 2499,
    status: 'Paid',
  },
];
