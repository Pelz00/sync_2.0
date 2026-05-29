/**
 * Layout for the (app) route group: authenticated student app.
 * Wraps everything in AppShell (topbar + horizontal ServicesDock + mobile bottom nav).
 *
 * Authorization is enforced by middleware.ts (Phase 6/7) - by the time this
 * layout renders, we trust that the user is signed in as `student`.
 */
import { AppShell } from '@/components/layouts/app-shell';

export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
