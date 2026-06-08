import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  subtextPositive?: boolean;
  icon: React.ReactNode;
  iconBg: string;
}

export function StatCard({ label, value, subtext, subtextPositive, icon, iconBg }: StatCardProps) {
  return (
    <div className="bg-panel shadow-card rounded-xl border border-line/10 p-5 flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-content-muted">{label}</span>
        <span className="font-display text-2xl font-semibold text-content">{value}</span>
        <span className={`flex items-center gap-1 text-xs ${subtextPositive ? 'text-emerald-600' : 'text-content-muted'}`}>
          {subtextPositive && <ArrowUpRight className="h-3 w-3" />}
          {subtext}
        </span>
      </div>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </div>
    </div>
  );
}
