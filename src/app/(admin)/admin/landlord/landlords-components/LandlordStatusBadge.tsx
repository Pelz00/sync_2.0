import type { LandlordStatus } from "./landlord.types";

const STYLES: Record<LandlordStatus, string> = {
  Active: "bg-green-100 text-green-700 border border-green-200",
  Pending: "bg-orange-100 text-orange-600 border border-orange-200",
  Suspended: "bg-red-100 text-red-600 border border-red-200",
};

const DOT: Record<LandlordStatus, string> = {
  Active: "bg-green-500",
  Pending: "bg-orange-400",
  Suspended: "bg-red-500",
};

export function LandlordStatusBadge({ status }: { status: LandlordStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${STYLES[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT[status]}`} />
      {status}
    </span>
  );
}