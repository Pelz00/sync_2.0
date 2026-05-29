/**
 * BrandLoader - full-viewport loader on the dark (ink) brand surface.
 * Two dots orbit each other and trade the brand colours (lime ↔ lime-deep)
 * over a breathing lime glow, with an occasional glitch jitter. The "Sync"
 * wordmark types itself out with a blinking caret.
 *
 * Motion uses arbitrary `animate-[…]` utilities + keyframes in globals.css.
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
        'bg-ink text-cream flex flex-col items-center justify-center gap-9',
        inline ? 'h-full w-full py-16' : 'min-h-screen w-full',
        className,
      )}
    >
      {/* Orbiting, colour-swapping, glitching dots over a breathing glow. */}
      <span aria-hidden="true" className="block animate-[sync-glitch_2.6s_ease-in-out_infinite]">
        <span className="relative flex h-12 w-12 items-center justify-center">
          {/* breathing glow */}
          <span className="bg-lime absolute h-16 w-16 rounded-full blur-2xl animate-[sync-glow_1.6s_ease-in-out_infinite]" />
          {/* orbit */}
          <span className="relative block h-12 w-12 animate-[sync-orbit_1.1s_linear_infinite]">
            <span className="bg-lime-deep absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full animate-[sync-color-a_0.7s_linear_infinite]" />
            <span className="bg-lime absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full animate-[sync-color-b_0.7s_linear_infinite]" />
          </span>
        </span>
      </span>

      {/* Wordmark - types out with a blinking caret + glitch jitter. */}
      <span
        aria-hidden="true"
        className="inline-flex items-stretch animate-[sync-glitch_2.6s_ease-in-out_infinite]"
      >
        <span className="font-display grid text-[50px] font-bold leading-[1.1] tracking-tight">
          {/* invisible sizer - fixes the exact text width */}
          <span className="invisible col-start-1 row-start-1">Sync</span>
          {/* visible reveal - width animates 0 → 100% of the sizer */}
          <span className="text-cream col-start-1 row-start-1 w-0 overflow-hidden whitespace-nowrap animate-[sync-typing_0.9s_steps(4)_both]">
            Sync
          </span>
        </span>
      </span>

      {label && <span className="text-cream/60 text-sm">{label}</span>}
      <span className="sr-only">Loading{label ? `: ${label}` : ''}</span>
    </div>
  );
}
