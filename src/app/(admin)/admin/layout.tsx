/**
 * Layout for /admin/* - internal admin console (Raavon team only). The sidebar
 * nav lives in config/dashboard-nav under the `admin` key.
 *
 * Authorization (role=admin) is enforced by the proxy (middleware).
 */
import { DashboardShell } from '@/components/layouts/dashboard-shell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell navKey="admin">{children}</DashboardShell>;
}
