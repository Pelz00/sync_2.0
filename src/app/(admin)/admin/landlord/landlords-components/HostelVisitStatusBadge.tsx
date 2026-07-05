import type { HostelVisitStatus } from "./landlord.types";
import { VISIT_STATUS_COLORS } from "./landlord.constants";

const DOT: Record<HostelVisitStatus, string> = {
  "Not Visited": "bg-gray-400",
  "Visit Scheduled": "bg-blue-500",
  "Under Review": "bg-orange-400",
  "Verified": "bg-green-500",
  "Rejected": "bg-red-500",
};

export function HostelVisitStatusBadge({ status }: { status: HostelVisitStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${VISIT_STATUS_COLORS[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT[status]}`} />
      {status}
    </span>
  );
}
