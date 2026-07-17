"use client";

import { useRouter } from "next/navigation";
import { Home, ArrowRight } from "lucide-react";
import type { Landlord } from "../../landlords-components/landlord.types";
import { formatPrice } from "../../landlords-components/landlord.constants";
import { HostelVisitStatusBadge } from "../../landlords-components/HostelVisitStatusBadge";

interface HostelGridProps {
  landlord: Landlord;
}

export function HostelGrid({ landlord }: HostelGridProps) {
  const router = useRouter();
  const hostels = landlord.hostels ?? [];

  if (hostels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-surface-deep/40 border border-line/15 rounded-xl">
        <Home size={20} className="text-content-muted/30 mb-2" />
        <p className="text-content-muted/80 font-medium text-xs uppercase tracking-widest">No hostels listed yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {hostels.map(hostel => (
        <div
          key={hostel.id}
          onClick={() => router.push(`/admin/landlord/${landlord.slug}/hostels/${hostel.slug}`)}
          className="bg-panel border border-line/15 rounded-2xl p-4 cursor-pointer hover:shadow-md hover:border-line/30 transition-all duration-200 flex flex-col gap-3 group">
          <div className="flex items-start justify-between gap-2">
            <span className="p-2 rounded-lg bg-surface-deep text-content-muted/70 group-hover:text-content transition-colors shrink-0">
              <Home size={14} />
            </span>
            <HostelVisitStatusBadge status={hostel.visitStatus} />
          </div>
          <div>
            <p className="text-sm font-bold text-content leading-snug group-hover:text-green-700 transition-colors">{hostel.name}</p>
            {hostel.rooms !== undefined && (
              <p className="text-[11px] text-content-muted/60 mt-0.5">{hostel.rooms} rooms available</p>
            )}
          </div>
          <div className="flex items-center justify-between pt-2.5 border-t border-line/10 mt-auto">
            <span className="text-sm font-mono font-bold text-content">{formatPrice(hostel.price)}</span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-content-muted/60 group-hover:text-content transition-colors">
              Review <ArrowRight size={12} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
