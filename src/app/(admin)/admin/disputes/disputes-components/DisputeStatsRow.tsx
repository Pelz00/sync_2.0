import type { DisputeStats } from "./dispute.types";

interface DisputeStatsRowProps {
  stats: DisputeStats;
}

/**
 * DisputeStatsRow
 * Five summary cards: Total / Open / In Progress / Escalated / Resolved
 */
export function DisputeStatsRow({ stats }: DisputeStatsRowProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <StatCard label="Total Disputes" value={stats.total}      color="text-gray-900" />
      <StatCard label="Open"           value={stats.open}       color="text-red-500"  />
      <StatCard label="In Progress"    value={stats.inProgress} color="text-blue-600" />
      <StatCard label="Escalated"      value={stats.escalated}  color="text-orange-500" />
      <StatCard label="Resolved"       value={stats.resolved}   color="text-green-600" />
    </div>
  );
}

function StatCard({
  label, value, color,
}: { label: string; value: number; color: string }) {
  return (
    <div className="bg-panel border border-line/10 rounded-2xl px-5 py-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-content-muted mb-2">{label}</p>
      <p className={`font-display text-3xl font-bold text-content ${color}`}>{value}</p>
    </div>
  );
}
