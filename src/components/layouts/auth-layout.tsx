/**
 * AuthLayout - split-pane shell for login / signup / verify. Brand panel on
 * the left (md+), form on the right. Single column on mobile.
 */
import Link from 'next/link';
import { SITE } from '@/config/site';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream text-ink min-h-screen md:grid md:grid-cols-2">
      <aside className="bg-ink text-cream hidden flex-col justify-between p-10 md:flex">
        <Link href="/" className="font-display text-card">
          {SITE.name}
        </Link>
        <div>
          <p className="font-display text-hero leading-none">{SITE.tagline}</p>
          <p className="text-cream/70 mt-4 max-w-md text-sm">{SITE.description}</p>
        </div>
        <p className="text-cream/50 text-xs">
          © {new Date().getFullYear()} {SITE.legalName}
        </p>
      </aside>
      <main className="flex min-h-screen items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
