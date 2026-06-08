'use client';

import { CreditCard, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PaymentMethod } from './types';

interface Props {
  method: PaymentMethod | null;
  onUpdate: () => void;
}

// Simple brand → bg colour mapping (extend as needed)
const brandColour: Record<string, string> = {
  Mastercard: 'bg-orange-500',
  Visa: 'bg-blue-600',
  Verve: 'bg-green-600',
};

export function PaymentMethodCard({ method, onUpdate }: Props) {
  if (!method) {
    // ── First-time / no card state ─────────────────────────────────────────
    return (
      <Card className="border-dashed border-line/20">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
            <CreditCard className="h-6 w-6 text-content-muted" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-content">No payment method</p>
            <p className="mt-0.5 text-xs text-content-muted">
              Add a card to activate billing and manage your subscription.
            </p>
          </div>
          <Button
            className="mt-1 bg-violet-600 text-white hover:bg-violet-700"
            size="sm"
            onClick={onUpdate}
          >
            <Plus className="h-4 w-4" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── Existing card state ────────────────────────────────────────────────
  const brandBg = brandColour[method.brand] ?? 'bg-ink';

  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-4">
        {/* Brand icon */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${brandBg} shrink-0`}
        >
          <CreditCard className="h-5 w-5 text-white" />
        </div>

        {/* Details */}
        <div className="flex-1">
          <p className="font-display text-sm font-semibold text-content">
            {method.brand} ending in {method.last4}
          </p>
          <p className="mt-0.5 text-xs text-content-muted">
            Expires {method.expiresAt} · Billing contact: {method.billingEmail}
          </p>
        </div>

        {/* Update button */}
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 border-violet-200 text-violet-600 hover:bg-violet-50"
          onClick={onUpdate}
        >
          Update
        </Button>
      </CardContent>
    </Card>
  );
}
