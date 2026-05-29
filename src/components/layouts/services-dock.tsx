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

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check, ChevronDown, MapPin } from 'lucide-react';
import { MODULES } from '@/config/modules';
import { MALETE_AREAS } from '@/mock/around';
import { useOptionalLocation } from '@/app/around/location-context';
import { cn } from '@/lib/utils';

interface ServicesDockProps {
  /** Initially selected area shown in the right-hand chip. */
  location?: string;
}

export function ServicesDock({ location = MALETE_AREAS[0] }: ServicesDockProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Use the shared location (so picking an area moves the map) when a provider
  // is mounted; otherwise fall back to local state so the dock still works.
  const shared = useOptionalLocation();
  const [localArea, setLocalArea] = useState(location);
  const selected = shared ? shared.area : localArea;
  const setSelected = shared ? shared.setArea : setLocalArea;
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

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Change location"
            aria-haspopup="listbox"
            aria-expanded={open}
            className="border-line/15 hover:bg-ink/5 inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm"
          >
            <MapPin className="text-accent-fg h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium">{selected}</span>
            <ChevronDown
              className={cn(
                'text-content-muted h-3.5 w-3.5 transition-transform',
                open && 'rotate-180',
              )}
              aria-hidden="true"
            />
          </button>

          {open && (
            <>
              {/* Outside-click catcher */}
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 cursor-default"
              />
              <ul
                role="listbox"
                aria-label="Choose your area"
                className="border-line/10 bg-panel shadow-pop absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border py-1"
              >
                {MALETE_AREAS.map((area) => {
                  const isSelected = area === selected;
                  return (
                    <li key={area} role="option" aria-selected={isSelected}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(area);
                          setOpen(false);
                        }}
                        className={cn(
                          'flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors',
                          isSelected ? 'text-accent-fg font-medium' : 'text-foreground hover:bg-ink/5',
                        )}
                      >
                        {area}
                        {isSelected && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
