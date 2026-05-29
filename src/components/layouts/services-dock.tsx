/**
 * ServicesDock - the persistent module rail that sits between the marketing
 * header and the page content on /around. Lists every Sync module with the
 * active one highlighted, plus a location selector on the right.
 *
 * The wireframe annotates this as the "services dock = persistent nav across
 * modules". On smaller screens it scrolls horizontally; the location chip
 * stays pinned on the right via flex.
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, MapPin } from 'lucide-react';
import { MODULES } from '@/config/modules';
import { cn } from '@/lib/utils';

interface ServicesDockProps {
  /** Location label shown in the right-hand chip. */
  location?: string;
}

export function ServicesDock({ location = 'Tanke, Ilorin' }: ServicesDockProps) {
  const pathname = usePathname();
  return (
    <div className="border-line/5 border-b">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3">
        <nav
          aria-label="Sync services"
          className="-mx-1 flex flex-1 items-center gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  'inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-3 text-sm transition-colors',
                  active
                    ? 'bg-lime text-ink font-medium'
                    : 'text-foreground hover:bg-ink/5 border border-transparent',
                  !active && 'border-line/15',
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="whitespace-nowrap">{label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="border-line/15 hover:bg-ink/5 inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm"
          aria-label="Change location"
        >
          <MapPin className="text-accent-fg h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-medium">{location}</span>
          <ChevronDown className="text-content-muted h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
