/**
 * RadioGroup + RadioGroupItem - Radix-backed. Use for mutually exclusive choices.
 * For complex choice cards (e.g. plan tiers), use `PlanCard` in shared/ instead.
 */
'use client';

import * as React from 'react';
import * as RadioPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root>
>(function RadioGroup({ className, ...props }, ref) {
  return <RadioPrimitive.Root ref={ref} className={cn('grid gap-2', className)} {...props} />;
});

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioPrimitive.Item>
>(function RadioGroupItem({ className, ...props }, ref) {
  return (
    <RadioPrimitive.Item
      ref={ref}
      className={cn(
        'border-line/25 bg-panel aspect-square h-5 w-5 rounded-full border transition-colors',
        'data-[state=checked]:border-line',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator className="flex items-center justify-center">
        <span className="bg-lime block h-2.5 w-2.5 rounded-full" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Item>
  );
});
