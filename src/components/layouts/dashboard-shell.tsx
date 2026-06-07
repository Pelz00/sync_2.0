/**
 * DashboardShell - the full-page shell for a role's dashboard (vendor, landlord,
 * admin). Renders the sticky desktop sidebar rail, the mobile top bar + drawer,
 * and the main content column. The profile block is fetched server-side here so
 * the sidebar shows the real signed-in user.
 *
 * Each role passes its own `navKey`; the nav config + per-role profile shaping
 * live in config/dashboard-nav and dashboard-profile. Authorization is enforced
 * by the proxy (middleware), not here.
 */
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardHeader } from './dashboard-header';
import { getDashboardProfile } from './dashboard-profile';
import type { DashboardNavKey } from '@/config/dashboard-nav';

interface DashboardShellProps {
  navKey: DashboardNavKey;
  children: React.ReactNode;
  /** Max width of the content+rail row. Admin runs wider than vendor. */
  maxWidth?: string;
}

export async function DashboardShell({
  navKey,
  children,
  maxWidth = 'max-w-full',
}: DashboardShellProps) {
  const profile = await getDashboardProfile(navKey);

  return (
    <div className="bg-surface text-content min-h-screen">
      <div className={`mx-auto flex ${maxWidth}`}>
        <aside className="border-line/10 bg-panel sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r p-4 md:block">
          <DashboardSidebar navKey={navKey} profile={profile} />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader navKey={navKey} profile={profile} />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
