"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Clock, ShieldOff } from "lucide-react";
import { LANDLORDS } from "../../landlords-components/landlord.constants";
import type { Landlord } from "../../landlords-components/landlord.types";
import { cn } from "@/lib/utils";

interface LandlordsPanelProps {
  activeLandlord: Landlord;
}

const STATUS_DOT: Record<string, string> = {
  Active: "bg-green-500",
  Pending: "bg-orange-400",
  Suspended: "bg-red-500",
};

export function LandlordsPanel({ activeLandlord }: LandlordsPanelProps) {
  const router = useRouter();

  return (
    <aside className="w-64 shrink-0 h-full flex flex-col border-r border-line/15 bg-panel overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-line/15 shrink-0">
        <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/70">
          Landlords
        </p>
        <p className="text-xs text-content-muted/50 mt-0.5">{LANDLORDS.length} total</p>
      </div>

      {/* Landlord list */}
      <div className="flex-1 overflow-y-auto CustomScrollbar">
        {LANDLORDS.map((landlord) => {
          const isActive = landlord.id === activeLandlord.id;
          const photo = landlord.businessPhotos?.[0];

          return (
            <button
              key={landlord.id}
              type="button"
              onClick={() => router.push(`/admin/landlord/${landlord.slug}`)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-b border-line/10 last:border-0 group",
                isActive
                  ? "bg-surface-deep"
                  : "hover:bg-surface-deep/60"
              )}>

              {/* Photo thumbnail */}
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-surface-deep border border-line/15">
                {photo ? (
                  <Image src={photo} alt={landlord.name} width={100} height={100} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-content-muted/30 text-[10px] font-bold">
                    {landlord.name[0]}
                  </div>
                )}
                {/* Status dot */}
                <span className={cn("absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full border border-panel", STATUS_DOT[landlord.status])} />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <p className={cn(
                    "text-xs font-bold truncate",
                    isActive ? "text-content" : "text-content group-hover:text-content"
                  )}>
                    {landlord.name}
                  </p>
                  {landlord.isVerified
                    ? <ShieldCheck size={11} className="text-green-600 shrink-0" />
                    : landlord.status === "Suspended"
                    ? <ShieldOff size={11} className="text-red-400 shrink-0" />
                    : <Clock size={11} className="text-orange-400 shrink-0" />
                  }
                </div>
                <p className="text-[10px] text-content-muted/50 truncate mt-0.5">{landlord.category} · {landlord.location.split(",")[0]}</p>
              </div>

              {/* Active indicator */}
              {isActive && (
                <span className="w-1 h-6 rounded-full bg-lime shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
