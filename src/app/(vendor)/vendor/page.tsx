/**
 * ROUTE: /vendor
 * ACCESS: authenticated vendor
 * PURPOSE: Vendor dashboard overview — KPIs, latest orders, revenue, products.
 *
 * The whole overview shares ONE design via <RoleDashboard variant="vendor">.
 * This page only supplies vendor *data* (KPIs, pending orders, chart) and the
 * vendor-specific lower sections (best-selling + earnings, products).
 */
import type { Metadata } from 'next';
import type { PendingRequestItem } from '@/components/dashboard/pending-request-card';
import { RoleDashboard } from '@/components/dashboard/role-dashboard';
import {
  bookingRequests,
  earningsSummary,
  foodProducts,
  revenueWeekly,
  vendorStats,
} from '@/mock/vendor';
import EarningsChart from './(components)/EarningChart';
import EarningsSummaryCard from './(components)/EarningsSummaryCard';
import { ProductsCard } from './(components)/ProductsCard';

export const metadata: Metadata = { title: 'Vendor dashboard' };

const pending: PendingRequestItem[] = bookingRequests.map((r) => ({
  id: r.orderId,
  name: r.name,
  avatarUrl: r.avatarUrl,
  badge: r.orderId,
  subtitle: r.items,
  amount: r.total,
  tags: [r.deliveryType, `${r.timeAgo} ago`],
}));

export default function Page() {
  return (
    <RoleDashboard
      variant="vendor"
      count={8}
      kpis={vendorStats}
      pending={pending}
      chart={revenueWeekly}
    >
      <section className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-start lg:gap-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-content-muted mb-2 max-w-xl font-mono text-sm tracking-wide">
            BEST SELLING FOOD
          </h2>
          <EarningsChart />
        </div>
        <div className="border-line/10 shadow-card w-full rounded-xl border p-4 lg:w-auto lg:min-w-[280px]">
          <h2 className="text-content-muted mb-2 max-w-xl font-mono text-sm tracking-wide">
            MY EARNINGS
          </h2>
          <EarningsSummaryCard data={earningsSummary[0]} />
        </div>
      </section>
    </RoleDashboard>
  );
}
