import type { DisputeStatus, DisputePriority } from "./dispute.types";

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<DisputeStatus, string> = {
  "Open": "bg-red-50 text-red-600 border border-red-200",
  "In Progress": "bg-blue-50 text-blue-600 border border-blue-200",
  "Escalated": "bg-orange-50 text-orange-600 border border-orange-200",
  "Resolved": "bg-green-50 text-green-700 border border-green-200",
};

const STATUS_ICONS: Record<DisputeStatus, string> = {
  "Open": "⊙",
  "In Progress": "◷",
  "Escalated": "⚠",
  "Resolved": "✓",
};

export function DisputeStatusBadge({ status }: { status: DisputeStatus }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[status]}`}>
      <span className="text-[10px]">{STATUS_ICONS[status]}</span>
      {status}
    </span>
  );
}

// ─── Priority Badge ───────────────────────────────────────────────────────────

const PRIORITY_STYLES: Record<DisputePriority, string> = {
  High: "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-orange-50 text-orange-500 border border-orange-200",
  Low: "bg-gray-100 text-gray-500 border border-gray-200",
};

export function DisputePriorityBadge({ priority }: { priority: DisputePriority }) {
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${PRIORITY_STYLES[priority]}`}>
      {priority}
    </span>
  );
}
