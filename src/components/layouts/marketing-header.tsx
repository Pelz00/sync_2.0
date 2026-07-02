/**
 * MarketingHeader - public top bar.
 *
 * Desktop (md+): 3-column grid - nav links split left & right around a
 * centered logo, with the auth/CTA cluster pinned to the far right.
 * Mobile (<md): logo on the left, hamburger (MobileMenu) on the right.
 *
 * Logo: two stacked dots (ink + lime-deep) + Sync wordmark.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MobileMenu } from './mobile-menu';
import { UserMenu } from './user-menu';
import { SearchBar } from '@/components/shared/search-bar';
import { getCurrentUser, getFirstName, getProfile } from '@/modules/auth/queries';
import { resolveHandle } from '@/lib/handle';
import { SITE } from '@/config/site';

// Module nav from the hi-fi guide, split around the centered logo. These are
// hidden in `dockMode` (e.g. /around) since the ServicesDock already lists them.
const LEFT_LINKS = [
  { href: '/around', label: 'Around you' },
  { href: '/hostels', label: 'Hostels' },
  { href: '/events', label: 'Events' },
  { href: '/food', label: 'Food' },
  { href: '/beauty', label: 'Beauty' },
];

const RIGHT_MODULE_LINKS = [
  { href: '/workmanship', label: 'Workmanship' },
  { href: '/hotspots', label: 'Hot spots' },
];

// Non-module links that stay in the header even in dockMode (not on the dock).
const EXTRA_LINKS = [{ href: '/about', label: 'About' }];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-foreground hover:text-accent-fg transition-colors">
      {label}
    </Link>
  );
}

interface MarketingHeaderProps {
  /**
   * When true (screens that also render the ServicesDock, e.g. /around), the
   * module nav is hidden to avoid duplicating the dock. The left side instead
   * shows just the active module (lime, with a live dot).
   */
  dockMode?: boolean;
}

export async function MarketingHeader({ dockMode = false }: MarketingHeaderProps) {
  const user = await getCurrentUser();
  const profile = await getProfile();
  const meta = user?.user_metadata ?? {};
  // Trusted role from the profiles table, falling back to metadata (e.g. before
  // the migration is run). See modules/auth/queries.ts.
  const role = (profile?.role ?? (meta.role as 'student' | 'vendor' | 'admin' | undefined)) as
    | 'student'
    | 'vendor'
    | 'admin'
    | undefined;
  const name =
    profile?.full_name ||
    (meta.full_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'You';
  const initial = (getFirstName(user) ?? name).charAt(0).toUpperCase();
  const category = profile?.vendor_category ?? (meta.vendor_category as string | undefined);
  // Name-based dashboard handle (matches the proxy's rewrite source).
  const handle =
    resolveHandle({
      role,
      full_name: meta.full_name as string | undefined,
      business_name: meta.business_name as string | undefined,
      email: user?.email,
    }) ?? undefined;

  const logo = (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Sync home">
      <span aria-hidden="true" className="flex items-center gap-1">
        <span className="bg-foreground block h-2 w-2 rounded-full" />
        <span className="bg-accent-fg block h-1.5 w-1.5 rounded-full" />
      </span>
      <span className="font-display text-card text-foreground">{SITE.name}</span>
    </Link>
  );

  const rightCluster = (
    <div className="flex items-center justify-end gap-6">
      <nav aria-label="Primary right" className="hidden items-center gap-5 text-sm md:flex">
        {!dockMode && RIGHT_MODULE_LINKS.map((l) => <NavLink key={l.href} {...l} />)}
        {EXTRA_LINKS.map((l) => (
          <NavLink key={l.href} {...l} />
        ))}
      </nav>
      <ThemeToggle className="hidden md:inline-flex" />
      {user ? (
        <UserMenu
          name={name}
          email={user.email ?? ''}
          initial={initial}
          role={role}
          category={category}
          handle={handle}
        />
      ) : (
        <div className="hidden items-center gap-2 md:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-foreground hover:bg-foreground/10"
          >
            <Link href="/login">Sign in / Sign up</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup?role=vendor&category=landlord">
              List a property <ArrowRight />
            </Link>
          </Button>
        </div>
      )}
      {/* Hamburger - mobile only, far right */}
      <MobileMenu signedIn={!!user} name={name} email={user?.email ?? ''} role={role} handle={handle} />
    </div>
  );

  return (
    <header className="bg-surface/90 border-line/5 sticky top-0 z-40 border-b backdrop-blur">
      {dockMode ? (
        // App pages: logo · general search · cluster. The ServicesDock already
        // shows the active module, so the header carries the search instead.
        <div className="mx-auto flex h-16 items-center gap-3 px-6 md:gap-5">
          {logo}
          <div className="flex-1">
            <SearchBar className="mx-auto w-full max-w-lg" />
          </div>
          {rightCluster}
        </div>
      ) : (
        <div className="mx-auto flex h-16 items-center justify-between gap-4 px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* Left nav - desktop only */}
          <nav
            aria-label="Primary left"
            className="hidden items-center gap-5 text-sm md:flex md:justify-start"
          >
            {LEFT_LINKS.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
          </nav>
          {/* Logo - centered on desktop */}
          <div className="md:justify-self-center">{logo}</div>
          {rightCluster}
        </div>
      )}
    </header>
  );
}
