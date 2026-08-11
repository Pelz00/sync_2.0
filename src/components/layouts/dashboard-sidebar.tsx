/**
 * DashboardSidebar - the shared, theme-aware sidebar used by every role's
 * dashboard. Structure mirrors the reference design: wordmark + role label,
 * a profile card (real signed-in user), grouped nav sections with optional
 * count pills + active highlight, and a Log out action pinned to the bottom.
 *
 * Presentation only - the nav config is selected by `navKey` (see
 * config/dashboard-nav) and the profile block is computed server-side by
 * getDashboardProfile, so no icon components cross the server→client boundary.
 *
 * Rendered both in the sticky desktop rail and inside the mobile drawer; pass
 * `onNavigate` from the drawer so tapping a link closes it.
 */
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE } from '@/config/site';
import { DASHBOARD_NAV, type DashboardNavKey } from '@/config/dashboard-nav';
import type { DashboardProfile } from './dashboard-profile';
import { toast } from '@/components/ui/toast';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { signOut } from '@/modules/auth/actions';

interface DashboardSidebarProps {
  navKey: DashboardNavKey;
  profile: DashboardProfile;
  onNavigate?: () => void;
}

export function DashboardSidebar({ navKey, profile, onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { brandLabel, sections, rootHref } = DASHBOARD_NAV[navKey];

  // Student + vendor dashboards live at a name-based root (e.g. /muiz-owolabi),
  // so rewrite each item's href from its static base (/me, /vendor) to the
  // handle. Other roles keep their static hrefs.
  const handle = navKey === 'student' || navKey === 'vendor' ? profile.handle : undefined;
  const toHref = (href: string) => (handle ? `/${handle}${href.slice(rootHref.length)}` : href);

  // Best match = the longest item href that the current path falls under, so the
  // overview row (e.g. /muiz-owolabi) stays inactive on /muiz-owolabi/orders.
  const activeHref = sections
    .flatMap((s) => s.items.map((i) => toHref(i.href)))
    .filter((href) => pathname === href || pathname.startsWith(href + '/'))
    .sort((a, b) => b.length - a.length)[0];

  async function handleSignOut() {
    onNavigate?.();
    const res = await signOut();
    if (!res.ok) {
      toast(res.error);
      return;
    }
    router.push('/');
    router.refresh();
  }

  return (
    <div className="flex h-full flex-col gap-5">
      {/* Wordmark + role, with the mode toggle pinned to the edge */}
      <div className="flex items-center  gap-2 px-2">
        <div className="flex items-baseline gap-2">
          <Link href="/" onClick={onNavigate} className="font-display text-card text-content">
            {SITE.name}
          </Link>
          <span className="eyebrow text-content-muted">{brandLabel}</span>
        </div>
        <ThemeToggle className="text-content shrink-0 mr-6" />
      </div>

      {/* Profile card */}
      <div className="border-line/10 bg-surface-deep/60 flex flex-col gap-3 rounded-2xl border p-4">
        <div className="flex items-center gap-3">
          <span className="bg-lime text-ink font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm">
            {profile.initial}
          </span>
          <div className="min-w-0">
            <p className="eyebrow text-accent-fg">{profile.eyebrow}</p>
            <p className="text-content truncate text-sm font-medium">{profile.name}</p>
          </div>
        </div>
        {profile.email && (
          <p className="text-content-muted -mt-1 truncate text-xs">{profile.email}</p>
        )}
        {profile.metaValue && (
          <div className="border-line/10 border-t pt-3">
            <p className="eyebrow text-content-muted">{profile.metaLabel}</p>
            <p className="text-content mt-0.5 truncate text-sm">{profile.metaValue}</p>
          </div>
        )}
      </div>

      {/* Grouped nav */}
      <nav aria-label={`${brandLabel} navigation`} className="flex flex-1 flex-col gap-5">
        {/* Back to the public home page (outside the dashboard). */}
        <Link
          href="/"
          onClick={onNavigate}
          className="text-content hover:bg-ink/5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
        >
          <Home className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1 truncate">Home</span>
        </Link>

        {sections.map((section, i) => (
          <div key={section.label ?? i} className="flex flex-col gap-1">
            {section.label && (
              <p className="eyebrow text-content-muted mb-1 px-3">{section.label}</p>
            )}
            {section.items.map(({ href, label, icon: Icon, badge }) => {
              const resolved = toHref(href);
              const active = resolved === activeHref;
              return (
                <Link
                  key={href}
                  href={resolved}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    active ? 'bg-ink text-cream' : 'text-content hover:bg-ink/5',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1 truncate">{label}</span>
                  {typeof badge === 'number' && badge > 0 && (
                    <span
                      className={cn(
                        'inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-medium',
                        active ? 'bg-cream/20 text-cream' : 'bg-ink/10 text-content-muted',
                      )}
                    >
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Log out */}
      <div className="border-line/10 border-t pt-3">
        <button
          type="button"
          onClick={handleSignOut}
          className="text-coral hover:bg-coral/10 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  );
}
