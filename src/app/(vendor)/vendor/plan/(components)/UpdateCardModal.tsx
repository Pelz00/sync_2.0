'use client';

import { useState } from 'react';
import { CreditCard, Trash2, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PaymentMethod, CardFormValues } from './types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existing: PaymentMethod | null;
  onSave: (values: CardFormValues) => void;
  onRemove: () => void;
}

const EMPTY_FORM: CardFormValues = {
  cardNumber: '',
  cardHolder: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: '',
  billingEmail: '',
};

function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

export function UpdateCardModal({ open, onOpenChange, existing, onSave, onRemove }: Props) {
  const [form, setForm] = useState<CardFormValues>(EMPTY_FORM);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [errors, setErrors] = useState<Partial<CardFormValues>>({});

  const isNew = !existing;

  function set(field: keyof CardFormValues, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function validate(): boolean {
    const e: Partial<CardFormValues> = {};
    if (form.cardNumber.replace(/\s/g, '').length < 16)
      e.cardNumber = 'Enter a valid 16-digit card number';
    if (!form.cardHolder.trim()) e.cardHolder = 'Cardholder name is required';
    if (!form.expiryMonth || parseInt(form.expiryMonth) < 1 || parseInt(form.expiryMonth) > 12)
      e.expiryMonth = 'Invalid month';
    if (!form.expiryYear || form.expiryYear.length < 4) e.expiryYear = 'Invalid year';

    // Check if card is expired
    if (!e.expiryMonth && !e.expiryYear) {
      const month = parseInt(form.expiryMonth);
      const year = parseInt(form.expiryYear);
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        e.expiryMonth = 'Card has expired';
      }
    }

    if (form.cvv.length < 3) e.cvv = 'Invalid CVV';
    if (!form.billingEmail.includes('@')) e.billingEmail = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    onSave(form);
    setForm(EMPTY_FORM);
    onOpenChange(false);
  }

  function handleRemoveConfirm() {
    onRemove();
    setConfirmRemove(false);
    onOpenChange(false);
  }

  // ── Confirm remove sub-view ──────────────────────────────────────────────
  if (confirmRemove) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Remove payment method?</DialogTitle>
            <DialogDescription>
              Your card ending in <strong>{existing?.last4}</strong> will be removed. You won't be
              able to renew your plan until you add a new card.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmRemove(false)}>
              Cancel
            </Button>
            <Button variant="warning" onClick={handleRemoveConfirm}>
              <Trash2 className="h-4 w-4" />
              Yes, Remove Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // ── Main card form ────────────────────────────────────────────────────────
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-lime-500" />
            {isNew ? 'Add Payment Method' : 'Update Payment Method'}
          </DialogTitle>
          <DialogDescription>
            {isNew
              ? 'Add a card to activate your subscription and enable billing.'
              : 'Update your card details. Your next billing cycle will use the new card.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Card number */}
          <div>
            <label className="text-content-muted mb-1.5 block font-mono text-[10px] tracking-widest uppercase">
              Card Number
            </label>
            <Input
              placeholder="1234 5678 9012 3456"
              value={form.cardNumber}
              onChange={(e) => set('cardNumber', formatCardNumber(e.target.value))}
              className="font-mono tracking-wider ring-0! outline-none!"
            />
            {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
          </div>

          {/* Cardholder */}
          <div>
            <label className="text-content-muted mb-1.5 block font-mono text-[10px] tracking-widest uppercase">
              Cardholder Name
            </label>
            <Input
              placeholder="John Doe"
              value={form.cardHolder}
              onChange={(e) => set('cardHolder', e.target.value)}
              className="ring-0! outline-none!"
            />
            {errors.cardHolder && <p className="mt-1 text-xs text-red-500">{errors.cardHolder}</p>}
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-content-muted mb-1.5 block font-mono text-[10px] tracking-widest uppercase">
                Month
              </label>
              <Input
                placeholder="MM"
                maxLength={2}
                value={form.expiryMonth}
                onChange={(e) => set('expiryMonth', e.target.value.replace(/\D/g, ''))}
                className="ring-0! outline-none!"
              />
              {errors.expiryMonth && (
                <p className="mt-1 text-xs text-red-500">{errors.expiryMonth}</p>
              )}
            </div>
            <div>
              <label className="text-content-muted mb-1.5 block font-mono text-[10px] tracking-widest uppercase">
                Year
              </label>
              <Input
                placeholder="YYYY"
                maxLength={4}
                value={form.expiryYear}
                onChange={(e) => set('expiryYear', e.target.value.replace(/\D/g, ''))}
                className="ring-0! outline-none!"
              />
              {errors.expiryYear && (
                <p className="mt-1 text-xs text-red-500">{errors.expiryYear}</p>
              )}
            </div>
            <div>
              <label className="text-content-muted mb-1.5 block font-mono text-[10px] tracking-widest uppercase">
                CVV
              </label>
              <Input
                placeholder="123"
                maxLength={4}
                type="password"
                value={form.cvv}
                onChange={(e) => set('cvv', e.target.value.replace(/\D/g, ''))}
                className="ring-0! outline-none!"
              />
              {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
            </div>
          </div>

          {/* Billing email */}
          <div>
            <label className="text-content-muted mb-1.5 block font-mono text-[10px] tracking-widest uppercase">
              Billing Email
            </label>
            <Input
              placeholder="you@yourstore.com"
              type="email"
              value={form.billingEmail}
              onChange={(e) => set('billingEmail', e.target.value)}
              className="ring-0! outline-none!"
            />
            {errors.billingEmail && (
              <p className="mt-1 text-xs text-red-500">{errors.billingEmail}</p>
            )}
          </div>

          {/* Security note */}
          <p className="text-content-muted flex items-center gap-1.5 text-xs">
            <Lock className="h-3 w-3" />
            Your card details are encrypted and stored securely. We never store your full card
            number.
          </p>
        </div>

        <DialogFooter>
          {/* Remove card — only shown when updating existing */}
          {!isNew && (
            <Button
              variant="ghost"
              className="mr-auto text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => setConfirmRemove(true)}
            >
              <Trash2 className="h-4 w-4" />
              Remove Card
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-lime-600 text-white hover:bg-lime-700" onClick={handleSave}>
            {isNew ? 'Add Card' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
