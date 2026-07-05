"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Clock, MapPin, Home, ChevronRight, Lock } from "lucide-react";
import type { Landlord } from "./landlord.types";
import { LandlordStatusBadge } from "./LandlordStatusBadge";
import { formatPrice, CATEGORY_COLORS } from "./landlord.constants";
import { cn } from "@/lib/utils";

interface LandlordFolderCardProps {
  landlord: Landlord;
  onKycReview: (landlord: Landlord) => void;
}

export function LandlordFolderCard({ landlord, onKycReview }: LandlordFolderCardProps) {
  const router = useRouter();
  const hostels = landlord.hostels ?? [];
  const catColor = CATEGORY_COLORS[landlord.category] ?? "bg-gray-100 text-gray-600";
  const coverPhoto = landlord.businessPhotos?.[0];
  const previewHostels = hostels.slice(0, 3);
  const remaining = hostels.length - previewHostels.length;

  const isPending = !landlord.isVerified || landlord.status === "Pending";

  function handleClick() {
    if (isPending) {
      onKycReview(landlord);
    } else {
      router.push(`/admin/landlord/${landlord.slug}`);
    }
  }

  return (
    <div
      onClick={handleClick}
      className="bg-panel border border-line/15 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-line/30 transition-all duration-200 group flex flex-col">

      {/* ── Cover photo ── */}
      <div className="relative w-full aspect-video bg-surface-deep overflow-hidden shrink-0">
        {coverPhoto ? (
          <Image
            src={coverPhoto}
            alt={landlord.name}
            fill
            className={cn(
              "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
              isPending && "opacity-80"
            )}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home size={22} className="text-content-muted/20" />
          </div>
        )}

        {/* Pending overlay hint */}
        {isPending && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <Lock size={11} /> Review KYC
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute top-3 left-3">
          <LandlordStatusBadge status={landlord.status} />
        </div>
        <div className="absolute top-3 right-3">
          <span className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-xs">
            {landlord.isVerified
              ? <ShieldCheck size={14} className="text-green-600" />
              : <Clock size={14} className="text-orange-400" />
            }
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            <Home size={11} />
            {hostels.length} {hostels.length === 1 ? "hostel" : "hostels"}
          </span>
        </div>
      </div>

      {/* ── Identity ── */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-sm font-bold text-content group-hover:text-green-700 transition-colors truncate">
          {landlord.name}
        </p>
        <p className="text-[10px] font-mono text-content-muted/50 mt-0.5">{landlord.landlordId}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className={cn("text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md", catColor)}>
            {landlord.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-content-muted/60">
            <MapPin size={10} className="shrink-0" />{landlord.location.split(",")[0]}
          </span>
        </div>
      </div>

      {/* ── Hostels folder preview ── */}
      <div className={cn("mx-4 mb-4 mt-2 border rounded-xl overflow-hidden", isPending ? "bg-surface-deep/30 border-line/10 opacity-70" : "bg-surface-deep/60 border-line/10")}>
        <div className="px-3 py-2 border-b border-line/10 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/60 select-none">
            {isPending ? "Locked — pending verification" : "Hostels"}
          </p>
          {isPending
            ? <Lock size={11} className="text-content-muted/30" />
            : <ChevronRight size={12} className="text-content-muted/40 group-hover:text-content-muted transition-colors" />
          }
        </div>
        <div className={cn("divide-y divide-line/10", isPending && "pointer-events-none select-none")}>
          {previewHostels.map((hostel) => (
            <div key={hostel.id} className="flex items-center justify-between px-3 py-2 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-content-muted/30 shrink-0" />
                <p className={cn("text-xs font-medium truncate", isPending ? "text-content-muted/40" : "text-content/80")}>
                  {hostel.name}
                </p>
              </div>
              <span className={cn("text-[11px] font-mono font-bold shrink-0", isPending ? "text-content-muted/30" : "text-content")}>
                {formatPrice(hostel.price)}
              </span>
            </div>
          ))}
          {remaining > 0 && (
            <div className="px-3 py-2">
              <p className="text-[10px] text-content-muted/50 font-medium">+{remaining} more</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
