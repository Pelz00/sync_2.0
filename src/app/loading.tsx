/**
 * App-wide fallback shown while the next route segment streams in.
 * Per-route loading states should live in their own segment's loading.tsx.
 */
import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="bg-cream text-muted flex min-h-screen items-center justify-center gap-2 text-sm">
      <Spinner />
      <span>Loading…</span>
    </div>
  );
}
