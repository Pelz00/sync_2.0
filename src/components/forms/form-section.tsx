/**
 * FormSection - visual grouping for related fields in long forms (vendor
 * onboarding, profile settings). Eyebrow + title + optional description,
 * with children laid out in a vertical stack.
 */
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({
  eyebrow,
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <section className={cn('flex flex-col gap-5', className)}>
      <header className="flex flex-col gap-1">
        {eyebrow && <p className="eyebrow text-accent-fg">{eyebrow}</p>}
        <h2 className="font-display text-card text-ink">{title}</h2>
        {description && <p className="text-muted text-sm">{description}</p>}
      </header>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
