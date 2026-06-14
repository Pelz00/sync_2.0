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
import { bookingRequests, earningsSummary, foodProducts, revenueWeekly, vendorStats } from '@/mock/vendor';
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
      <section className="flex items-start gap-4 lg:gap-8">
        <div className="flex-1">
          <h2 className="text-content-muted mb-2 max-w-xl flex-1 font-mono text-sm tracking-wide">
            BEST SELLING FOOD
          </h2>
          <EarningsChart />
        </div>
        <div>
          <h2 className="text-content-muted mb-2 max-w-xl flex-1 font-mono text-sm tracking-wide">
            MY EARNINGS
          </h2>
          <EarningsSummaryCard data={earningsSummary[0]} />
        </div>
      </section>
      <section>
        <h2 className="text-content-muted mb-2 max-w-xl flex-1 font-mono text-sm tracking-wide">
          MY PRODUCTS
        </h2>
        <ProductsCard products={foodProducts} />
      </section>
    </RoleDashboard>
  );
}
