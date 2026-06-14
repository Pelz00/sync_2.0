"use client";

import type { VendorStats } from "./vendor.types";
import { cn } from "@/lib/utils";

interface VendorStatsRowProps {
  stats: VendorStats;
}

export function VendorStatsRow({ stats }: VendorStatsRowProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      <StatCard label="Total Vendors" value={stats.total.toLocaleString()} valueColor="text-content" />
      <StatCard label="Active" value={stats.active.toLocaleString()} valueColor="text-lime" />
      <StatCard label="Pending" value={stats.pending.toLocaleString()} valueColor="text-orange-400" />
      <StatCard label="Suspended" value={stats.suspended.toLocaleString()} valueColor="text-coral" />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  valueColor: string;
}

function StatCard({ label, value, valueColor }: StatCardProps) {
  return (
    <div className="bg-panel border border-line/15 rounded-xl px-5 py-4 shadow-xs transition-colors duration-300 select-none">
      <p className="text-[11px] uppercase tracking-widest font-semibold text-content-muted mb-3">
        {label}
      </p>
      <p className={cn("font-display text-3xl font-bold text-content", valueColor)}>
        {value}
      </p>
    </div>
  );
}


