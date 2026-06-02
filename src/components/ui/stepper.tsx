/**
 * Stepper - horizontal step indicator for multi-step wizards (vendor
 * onboarding, checkout, hostel booking). Visual only; wizard state lives in
 * Redux (`store/slices/wizard.ts`).
 */
import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step {
  id: string;
  label: string;
}

interface StepperProps {
  steps: Step[];
  /** 0-based index of the current step. */
  current: number;
  className?: string;
}

export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <ol className={cn('flex items-center gap-2', className)} aria-label="Progress">
      {steps.map((step, i) => {
        const isComplete = i < current;
        const isActive = i === current;
        return (
          <li key={step.id} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors',
                isComplete && 'bg-ink text-cream',
                isActive && 'bg-lime text-ink ring-ink/15 ring-4',
                !isComplete && !isActive && 'bg-surface-deep text-content-muted',
              )}
              aria-current={isActive ? 'step' : undefined}
            >
              {isComplete ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
            </div>
            <span
              className={cn(
                'truncate text-sm',
                isActive ? 'text-content font-medium' : 'text-content-muted',
              )}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && <div className="bg-ink/10 mx-2 h-px flex-1" />}
          </li>
        );
      })}
    </ol>
  );
}
