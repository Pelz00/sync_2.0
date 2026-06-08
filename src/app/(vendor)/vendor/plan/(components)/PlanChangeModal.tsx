'use client';

import { ArrowRight, Check, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { PlanChangePayload } from './types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payload: PlanChangePayload | null;
  hasPaymentMethod: boolean;
  onConfirm: (payload: PlanChangePayload) => void;
  onAddCard: () => void;
}

export function PlanChangeModal({
  open,
  onOpenChange,
  payload,
  hasPaymentMethod,
  onConfirm,
  onAddCard,
}: Props) {
  if (!payload) return null;

  const { from, to, direction } = payload;
  const isUpgrade = direction === 'upgrade';
  const needsPayment = isUpgrade && !hasPaymentMethod;

  const priceDiff =
    to.price !== null && from.price !== null ? to.price - from.price : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isUpgrade ? (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                <ArrowRight className="h-4 w-4" />
              </span>
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
              </span>
            )}
            {isUpgrade ? 'Upgrade Plan' : 'Downgrade Plan'}
          </DialogTitle>
          <DialogDescription>
            You're switching from <strong>{from.name}</strong> to <strong>{to.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* Plan comparison */}
        <div className="rounded-xl border border-line/10 bg-surface-deep p-4">
          <div className="flex items-center justify-between gap-3">
            {/* From */}
            <div className="flex-1 text-center">
              <p className="font-mono text-[10px] uppercase tracking-widest text-content-muted">
                Current
              </p>
              <p className="font-display mt-0.5 text-lg font-bold text-content">{from.name}</p>
              <p className="text-sm text-content-muted">
                {from.price === 0 ? 'Free' : from.price !== null ? `₦${from.price.toLocaleString()}/mo` : 'Custom'}
              </p>
            </div>

            <ArrowRight className="h-5 w-5 shrink-0 text-content-muted" />

            {/* To */}
            <div className="flex-1 text-center">
              <p className="font-mono text-[10px] uppercase tracking-widest text-content-muted">
                New
              </p>
              <p
                className={`font-display mt-0.5 text-lg font-bold ${
                  isUpgrade ? 'text-violet-600' : 'text-amber-600'
                }`}
              >
                {to.name}
              </p>
              <p className="text-sm text-content-muted">
                {to.price === 0 ? 'Free' : to.price !== null ? `₦${to.price.toLocaleString()}/mo` : 'Custom'}
              </p>
            </div>
          </div>

          {/* Price diff callout */}
          {priceDiff !== null && (
            <div
              className={`mt-4 rounded-lg px-3 py-2 text-sm ${
                isUpgrade
                  ? 'bg-violet-50 text-violet-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              {isUpgrade
                ? `Your billing will increase by ₦${Math.abs(priceDiff).toLocaleString()}/mo starting next cycle.`
                : priceDiff === 0
                ? 'You will move to the free plan. No further charges.'
                : `You'll save ₦${Math.abs(priceDiff).toLocaleString()}/mo starting next cycle.`}
            </div>
          )}
        </div>

        {/* Downgrade warning */}
        {!isUpgrade && (
          <div className="flex gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              You'll lose access to <strong>{from.name}</strong> features at the end of your current
              billing period.
            </p>
          </div>
        )}

        {/* No payment method warning for upgrade */}
        {needsPayment && (
          <div className="flex gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              You need to add a payment method before upgrading.{' '}
              <button
                className="font-semibold underline"
                onClick={() => {
                  onOpenChange(false);
                  onAddCard();
                }}
              >
                Add card
              </button>
            </p>
          </div>
        )}

        {/* What you'll get */}
        {isUpgrade && (
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-content-muted">
              What you'll get
            </p>
            <ul className="space-y-1.5">
              {to.features.map((f) => (
                <li key={f.label} className="flex items-center gap-2 text-sm text-content">
                  <Check className="h-3.5 w-3.5 text-violet-500" />
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className={
              isUpgrade
                ? 'bg-violet-600 text-white hover:bg-violet-700'
                : 'bg-amber-500 text-white hover:bg-amber-600'
            }
            disabled={needsPayment}
            onClick={() => {
              onConfirm(payload);
              onOpenChange(false);
            }}
          >
            {isUpgrade ? 'Confirm Upgrade' : 'Confirm Downgrade'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
