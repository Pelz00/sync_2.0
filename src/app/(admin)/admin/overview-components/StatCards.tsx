"use client";

import { useEffect, useRef, useState } from "react";
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

// Animated counter hook matching algorithmic fluid curve parameters
function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    startTime.current = null;
    function step(ts: number) {
      if (!startTime.current) startTime.current = ts;
      const progress = Math.min((ts - startTime.current) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, duration]);

  return count;
}

function StatCardItem({ stat, index }: { stat: StatCard; index: number }) {
  const [liveValue, setLiveValue] = useState(stat.value);
  const count = useCounter(liveValue);

  // Simulate transactional network live value adjustments over custom periodic intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveValue(prev => {
        const delta = Math.floor(Math.random() * 5) - 1;
        return Math.max(0, prev + delta);
      });
    }, 8000 + index * 1500);
    return () => clearInterval(interval);
  }, [index]);

  const isNegative = stat.change < 0;

  return (
    <div
      className="bg-panel rounded-xl border border-line/15 p-4 flex flex-col gap-3.5 group shadow-xs transition-all duration-200 select-none"
      style={{ animationDelay: `${index * 80}ms` }}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-content-muted mb-1">
            {stat.label}
          </p>
          <p className="font-display text-2xl font-bold text-content">
            {count.toLocaleString()}
          </p>
        </div>
        
        {/* Dynamic theme adaptive icon backdrop shell box layout config */}
        <div className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 shrink-0",
          stat.iconBg === "bg-blue-500" ? "bg-blue-400" : "bg-lime"
        )}>
          {ICONS[stat.icon]}
        </div>
      </div>

      {/* Core financial direction operational stream logic marker mapping status */}
      <div className={cn(
        "flex items-center gap-1 text-[10px] uppercase tracking-wide font-bold",
        isNegative ? "text-coral" : "text-lime"
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
      {stats.map((stat, i) => (
        <StatCardItem key={stat.key} stat={stat} index={i} />
      ))}
    </div>
  );
}