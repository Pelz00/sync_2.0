/**
 * MobileMenu - hamburger trigger + full-viewport (100vh) overlay menu for the
 * marketing header on small screens. Lists every module plus the auth/CTA
 * actions and a theme toggle. Built on Radix Dialog so we get focus trapping,
 * Escape-to-close, and body scroll lock for free.
 *
 * Visible only below `md`; the desktop header shows the inline split nav.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Info, LayoutDashboard, LogOut, Menu, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { toast } from '@/components/ui/toast';
import { MODULES } from '@/config/modules';
import { SITE } from '@/config/site';
import { signOut } from '@/modules/auth/actions';

export function MobileMenu({
  signedIn = false,
  name,
  email,
  role,
}: {
  signedIn?: boolean;
  name?: string;
  email?: string;
  role?: 'student' | 'vendor' | 'admin';
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const close = () => setOpen(false);
  const dashboardHref = role === 'vendor' ? '/vendor' : role === 'admin' ? '/admin' : '/me';

  async function handleSignOut() {
    close();
    const res = await signOut();
    if (!res.ok) {
      toast(res.error);
      return;
    }
    router.push('/');
    router.refresh();
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="text-foreground hover:bg-foreground/5 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className="bg-surface text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 z-50 flex h-screen w-screen flex-col md:hidden">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            Sync navigation, account actions, and theme toggle.
          </Dialog.Description>

          {/* Top bar - logo + theme toggle + close */}
          <div className="border-line/5 flex h-16 shrink-0 items-center justify-between border-b px-6">
            <Link href="/" onClick={close} className="flex items-center gap-2" aria-label="Sync home">
              <span aria-hidden="true" className="flex items-center gap-1">
                <span className="bg-foreground block h-2 w-2 rounded-full" />
                <span className="bg-accent-fg block h-1.5 w-1.5 rounded-full" />
              </span>
              <span className="font-display text-card text-foreground">{SITE.name}</span>
            </Link>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="text-foreground hover:bg-foreground/5 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* Nav links - large, tappable, every module */}
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="flex flex-col">
              {MODULES.map(({ slug, label, tagline, icon: Icon }) => (
                <li key={slug} className="border-line/5 border-b last:border-b-0">
                  <Link
                    href={`/${slug}`}
                    onClick={close}
                    className="hover:text-accent-fg flex items-center gap-4 py-4 transition-colors"
                  >
                    <Icon className="text-accent-fg h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="flex-1">
                      <span className="font-display text-card block leading-tight">{label}</span>
                      <span className="text-content-muted text-xs">{tagline}</span>
                    </span>
                    <ArrowRight className="text-content-muted h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Secondary marketing links (not service modules) */}
            <Link
              href="/about"
              onClick={close}
              className="hover:text-accent-fg font-display text-card mt-6 flex items-center gap-4 py-4 transition-colors"
            >
              <Info className="text-accent-fg h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="flex-1">About Sync</span>
              <ArrowRight className="text-content-muted h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>

          {/* Sticky auth/CTA footer */}
          <div className="border-line/5 bg-surface flex shrink-0 flex-col gap-2 border-t px-6 py-5">
            {signedIn ? (
              <>
                <div className="flex items-center gap-3 pb-1">
                  <span className="bg-lime text-ink font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm">
                    {(name ?? 'You').charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="text-foreground truncate text-sm font-medium">{name}</p>
                    <p className="text-content-muted truncate text-xs">{email}</p>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  onClick={close}
                  className="text-foreground border-foreground/20 hover:bg-foreground/10"
                >
                  <Link href={dashboardHref}>
                    {role === 'vendor' || role === 'admin' ? <LayoutDashboard /> : <User />}
                    {role === 'vendor' ? 'Dashboard' : role === 'admin' ? 'Admin' : 'Profile'}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSignOut}
                  className="text-coral border-coral/30 hover:bg-coral/10"
                >
                  <LogOut /> Sign out
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" onClick={close}>
                  <Link href="/signup?role=vendor&category=landlord">
                    List a property <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  onClick={close}
                  className="text-foreground border-foreground/20 hover:bg-foreground/10"
                >
                  <Link href="/login">Sign in / Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
