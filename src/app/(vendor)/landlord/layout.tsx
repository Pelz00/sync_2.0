/**
 * Layout for /landlord - landlord-specific dashboard. Distinct from /vendor
 * because landlords run a fundamentally different flow (long-term tenancy with
 * caution fees) and need their own navigation. Its sidebar nav lives in
 * config/dashboard-nav under the `landlord` key.
 *
 * Authorization (role=vendor, category=landlord) is enforced by the proxy.
 */
import { DashboardShell } from '@/components/layouts/dashboard-shell';

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell navKey="landlord">{children}</DashboardShell>;
}
