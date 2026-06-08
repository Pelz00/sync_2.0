// ─── Plan ─────────────────────────────────────────────────────────────────────

export type PlanId = 'starter' | 'growth' | 'professional' | 'enterprise';

export interface PlanFeature {
  label: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price: number | null; // null = custom
  priceLabel: string;
  commission: number | null; // null = custom
  features: PlanFeature[];
  cta: 'downgrade' | 'current' | 'upgrade' | 'contact';
  highlighted?: boolean; // dark card (enterprise)
}

export interface CurrentPlan {
  planId: PlanId;
  name: string;
  price: number;
  renewsAt: string; // ISO date string
  commission: number;
  features: string[];
}

// ─── Payment Method ───────────────────────────────────────────────────────────

export interface PaymentMethod {
  last4: string;
  brand: string; // 'Mastercard' | 'Visa' | 'Verve' etc.
  expiresAt: string; // 'MM/YYYY'
  billingEmail: string;
}

// Card form values (used in UpdateCardModal)
export interface CardFormValues {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  billingEmail: string;
}

// ─── Billing History ─────────────────────────────────────────────────────────

export type InvoiceStatus = 'Paid' | 'Failed' | 'Pending';

export interface Invoice {
  id: string;
  date: string; // ISO date string
  plan: string;
  amount: number;
  status: InvoiceStatus;
  pdfUrl?: string;
}

// ─── Plan Change ──────────────────────────────────────────────────────────────

export type PlanChangeDirection = 'upgrade' | 'downgrade';

export interface PlanChangePayload {
  from: Plan;
  to: Plan;
  direction: PlanChangeDirection;
}
