/**
 * QuantityStepper - numeric +/− control for cart line items and booking
 * quantities. Controlled via `value` + `onChange`; defaults to min=1, max=99.
 */
'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = 'Quantity',
  className,
}: QuantityStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('border-ink/15 inline-flex h-10 items-center rounded-full border bg-white', className)}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease"
        className="hover:bg-ink/5 flex h-full w-10 items-center justify-center rounded-l-full disabled:opacity-40"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span aria-live="polite" className="text-ink w-8 text-center text-sm font-medium">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase"
        className="hover:bg-ink/5 flex h-full w-10 items-center justify-center rounded-r-full disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
