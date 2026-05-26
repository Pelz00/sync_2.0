/**
 * EmptyState — gentle "nothing here yet" placeholder. Use whenever a list
 * query returns zero rows so the page never feels broken.
 */
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** A primary action — usually a button or link. */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon: Icon = Inbox, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'border-ink/10 bg-cream flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center',
        className,
      )}
    >
      <Icon className="text-muted h-8 w-8" aria-hidden="true" />
      <h3 className="font-display text-card text-ink mt-2">{title}</h3>
      {description && <p className="text-muted max-w-md text-sm">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
