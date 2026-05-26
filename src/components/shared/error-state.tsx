/**
 * ErrorState — friendly error surface for `error.tsx` boundaries and inline
 * failures. NEVER show raw error.message or stack traces; surface a generic
 * message and offer a retry. Real errors go to the logger, not the user.
 */
'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  description?: string;
  /** Optional retry handler (e.g. Next.js `reset` from error.tsx). */
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went off-track',
  description = 'We hit an issue loading this. Try again in a moment — if it keeps happening, reach out to support.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'border-coral/30 bg-cream flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center',
        className,
      )}
    >
      <AlertTriangle className="text-coral h-8 w-8" aria-hidden="true" />
      <h3 className="font-display text-card text-ink mt-2">{title}</h3>
      <p className="text-muted max-w-md text-sm">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          Try again
        </Button>
      )}
    </div>
  );
}
