import type { VisitStatus } from "../data";

const STATUS_CONFIG: Record<
  VisitStatus, 
  { label: string; dot: string; bg: string; text: string; border: string; }
> = {
  Scheduled: { label: "Scheduled", dot: "bg-blue-400", bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
  "In Progress": { label: "In Progress", dot: "bg-amber-400", bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200" },
  Completed: { label: "Completed", dot: "bg-emerald-400", bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
  Failed: { label: "Failed", dot: "bg-red-400", bg: "bg-red-100", text: "text-red-600", border: "border-red-200" },
};

export function StatusBadge({ status }: { status: VisitStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-2 py-0.5 border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
      {c.label}
    </span>
  );
}

