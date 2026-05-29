/**
 * MobileBottomNav - fixed bottom nav for the authenticated student app on
 * small screens. Five slots: Home / Browse / Saved / Inbox / Me. Hidden on
 * md+ (where the ServicesDock takes over).
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Grid3x3, Heart, Inbox, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const ITEMS = [
  { href: '/around', label: 'Home', icon: Compass },
  { href: '/search', label: 'Browse', icon: Grid3x3 },
  { href: '/me/saved', label: 'Saved', icon: Heart },
  { href: '/me/messages', label: 'Inbox', icon: Inbox },
  { href: '/me', label: 'Me', icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="bg-white border-ink/10 fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-5 border-t md:hidden"
    >
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname?.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex flex-col items-center justify-center gap-1 text-[11px] transition-colors',
              active ? 'text-ink' : 'text-muted hover:text-ink',
            )}
          >
            <Icon className={cn('h-5 w-5', active && 'text-lime-deep')} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
