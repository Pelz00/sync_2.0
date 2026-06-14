import type { VendorStatus } from "./vendor.types";

const STYLES: Record<VendorStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-600",
  Suspended: "bg-red-100 text-red-600",
};

export function VendorStatusBadge({ status }: { status: VendorStatus }) {
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full ${STYLES[status]}`}>
      {status}
    </span>
  );
}
