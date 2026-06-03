/**
 * Layout for /vendor/* (generic vendor dashboard - food, beauty, trades,
 * laundry, events). The landlord variant has its own layout at
 * /landlord/layout.tsx so the two can diverge cleanly. The sidebar nav itself
 * lives in config/dashboard-nav under the `vendor` key.
 *
 * Authorization (role=vendor) is enforced by the proxy (middleware).
 */
import { DashboardShell } from '@/components/layouts/dashboard-shell';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell navKey="vendor">{children}</DashboardShell>;
}
