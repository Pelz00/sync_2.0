/**
 * AuthLayout - split-pane shell for login / signup / verify.
 *
 * The dark brand panel carries the page's heading (`eyebrow` + `title`), so it
 * is dynamic per route - "Sign up to Sync", "Log in to Sync", etc. On desktop
 * it's the full-height left column; on mobile it collapses to a band on top of
 * the form. Each auth page passes its own copy and renders its form as
 * `children`; the form pane fills its width (inputs are full-width).
 */
import Link from 'next/link';
import { SITE } from '@/config/site';

export function AuthLayout({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    // Locked to the viewport height - the page never scrolls. If a form is
    // taller than the viewport, only the form pane scrolls (the brand panel
    // stays put).
    <div className="bg-cream text-ink flex h-dvh flex-col overflow-hidden md:grid md:grid-cols-2">
      {/* Brand + dynamic heading: top band on mobile, left column on desktop. */}
      <aside className="bg-ink text-cream flex shrink-0 flex-col gap-6 p-6 md:h-dvh md:justify-between md:gap-8 md:p-10">
        <Link href="/" className="font-display text-card w-fit">
          {SITE.name}
        </Link>
        <div>
          <p className="eyebrow text-lime">{eyebrow}</p>
          <h1 className="font-display mt-2 text-3xl leading-[1.05] tracking-tight md:text-section">
            {title}
          </h1>
          <p className="text-cream/70 mt-4 hidden max-w-md text-sm md:block">{SITE.description}</p>
        </div>
        <p className="text-cream/50 hidden text-xs md:block">
          © {new Date().getFullYear()} {SITE.legalName}
        </p>
      </aside>

      <main className="flex flex-1 items-center justify-center overflow-y-auto p-6 md:h-dvh md:p-10">
        <div className="w-full max-w-lg py-6">{children}</div>
      </main>
    </div>
  );
}
