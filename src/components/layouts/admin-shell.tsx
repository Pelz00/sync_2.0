/**
 * AdminShell - sidebar shell for the (admin) route group. Same structure as
 * VendorShell but distinct so the two can diverge without conditional logic.
 */
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE } from '@/config/site';

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface AdminShellProps {
  items: AdminNavItem[];
  activeHref?: string;
  children: React.ReactNode;
}

export function AdminShell({ items, activeHref, children }: AdminShellProps) {
  return (
    <div className="bg-surface text-content min-h-screen">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="border-line/10 sticky top-0 hidden h-screen w-60 shrink-0 border-r bg-panel p-4 md:flex md:flex-col">
          <Link href="/" className="font-display text-card text-content px-2 py-3">
            {SITE.name}
          </Link>
          <p className="eyebrow text-content-muted mt-4 px-2">Admin</p>
          <nav aria-label="Admin" className="mt-2 flex flex-col gap-1">
            {items.map(({ href, label, icon: Icon }) => {
              const active = activeHref ? activeHref === href : false;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    active ? 'bg-ink text-cream' : 'text-content hover:bg-ink/5',
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
