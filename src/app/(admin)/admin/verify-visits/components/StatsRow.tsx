import type { VisitStats } from "../data";

interface StatsRowProps {
  stats: VisitStats;
}

const CARDS = [
  { key: "total", label: "Total Visits", color: "text-gray-800", accent: "bg-gray-100" },
  { key: "scheduled", label: "Scheduled", color: "text-blue-600", accent: "bg-blue-50" },
  { key: "completed", label: "Completed", color: "text-emerald-600", accent: "bg-emerald-50" },
  { key: "failed", label: "Failed", color: "text-red-500", accent: "bg-red-50" },
] as const;

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {CARDS.map(({ key, label, color, accent }) => (
        <div key={key}
          className={`${accent} rounded-2xl px-5 py-4 border border-white/60 shadow-sm flex flex-col gap-1`}>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
          <p className={`text-3xl font-black ${color} leading-none`}>{stats[key]}</p>
        </div>
      ))}
    </div>
  );
}
