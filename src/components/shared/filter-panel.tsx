/**
 * FilterPanel - generic filter shell used by every browse page (hostels, food,
 * events, beauty…). The panel itself is purely presentational; each module
 * composes its own filter inputs inside.
 *
 * On mobile, wrap this in a `<Sheet>` so it opens as a drawer. The "Apply"
 * button typically submits a form whose values are encoded into the URL.
 */
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  title?: string;
  children: ReactNode;
  /** Footer actions - e.g. <Button>Apply</Button>. */
  actions?: ReactNode;
  className?: string;
}

export function FilterPanel({ title = 'Filters', children, actions, className }: FilterPanelProps) {
  return (
    <aside
      className={cn(
        'bg-panel shadow-card flex flex-col gap-5 rounded-xl p-5',
        className,
      )}
    >
      <p className="eyebrow text-accent-fg">{title}</p>
      <div className="flex flex-col gap-5">{children}</div>
      {actions && <div className="border-line/5 mt-2 flex items-center gap-2 border-t pt-4">{actions}</div>}
    </aside>
  );
}

export function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-foreground text-sm font-medium">{label}</legend>
      {children}
    </fieldset>
  );
}
