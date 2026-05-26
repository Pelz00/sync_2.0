/**
 * Spinner — small inline loading indicator. Prefer Skeleton for layout-level
 * loading; use Spinner inside buttons and inline actions.
 */
import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Spinner({
  className,
  ...props
}: React.SVGAttributes<SVGSVGElement>) {
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn('h-4 w-4 animate-spin', className)}
      {...props}
    />
  );
}
