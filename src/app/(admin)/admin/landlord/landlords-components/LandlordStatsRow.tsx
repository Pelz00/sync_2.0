"use client";

import type { LandlordStats } from "./landlord.types";
import { cn } from "@/lib/utils";
import { Building2, CheckCircle2, Clock4, ShieldOff } from "lucide-react";

interface LandlordStatsRowProps {
  stats: LandlordStats;
}

export function LandlordStatsRow({ stats }: LandlordStatsRowProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      <StatCard
        label="Total Landlords"
        value={stats.total.toLocaleString()}
        icon={<Building2 size={16} className="text-content-muted/60" />}
        accent="text-content"
      />
      <StatCard
        label="Active"
        value={stats.active.toLocaleString()}
        icon={<CheckCircle2 size={16} className="text-green-600" />}
        accent="text-green-600"
      />
      <StatCard
        label="Pending"
        value={stats.pending.toLocaleString()}
        icon={<Clock4 size={16} className="text-orange-500" />}
        accent="text-orange-500"
      />
      <StatCard
        label="Suspended"
        value={stats.suspended.toLocaleString()}
        icon={<ShieldOff size={16} className="text-red-500" />}
        accent="text-red-500"
      />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent: string;
}

function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <div className={cn("bg-panel border rounded-xl px-5 py-4 shadow-xs transition-colors duration-300 select-none border-line/15")}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] uppercase tracking-widest font-semibold text-content-muted">{label}</p>
        {icon}
      </div>
      <p className={cn("font-display text-3xl font-bold", accent)}>{value}</p>
    </div>
  );
}