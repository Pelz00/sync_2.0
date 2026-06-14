"use client";

import { useState } from "react";
import { AnalyticsStatCards }  from "./components/AnalyticsStatCards";
import { RevenueTrendChart }   from "./components/RevenueTrendChart";
import { CategoryPieChart }    from "./components/CategoryPieChart";
import { ActivityByHourChart } from "./components/ActivityByHourChart";
import { TopVendorsChart }     from "./components/TopVendorsChart";
import { TopProductsList }     from "./components/TopProductsList";
import { TimeRangeSelector }   from "./components/TimeRangeSelector";
import {
  STAT_CARDS, CATEGORY_DATA, HOUR_DATA, VENDOR_DATA, TOP_PRODUCTS,
  getTrendData, type TimeRange,
} from "./data";

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<TimeRange>("Last 30 days");
  const trendData = getTrendData(range);

  return (
    <section className="flex flex-col gap-5 select-none">
      
      {/* ── Context Header Cluster ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div>
          <p className="eyebrow text-content-muted tracking-widest text-[10px] font-bold mb-1">
            ADMIN
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-content tracking-tight leading-tight">
            Analytics
          </h1>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Comprehensive platform insights and transactional operational data analysis.
          </p>
        </div>
        
        {/* Filter Trigger Dropdown Wrapper */}
        <div className="shrink-0 self-start sm:self-center">
          <TimeRangeSelector value={range} onChange={setRange} />
        </div>
      </div>

      {/* ── KPI Numerical Summary Cards Panel ── */}
      <div className="w-full">
        <AnalyticsStatCards stats={STAT_CARDS} />
      </div>

      {/* ── Trend Grid Matrix Section (Full Width) ── */}
      <div className="w-full bg-panel border border-line/15 rounded-xl p-5 shadow-xs overflow-hidden">
        <h2 className="text-[10px] uppercase tracking-widest font-bold text-content-muted/60 mb-4">
          Financial & Revenue Streams
        </h2>
        <RevenueTrendChart data={trendData} />
      </div>

      {/* ── Secondary Behavioral Metrics Grid (Dual-Column layout) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Category Share Card */}
        <div className="bg-panel border border-line/15 rounded-xl p-5 shadow-xs overflow-hidden flex flex-col justify-between">
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-content-muted/60 mb-4">
            Category Breakdown
          </h2>
          <CategoryPieChart data={CATEGORY_DATA} />
        </div>
        
        {/* Hourly Flow Chart Card */}
        <div className="bg-panel border border-line/15 rounded-xl p-5 shadow-xs overflow-hidden flex flex-col justify-between">
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-content-muted/60 mb-4">
            Activity Distribution by Hour
          </h2>
          <ActivityByHourChart data={HOUR_DATA} />
        </div>

      </div>

      {/* ── Performers & Product Listing Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Merchant Performance Block */}
        <div className="bg-panel border border-line/15 rounded-xl p-5 shadow-xs overflow-hidden flex flex-col justify-between">
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-content-muted/60 mb-4">
            Top Performing Vendors
          </h2>
          <TopVendorsChart data={VENDOR_DATA} />
        </div>
        
        {/* Product Sales Leaderboard */}
        <div className="bg-panel border border-line/15 rounded-xl p-5 shadow-xs overflow-hidden flex flex-col justify-between">
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-content-muted/60 mb-4">
            Highest Volume Inventory
          </h2>
          <TopProductsList products={TOP_PRODUCTS} />
        </div>

      </div>

    </section>
  );
}