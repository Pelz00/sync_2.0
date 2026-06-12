"use client";

import { Store, Users, ClipboardCheck, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import type { StatCard } from "./data";
import { cn } from "@/lib/utils";

// Uniformly configured icon rendering architecture mapped to semantic tokens
const ICONS: Record<string, React.ReactNode> = {
  vendors: <Store size={16} className="text-ink" />,
  users: <Users size={16} className="text-ink" />,
  verifications: <ClipboardCheck size={16} className="text-ink" />,
  disputes: <AlertTriangle size={16} className="text-ink" />,
};

interface StatCardsProps {
  stats: StatCard[];
}

function StatCardItem({ stat }: { stat: StatCard }) {
  const isNegative = stat.change < 0;

  return (
    <div className="bg-panel rounded-xl border border-line/15 p-4 flex flex-col gap-3.5 group shadow-xs select-none">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-content-muted mb-1">
            {stat.label}
          </p>
          <p className="font-display text-2xl font-bold text-content">
            {stat.value.toLocaleString()}
          </p>
        </div>
        
        {/* Dynamic theme adaptive icon backdrop shell box layout config */}
        <div className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center shadow-xs shrink-0",
          stat.iconBg === "bg-blue-500" ? "bg-blue-400" : "bg-lime"
        )}>
          {ICONS[stat.icon]}
        </div>
      </div>

      {/* Core financial direction operational stream logic marker mapping status */}
      <div className={cn(
        "flex items-center gap-1 text-[10px] uppercase tracking-wide font-bold",
        isNegative ? "text-coral" : "text-green-500"
      )}>
        {isNegative ? (
          <TrendingDown size={12} className="shrink-0" />
        ) : (
          <TrendingUp size={12} className="shrink-0" />
        )}
        <span className="font-mono tracking-normal normal-case text-xs font-semibold">
          {isNegative ? "" : "+"}{stat.change}% <span className="text-content-muted/60 text-[11px] font-normal font-sans">vs last month</span>
        </span>
      </div>
    </div>
  );
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {stats.map((stat) => (
        <StatCardItem key={stat.key} stat={stat} />
      ))}
    </div>
  );
}