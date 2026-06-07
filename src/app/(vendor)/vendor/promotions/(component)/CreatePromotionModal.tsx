'use client';

/**
 * CreatePromotionModal
 * ────────────────────
 * • Desktop (md+): centred Dialog overlay
 * • Mobile (< md): bottom Sheet that slides up like a form sheet
 *
 * Both share the same <PromotionForm /> so all logic lives in one place.
 *
 * API wiring
 * ──────────
 * Pass an `onSubmit` prop. It receives a `CreatePromotionPayload` and should
 * call your API, then close the modal on success by setting `open={false}`.
 *
 * Example:
 *   async function handleCreate(payload) {
 *     await api.post('/promotions', payload);
 *     setModalOpen(false);
 *   }
 *   <CreatePromotionModal open={modalOpen} onOpenChange={setModalOpen} onSubmit={handleCreate} />
 */

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { PromotionType } from './types';

// ── payload type (matches what your API will expect) ─────────────────────────
export interface CreatePromotionPayload {
  promotionType: PromotionType;
  campaignName: string;
  startDate: string; // ISO date string "YYYY-MM-DD"
  endDate: string;
  dailyBudget: number; // in Naira
}

// ── props ─────────────────────────────────────────────────────────────────────
export interface CreatePromotionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pre-select a promotion type (e.g. when user clicks a type card) */
  defaultPromotionType?: PromotionType | null;
  /**
   * Called on form submit. Receives the validated payload.
   * Set `open={false}` inside this callback once your API call succeeds.
   */
  onSubmit?: (payload: CreatePromotionPayload) => void | Promise<void>;
  isSubmitting?: boolean;
}

// ── promotion type options ────────────────────────────────────────────────────
const PROMOTION_TYPES: PromotionType[] = [
  'Featured Listing',
  'Sponsored Product',
  'Discount Campaign',
  'Coupon Campaign',
  'Flash Sale',
];

// ── shared form ───────────────────────────────────────────────────────────────
interface PromotionFormProps {
  defaultPromotionType?: PromotionType | null;
  onCancel: () => void;
  onSubmit: (payload: CreatePromotionPayload) => void | Promise<void>;
  isSubmitting?: boolean;
}

function PromotionForm({
  defaultPromotionType,
  onCancel,
  onSubmit,
  isSubmitting,
}: PromotionFormProps) {
  const [promotionType, setPromotionType] = React.useState<PromotionType | ''>(
    defaultPromotionType ?? '',
  );
  const [campaignName, setCampaignName] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [dailyBudget, setDailyBudget] = React.useState('');
  const [errors, setErrors] = React.useState<Partial<Record<keyof CreatePromotionPayload, string>>>(
    {},
  );

  // Sync if parent changes the defaultPromotionType (e.g. user clicks a type card)
  React.useEffect(() => {
    if (defaultPromotionType) setPromotionType(defaultPromotionType);
  }, [defaultPromotionType]);

  function validate(): boolean {
    const next: typeof errors = {};
    if (!promotionType) next.promotionType = 'Please select a promotion type.';
    if (!campaignName.trim()) next.campaignName = 'Campaign name is required.';
    if (!startDate) next.startDate = 'Start date is required.';
    if (!endDate) next.endDate = 'End date is required.';
    if (startDate && endDate && endDate < startDate)
      next.endDate = 'End date must be after start date.';
    if (!dailyBudget || Number(dailyBudget) <= 0)
      next.dailyBudget = 'Enter a valid budget greater than 0.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    await onSubmit({
      promotionType: promotionType as PromotionType,
      campaignName: campaignName.trim(),
      startDate,
      endDate,
      dailyBudget: Number(dailyBudget),
    });
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Promotion Type */}
      <Field label="Promotion Type" error={errors.promotionType}>
        <Select
          value={promotionType}
          onValueChange={(v) => {
            setPromotionType(v as PromotionType);
            setErrors((e) => ({ ...e, promotionType: undefined }));
          }}
        >
          <SelectTrigger
            className={cn(errors.promotionType && 'border-red-400 focus:border-red-400')}
          >
            <SelectValue placeholder="Select a type…" />
          </SelectTrigger>
          <SelectContent>
            {PROMOTION_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* Campaign Name */}
      <Field label="Campaign Name" error={errors.campaignName}>
        <Input
          placeholder="e.g. Weekend Jollof Special"
          value={campaignName}
          onChange={(e) => {
            setCampaignName(e.target.value);
            setErrors((err) => ({ ...err, campaignName: undefined }));
          }}
          className={cn(errors.campaignName && 'border-red-400 focus:border-red-400')}
        />
      </Field>

      {/* Date row */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Start Date" error={errors.startDate}>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setErrors((err) => ({ ...err, startDate: undefined }));
            }}
            className={cn(errors.startDate && 'border-red-400 focus:border-red-400')}
          />
        </Field>
        <Field label="End Date" error={errors.endDate}>
          <Input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setErrors((err) => ({ ...err, endDate: undefined }));
            }}
            className={cn(errors.endDate && 'border-red-400 focus:border-red-400')}
          />
        </Field>
      </div>

      {/* Daily Budget */}
      <Field label="Daily Budget (₦)" error={errors.dailyBudget}>
        <div className="relative">
          <span className="text-content-muted absolute top-1/2 left-3 -translate-y-1/2 text-sm select-none">
            ₦
          </span>
          <Input
            type="number"
            min={0}
            placeholder="e.g. 2000"
            value={dailyBudget}
            onChange={(e) => {
              setDailyBudget(e.target.value);
              setErrors((err) => ({ ...err, dailyBudget: undefined }));
            }}
            className={cn('pl-7', errors.dailyBudget && 'border-red-400 focus:border-red-400')}
          />
        </div>
      </Field>

      {/* Actions */}
      <div className="mt-1 grid grid-cols-2 gap-3">
        <Button variant="outline" size="md" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-lime-600 text-white hover:bg-lime-700"
        >
          {isSubmitting ? 'Launching…' : 'Launch Campaign'}
        </Button>
      </div>
    </div>
  );
}

// ── tiny field wrapper ────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-content text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── useIsMobile ───────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

// ── main export ───────────────────────────────────────────────────────────────
export function CreatePromotionModal({
  open,
  onOpenChange,
  defaultPromotionType,
  onSubmit,
  isSubmitting,
}: CreatePromotionModalProps) {
  const isMobile = useIsMobile();

  const sharedFormProps: PromotionFormProps = {
    defaultPromotionType,
    onCancel: () => onOpenChange(false),
    onSubmit: onSubmit ?? (() => {}),
    isSubmitting,
  };

  // ── Mobile: bottom sheet ──────────────────────────────────────────────────
  if (isMobile) {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Portal>
          {/* Backdrop */}
          <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />

          {/* Bottom sheet */}
          <DialogPrimitive.Content
            className={cn(
              'fixed inset-x-0 bottom-0 z-50',
              'bg-panel shadow-pop rounded-t-2xl',
              'max-h-[92dvh] overflow-y-auto',
              // slide-up animation
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
              'duration-300 ease-out',
            )}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="bg-line/20 h-1 w-10 rounded-full" />
            </div>

            <div className="px-5 pt-3 pb-8">
              {/* Header */}
              <div className="mb-5 flex items-center justify-between">
                <DialogPrimitive.Title className="font-display text-content text-lg font-bold">
                  Create Promotion
                </DialogPrimitive.Title>
                <DialogPrimitive.Close
                  aria-label="Close"
                  className="text-content-muted hover:bg-surface-deep hover:text-content flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </DialogPrimitive.Close>
              </div>

              <PromotionForm {...sharedFormProps} />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }

  // ── Desktop: centred dialog ───────────────────────────────────────────────
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop */}
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />

        {/* Dialog panel */}
        <DialogPrimitive.Content
          className={cn(
            'fixed top-1/2 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2',
            'bg-panel shadow-pop rounded-2xl p-6',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'duration-200',
          )}
        >
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <DialogPrimitive.Title className="font-display text-content text-lg font-bold">
              Create Promotion
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Close"
              className="text-content-muted hover:bg-surface-deep hover:text-content flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </div>

          <PromotionForm {...sharedFormProps} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
