import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card'; // adjust path to your Card file

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
    <Card>
      <CardContent className="flex items-start justify-between gap-4 pt-5">
        <div className="flex flex-col gap-1.5">
          <span className="text-content-muted font-mono text-[10px] tracking-widest uppercase">
            {label}
          </span>
          <span className="font-display text-content text-2xl font-semibold">{value}</span>
          <span
            className={`flex items-center gap-1 text-xs ${subtextPositive ? 'text-emerald-600' : 'text-content-muted'}`}
          >
            {subtextPositive && <ArrowUpRight className="h-3 w-3" />}
            {subtext}
          </span>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
