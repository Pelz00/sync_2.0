"use client";

import { StatCards }        from "./overview-components/StatCards";
import { RevenueChart }     from "./overview-components/RevenueChart";
import { GrowthChart }      from "./overview-components/GrowthChart";
import { RecentActivities } from "./overview-components/RecentActivities";
import { VendorStatus }     from "./overview-components/VendorStatus";
import {
  STAT_CARDS, REVENUE_DATA, GROWTH_DATA, ACTIVITIES, VENDOR_STATUS,
} from "./overview-components/data";

export default function AdminOverviewPage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div >

        {/* ── Page Header Dashboard Meta Info cluster ── */}
        <div className="mb-7 select-none">
          <p className="eyebrow text-content-muted uppercase">
            Admin
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-content tracking-tight leading-tight">
            Admin overview
          </h1>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>

        {/* ── High Level Numerical Stat Cards Block ── */}
        <StatCards stats={STAT_CARDS} />

        {/* ── Primary Analytical Visual Charts Matrix Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <RevenueChart data={REVENUE_DATA} />
          <GrowthChart  data={GROWTH_DATA}  />
        </div>

        {/* ── Secondary Information Feed: real-time operational streams ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          <RecentActivities initial={ACTIVITIES} />
          <VendorStatus     data={VENDOR_STATUS}  />
        </div>

      </div>
    </div>
  );
}