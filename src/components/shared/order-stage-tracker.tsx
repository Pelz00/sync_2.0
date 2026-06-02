/**
 * OrderStageTracker - horizontal milestone tracker for order lifecycles.
 * Used across modules (food delivery, laundry pickup, workmanship job).
 * Stages are domain-specific; this component is purely the visual rail.
 */
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OrderStage {
  id: string;
  label: string;
}

interface OrderStageTrackerProps {
  stages: OrderStage[];
  /** 0-based index of the current stage. Use `stages.length` for completed. */
  currentIndex: number;
  className?: string;
}

export function OrderStageTracker({ stages, currentIndex, className }: OrderStageTrackerProps) {
  return (
    <ol className={cn('flex items-stretch', className)} aria-label="Order progress">
      {stages.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={stage.id} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium transition-colors',
                done && 'bg-ink text-cream',
                active && 'bg-lime text-ink',
                !done && !active && 'bg-surface-deep text-content-muted',
              )}
              aria-current={active ? 'step' : undefined}
            >
              {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
            </div>
            <span
              className={cn(
                'text-xs',
                active ? 'text-content font-medium' : done ? 'text-content' : 'text-content-muted',
              )}
            >
              {stage.label}
            </span>
            {i < stages.length - 1 && (
              <div className={cn('mx-1 h-px flex-1', done ? 'bg-ink' : 'bg-ink/10')} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
