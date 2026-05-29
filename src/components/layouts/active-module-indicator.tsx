/**
 * ActiveModuleIndicator - shown in the marketing header on screens that also
 * render the ServicesDock (e.g. /around). Instead of repeating the full module
 * nav (which the dock already lists), the header collapses to just the module
 * you're currently on: a live pulsing lime dot + the module label, on the left.
 *
 * Client component - reads the pathname to resolve the active module. Renders
 * nothing if the route doesn't map to a known module.
 */
'use client';

import { usePathname } from 'next/navigation';
import { MODULES } from '@/config/modules';

export function ActiveModuleIndicator() {
  const pathname = usePathname();
  const active = MODULES.find(
    (m) => pathname === `/${m.slug}` || pathname?.startsWith(`/${m.slug}/`),
  );
  if (!active) return null;

  return (
    <span className="text-accent-fg inline-flex items-center gap-2 text-sm font-medium">
      {/* Live pulsing dot */}
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="bg-lime absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        <span className="bg-lime relative inline-flex h-2 w-2 rounded-full" />
      </span>
      {active.label}
    </span>
  );
}
