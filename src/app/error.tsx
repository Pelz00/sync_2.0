/**
 * Top-level error boundary. Catches runtime errors that bubble past
 * route-level error.tsx files. Never leaks the underlying error.message
 * to the user - surfaces a friendly ErrorState with a retry handler.
 *
 * NOTE: `error.tsx` must be a Client Component (Next requirement).
 */
'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/shared/error-state';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: ship to a real error reporter (Sentry/Logflare) once wired.
    // The `digest` correlates server logs without exposing the message.
    console.error('App error', error.digest);
  }, [error]);

  return (
    <div className="bg-cream min-h-screen px-6 py-16">
      <div className="mx-auto max-w-xl">
        <ErrorState onRetry={reset} />
      </div>
    </div>
  );
}
