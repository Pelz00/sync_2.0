/**
 * BrandLoader - full-viewport loader using the Sync visual mark
 * (two dots: lime-deep + lime) plus a subtle wordmark and a hairline
 * progress sweep. No spinner clichés; everything moves slow and quiet.
 *
 * Use cases:
 *   - app/loading.tsx (route-level Suspense boundary)
 *   - Wrapped in a Dialog for blocking actions
 *
 * For inline loading inside buttons or compact UI, prefer `<Spinner />`.
 */
import { cn } from '@/lib/utils';

interface BrandLoaderProps {
  /** Optional subline under the wordmark - context like 'Loading hostels…'. */
  label?: string;
  /** Render inside a parent rather than full screen. */
  inline?: boolean;
  className?: string;
}

export function BrandLoader({ label, inline, className }: BrandLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        'bg-cream text-ink flex flex-col items-center justify-center gap-6',
        inline ? 'h-full w-full py-16' : 'min-h-screen w-full',
        className,
      )}
    >
      {/* Two-dot brand mark, pulsing in a slow wave. */}
      <span aria-hidden="true" className="flex items-center gap-2">
        <span className="bg-lime-deep h-2.5 w-2.5 animate-[sync-dot_5s_ease-in-out_infinite] rounded-full" />
        <span className="bg-lime h-2.5 w-2.5 animate-[sync-dot_5s_ease-in-out_infinite_0.6s] rounded-full" />
      </span>

      {/* Wordmark - small, low contrast so the dots stay the focus. */}
      <span className="font-display text-ink/70 text-sm tracking-wide">Sync</span>

      {/* Hairline progress sweep - single lime stroke easing across a thin track. */}
      <span
        aria-hidden="true"
        className="bg-ink/5 relative h-px w-32 overflow-hidden"
      >
        <span className="bg-lime-deep absolute inset-y-0 left-0 w-1/3 animate-[sync-sweep_5s_ease-in-out_infinite]" />
      </span>

      {label && <span className="text-muted text-xs">{label}</span>}
      <span className="sr-only">Loading{label ? `: ${label}` : ''}</span>
    </div>
  );
}
