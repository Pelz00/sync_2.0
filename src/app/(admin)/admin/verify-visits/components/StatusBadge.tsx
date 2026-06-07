import type { VisitStatus } from "../data";

const STATUS_CONFIG: Record<VisitStatus, { label: string; dot: string; bg: string; text: string; border: string }> = {
  Scheduled: { label: "Scheduled", dot: "bg-blue-400", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "In Progress": { label: "In Progress", dot: "bg-amber-400", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Completed: { label: "Completed", dot: "bg-emerald-400", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Failed: { label: "Failed", dot: "bg-red-400", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

export function StatusBadge({ status }: { status: VisitStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
