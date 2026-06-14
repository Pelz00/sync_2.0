import type { VisitStats } from "../data";
import { Card, CardTitle } from "@/components/ui";

interface StatsRowProps {
  stats: VisitStats;
}

const CARDS = [
  { key: "total", label: "Total Visits", color: "text-content" },
  { key: "scheduled", label: "Scheduled", color: "text-content-muted" },
  { key: "completed", label: "Completed", color: "text-accent-fg" },
  { key: "failed", label: "Failed", color: "text-coral" },
] as const;

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {CARDS.map(({ key, label, color }) => (
        <Card 
          key={key}
          className="px-5 pb-5 pt-5 flex flex-col gap-3" >
          <CardTitle className="text-[11px] font-semibold uppercase tracking-widest text-content-muted">
            {label}
          </CardTitle>
          <p className={`font-display text-3xl font-bold text-content ${color} `}>
            {stats[key]}
          </p>
        </Card>
      ))}
    </div>
  );
}