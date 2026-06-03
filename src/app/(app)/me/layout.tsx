/**
 * Layout for /me/* - the student account area. Students browse the storefront
 * through the AppShell dock, but their account section gets its own sidebar
 * (every role has one) nested inside that shell. Its nav lives in
 * config/dashboard-nav under the `student` key.
 */
import { DashboardSidebar } from '@/components/layouts/dashboard-sidebar';
import { DashboardMobileBar } from '@/components/layouts/dashboard-mobile-bar';
import { getDashboardProfile } from '@/components/layouts/dashboard-profile';

export default async function MeLayout({ children }: { children: React.ReactNode }) {
  const profile = await getDashboardProfile('student');

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8">
      <DashboardMobileBar navKey="student" profile={profile} />
      <aside className="border-line/10 bg-panel sticky top-6 hidden h-[calc(100vh-6rem)] w-60 shrink-0 self-start overflow-y-auto rounded-2xl border p-4 md:block">
        <DashboardSidebar navKey="student" profile={profile} />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
