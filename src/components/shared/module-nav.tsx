/**
 * ModuleNav - the persistent "services dock" on the authenticated student
 * shell. Renders all 8 modules + the around-you hub from the module registry.
 * Highlights the current module based on the active pathname.
 *
 * On wide screens this renders as a sidebar; on tablet as a horizontal scroller.
 * The mobile bottom nav is a separate component (MobileBottomNav).
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MODULES } from '@/config/modules';
import { cn } from '@/lib/utils';

interface ModuleNavProps {
  /** Layout direction. Sidebar = vertical; rail = horizontal scroller. */
  variant?: 'sidebar' | 'rail';
  className?: string;
}

export function ModuleNav({ variant = 'sidebar', className }: ModuleNavProps) {
  const pathname = usePathname();
  const isSidebar = variant === 'sidebar';

  return (
    <nav
      aria-label="Sync modules"
      className={cn(
        isSidebar
          ? 'flex flex-col gap-1'
          : 'flex gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {MODULES.map(({ slug, label, icon: Icon }) => {
        const href = `/${slug}`;
        const active = pathname === href || pathname?.startsWith(`${href}/`);
        return (
          <Link
            key={slug}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              isSidebar ? 'w-full' : 'shrink-0',
              active ? 'bg-ink text-cream' : 'text-ink hover:bg-ink/5',
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className={cn(isSidebar ? 'truncate' : 'whitespace-nowrap')}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
