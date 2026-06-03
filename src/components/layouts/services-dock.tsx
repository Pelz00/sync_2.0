/**
 * ServicesDock - the persistent module nav across Sync.
 *
 * Desktop (md+): a horizontal pill rail between the header and content, with a
 * location chip on the right.
 * Mobile (<md): a native-app-style fixed bottom tab bar (Home / Browse / role
 * tabs). "Browse" opens a bottom sheet with every module in a grid + the area
 * picker. Account tabs adapt to the signed-in role. Replaces MobileBottomNav.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import {
  Check,
  ChevronDown,
  ClipboardList,
  Compass,
  Heart,
  LayoutDashboard,
  LayoutGrid,
  LogIn,
  MapPin,
  MessageCircle,
  User,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MODULES } from '@/config/modules';
import { MALETE_AREAS } from '@/mock/around';
import { useOptionalLocation } from '@/app/around/location-context';
import { cn } from '@/lib/utils';

type Role = 'student' | 'vendor' | 'admin';

interface ServicesDockProps {
  location?: string;
  /** Signed-in role - drives the mobile bottom-bar account tabs. */
  role?: Role;
}

export function ServicesDock({ location = MALETE_AREAS[0], role }: ServicesDockProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const shared = useOptionalLocation();
  const [localArea, setLocalArea] = useState(location);
  const selected = shared ? shared.area : localArea;
  const setSelected = shared ? shared.setArea : setLocalArea;

  const isActive = (slug: string) => pathname === `/${slug}` || pathname?.startsWith(`/${slug}/`);
  const onModule = MODULES.some((m) => m.slug !== 'around' && isActive(m.slug));

  // Account tabs adapt to role (the only access difference between users).
  const accountTabs: { href: string; label: string; icon: LucideIcon; badge?: number }[] =
    role === 'vendor'
      ? [
          { href: '/vendor/orders', label: 'Orders', icon: ClipboardList },
          { href: '/vendor/inbox', label: 'Inbox', icon: MessageCircle, badge: 2 },
          { href: '/vendor', label: 'You', icon: LayoutDashboard },
        ]
      : role === 'admin'
        ? [{ href: '/admin', label: 'Admin', icon: LayoutDashboard }]
        : role === 'student'
          ? [
              { href: '/me/saved', label: 'Saved', icon: Heart },
              { href: '/me/messages', label: 'Chats', icon: MessageCircle, badge: 3 },
              { href: '/me', label: 'You', icon: User },
            ]
          : [{ href: '/login', label: 'Sign in', icon: LogIn }];

  const tabCount = 2 + accountTabs.length;

  return (
    <>
      {/* ── Desktop rail (md+) ─────────────────────────────────────── */}
      <div className="border-line/5 hidden border-b md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3">
          <nav
            aria-label="Sync services"
            className="-mx-1 flex flex-1 items-center gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MODULES.map(({ slug, label, icon: Icon }) => {
              const active = isActive(slug);
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-3 text-sm transition-colors',
                    active
                      ? 'bg-lime text-ink font-medium'
                      : 'text-foreground hover:bg-ink/5 border-line/15 border',
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
                className={cn('text-content-muted h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
                aria-hidden="true"
              />
            </button>

            {open && (
              <>
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

      {/* ── Mobile bottom tab bar + module sheet (<md) ─────────────── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <nav
          aria-label="Primary"
          className="bg-panel border-line/10 fixed inset-x-0 bottom-0 z-40 grid h-16 border-t md:hidden"
          style={{ gridTemplateColumns: `repeat(${tabCount}, minmax(0, 1fr))` }}
        >
          <TabLink href="/around" label="Home" icon={Compass} active={pathname === '/around'} />

          <SheetTrigger asChild>
            <button type="button" className={tabClass(onModule)}>
              <TabIcon icon={LayoutGrid} active={onModule} />
              <span>Browse</span>
            </button>
          </SheetTrigger>

          {accountTabs.map((t) => (
            <TabLink
              key={t.href}
              href={t.href}
              label={t.label}
              icon={t.icon}
              badge={t.badge}
              active={isActive(t.href.replace(/^\//, ''))}
            />
          ))}
        </nav>

        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="font-display text-content text-lg">Browse Sync</SheetTitle>
          </SheetHeader>

          <div className="grid grid-cols-3 gap-3 px-4">
            {MODULES.map(({ slug, label, icon: Icon }) => {
              const active = isActive(slug);
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  onClick={() => setSheetOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-2xl border p-4 text-center text-sm transition-colors',
                    active
                      ? 'bg-lime text-ink border-transparent font-medium'
                      : 'border-line/10 text-content hover:bg-ink/5',
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="leading-tight">{label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-5 px-4 pb-2">
            <p className="text-content-muted mb-2 font-mono text-[11px] tracking-wider uppercase">Your area</p>
            <div className="flex flex-wrap gap-2">
              {MALETE_AREAS.map((area) => {
                const isSelected = area === selected;
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setSelected(area)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors',
                      isSelected
                        ? 'bg-lime text-ink border-transparent font-medium'
                        : 'border-line/15 text-content hover:bg-ink/5',
                    )}
                  >
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {area}
                  </button>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function tabClass(active: boolean) {
  return cn(
    'flex flex-col items-center justify-center gap-1 text-[11px] transition-colors',
    active ? 'text-content' : 'text-content-muted hover:text-content',
  );
}

function TabIcon({ icon: Icon, active, badge }: { icon: LucideIcon; active: boolean; badge?: number }) {
  return (
    <span className="relative">
      <Icon className={cn('h-5 w-5', active && 'text-lime-deep')} aria-hidden="true" />
      {badge ? (
        <span className="bg-lime text-ink absolute -top-1.5 -right-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold">
          {badge > 99 ? '99+' : badge}
        </span>
      ) : null}
    </span>
  );
}

function TabLink({
  href,
  label,
  icon,
  active,
  badge,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link href={href} aria-current={active ? 'page' : undefined} className={tabClass(active)}>
      <TabIcon icon={icon} active={active} badge={badge} />
      <span>{label}</span>
    </Link>
  );
}
