/**
 * Layout for /me/* - the student dashboard. A standalone, full-screen shell
 * (sidebar + content) just like the vendor and admin dashboards - no storefront
 * header/dock. Lives outside the (app) route group so it doesn't inherit the
 * AppShell chrome. Nav lives in config/dashboard-nav under the `student` key.
 *
 * Authorization (role=student) is enforced by the proxy.
 */
import { DashboardShell } from '@/components/layouts/dashboard-shell';

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell navKey="student">{children}</DashboardShell>;
}
