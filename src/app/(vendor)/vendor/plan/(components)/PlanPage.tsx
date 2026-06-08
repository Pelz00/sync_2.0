'use client';

/**
 * PlanPage — Subscription Plan management page.
 *
 * Data boundary:
 * All state is managed locally with mock data. When you wire up Supabase,
 * replace the useState initialisers with useSyncPlan() / useSyncBilling()
 * hooks that call your API layer. The component tree below doesn't care
 * where the data comes from.
 *
 * Supabase note:
 * Supabase has NO built-in billing/plans feature (unlike Clerk). You own the
 * schema. Recommended tables:
 *   - plans(id, name, price, commission, features jsonb, ...)
 *   - vendor_subscriptions(vendor_id FK, plan_id FK, renews_at, status, ...)
 *   - invoices(id, vendor_id FK, plan, amount, status, date, pdf_url, ...)
 *   - payment_methods(vendor_id FK, last4, brand, expires_at, billing_email)
 * Your API/server actions read & write these. This page consumes the API shape.
 */

import { useState } from 'react';

import { CurrentPlanBanner } from './CurrentPlanBanner';
import { PlanGrid } from './PlanGrid';
import { PaymentMethodCard } from './PaymentMethodCard';
import { UpdateCardModal } from './UpdateCardModal';
import { PlanChangeModal } from './PlanChangeModal';
import { BillingHistoryTable } from './BillingHistoryTable';

import type { CurrentPlan, PaymentMethod, Plan, PlanChangePayload, CardFormValues } from './types';
import { CURRENT_PLAN, INVOICES, PAYMENT_METHOD, PLANS } from './billing-data';

export default function PlanPage() {
  // ── Local state (swap for real hooks when API is ready) ──────────────────
  const [currentPlan, setCurrentPlan] = useState<CurrentPlan>(CURRENT_PLAN);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(PAYMENT_METHOD);

  // Modal state
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [planChangePayload, setPlanChangePayload] = useState<PlanChangePayload | null>(null);
  const [planChangeOpen, setPlanChangeOpen] = useState(false);

  // ── Handlers ─────────────────────────────────────────────────────────────

  /** Called when user picks a plan card (upgrade or downgrade) */
  function handleSelectPlan(targetPlan: Plan) {
    if (targetPlan.id === currentPlan.planId) return;

    const fromPlan = PLANS.find((p) => p.id === currentPlan.planId);
    if (!fromPlan) {
      console.error('Current plan not found in PLANS array:', currentPlan.planId);
      return;
    }

    const direction = PLANS.indexOf(targetPlan) > PLANS.indexOf(fromPlan) ? 'upgrade' : 'downgrade';

    setPlanChangePayload({ from: fromPlan, to: targetPlan, direction });
    setPlanChangeOpen(true);
  }

  /** Called after user confirms the plan change */
  function handleConfirmPlanChange(payload: PlanChangePayload) {
    // TODO: call API — POST /api/subscriptions/change { planId: payload.to.id }
    setCurrentPlan((prev) => ({
      ...prev,
      planId: payload.to.id,
      name: payload.to.name,
      price: payload.to.price ?? 0,
    }));
  }

  function handleSaveCard(values: CardFormValues) {
    // TODO: call API — POST /api/payment-methods { ...values }
    const digitsOnly = values.cardNumber.replace(/\s/g, '');
    if (digitsOnly.length < 4) {
      console.error('Invalid card number length');
      return;
    }

    setPaymentMethod({
      last4: digitsOnly.slice(-4),
      brand: 'Mastercard', // In real impl detect from BIN
      expiresAt: `${values.expiryMonth}/${values.expiryYear}`,
      billingEmail: values.billingEmail,
    });
  }

  /** Called when user removes their card */
  function handleRemoveCard() {
    // TODO: call API — DELETE /api/payment-methods
    setPaymentMethod(null);
  }

  // ── Derive plan list with correct CTAs based on current plan ─────────────
  const plansWithCTA = PLANS.map((plan) => {
    if (plan.id === currentPlan.planId) return { ...plan, cta: 'current' as const };
    const currentIndex = PLANS.findIndex((p) => p.id === currentPlan.planId);
    const targetIndex = PLANS.findIndex((p) => p.id === plan.id);
    if (plan.id === 'enterprise') return plan;
    return {
      ...plan,
      cta: targetIndex > currentIndex ? ('upgrade' as const) : ('downgrade' as const),
    };
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      {/* Page header */}
      <div>
        <h1 className="font-display text-content text-2xl font-bold">Subscription Plan</h1>
        <p className="text-content-muted mt-1 text-sm">Manage your plan and billing</p>
      </div>

      {/* Current plan banner */}
      <CurrentPlanBanner plan={currentPlan} />

      {/* Plan comparison grid */}
      <PlanGrid
        plans={plansWithCTA}
        currentPlanId={currentPlan.planId}
        onSelectPlan={handleSelectPlan}
      />

      {/* Payment method */}
      <section>
        <h2 className="font-display text-content mb-3 text-base font-semibold">Payment Method</h2>
        <PaymentMethodCard method={paymentMethod} onUpdate={() => setCardModalOpen(true)} />
      </section>

      {/* Billing history */}
      <BillingHistoryTable invoices={INVOICES} />

      {/* ── Modals ── */}
      <UpdateCardModal
        open={cardModalOpen}
        onOpenChange={setCardModalOpen}
        existing={paymentMethod}
        onSave={handleSaveCard}
        onRemove={handleRemoveCard}
      />

      <PlanChangeModal
        open={planChangeOpen}
        onOpenChange={setPlanChangeOpen}
        payload={planChangePayload}
        hasPaymentMethod={Boolean(paymentMethod)}
        onConfirm={handleConfirmPlanChange}
        onAddCard={() => setCardModalOpen(true)}
      />
    </div>
  );
}
