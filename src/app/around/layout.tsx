/**
 * Layout for /around - the public "home of the full Sync app" per the
 * wireframe annotation. Marketing header + persistent services dock +
 * slim footer (NOT the full marketing footer).
 *
 * Sits OUTSIDE the (app) auth group on purpose: signed-out users land here.
 * Auth-only personalisation will get layered in later (avatar replaces the
 * Sign in / List a property buttons).
 */
import Link from 'next/link';
import { MarketingHeader } from '@/components/layouts/marketing-header';
import { ServicesDock } from '@/components/layouts/services-dock';
import { LocationProvider } from './location-context';

export default function AroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocationProvider>
      <div className="bg-surface text-foreground flex min-h-screen flex-col">
        <MarketingHeader dockMode />
        <ServicesDock />
        <div className="flex-1">{children}</div>
        <footer className="border-line/5 mt-12 border-t">
          <div className="text-content-muted mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs">
            <span>© {new Date().getFullYear()} Sync</span>
            <Link href="/" className="hover:text-foreground transition-colors">
              Around you · feed
            </Link>
          </div>
        </footer>
      </div>
    </LocationProvider>
  );
}
