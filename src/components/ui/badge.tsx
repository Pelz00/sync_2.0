/**
 * Badge — compact status label. Variants for neutral, accent, warning, success.
 * For domain-specific badges (e.g. "Verified vendor"), wrap this in components/shared.
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-mono text-[10px] font-medium uppercase tracking-[0.12em]',
  {
    variants: {
      variant: {
        neutral: 'bg-ink/8 text-ink',
        accent: 'bg-lime text-ink',
        outline: 'border border-ink/15 text-ink',
        warning: 'bg-coral/20 text-ink',
        muted: 'bg-cream-deep text-muted',
      },
      size: {
        sm: 'h-5 px-2',
        md: 'h-6 px-2.5',
      },
    },
    defaultVariants: { variant: 'neutral', size: 'md' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
