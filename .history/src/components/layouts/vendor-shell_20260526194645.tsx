/**
 * VendorShell — sidebar shell for the (vendor) route group. Covers both the
 * generic vendor dashboard and the landlord variant. Sidebar items are
 * passed in so we can swap them per role without forking the shell.
 */
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE } from '@/config/site';

export interface VendorNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface VendorShellProps {
  items: VendorNavItem[];
  activeHref?: string;
  children: React.ReactNode;
  /** Label shown above the nav, e.g. "Vendor" or "Landlord". */
  shellLabel?: string;
}

export function VendorShell({ items, activeHref, children, shellLabel = 'Vendor' }: VendorShellProps) {
  return (
    <div className="bg-cream text-ink min-h-screen">
      <div className="mx-auto flex max-w-7xl">
        <aside className="border-ink/10 sticky top-0 hidden h-screen w-60 shrink-0 border-r bg-white p-4 md:flex md:flex-col">
          <Link href="/" className="font-display text-card text-ink px-2 py-3">
            {SITE.name}
          </Link>
          <p className="eyebrow text-muted mt-4 px-2">{shellLabel}</p>
          <nav aria-label={shellLabel} className="mt-2 flex flex-col gap-1">
            {items.map(({ href, label, icon: Icon }) => {
              const active = activeHref ? activeHref === href : false;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    active ? 'bg-ink text-cream' : 'text-ink hover:bg-ink/5',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
