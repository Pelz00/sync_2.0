"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Clock, Building2, TrendingUp, Star, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { LANDLORDS, getLandlordBySlug, formatRevenue, CATEGORY_COLORS } from "../../landlords-components/landlord.constants";
import { LandlordStatusBadge } from "../../landlords-components/LandlordStatusBadge";
import { HostelGrid } from "./HostelGrid";
import { LandlordVerificationView } from "./LandlordVerificationView";
import type { Landlord } from "../../landlords-components/landlord.types";
import { cn } from "@/lib/utils";

interface LandlordProfilePageProps {
  slug: string;
}

const STATUS_DOT: Record<string, string> = {
  Active: "bg-green-500",
  Pending: "bg-orange-400",
  Suspended: "bg-red-500",
};

export function LandlordProfilePage({ slug }: LandlordProfilePageProps) {
  const router = useRouter();
  const seed = useMemo(() => getLandlordBySlug(LANDLORDS, slug), [slug]);
  const [landlord, setLandlord] = useState<Landlord | undefined>(seed);

  useMemo(() => {
    setLandlord(prev => {
      if (prev?.slug !== slug) return getLandlordBySlug(LANDLORDS, slug);
      return prev;
    });
  }, [slug]);

  if (!landlord) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
        <p className="text-sm font-bold text-content">Landlord not found</p>
        <p className="text-xs text-content-muted/70">No landlord matches "{slug}".</p>
        <button
          type="button"
          onClick={() => router.push("/admin/landlord")}
          className="mt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-content-muted hover:text-content">
          <ArrowLeft size={13} /> Back to Landlords
        </button>
      </div>
    );
  }

  const isVerifiedAndActive = landlord.status === "Active" && landlord.isVerified;
  const catColor = CATEGORY_COLORS[landlord.category] ?? "bg-gray-100 text-gray-600";

  function handleVerify() {
    setLandlord(prev => prev ? { ...prev, status: "Active", isVerified: true, rejectionReason: undefined } : prev);
  }

  function handleReject(reason: string) {
    setLandlord(prev => prev ? { ...prev, status: "Suspended", isVerified: false, rejectionReason: reason } : prev);
  }

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300">

      {/* ── Back link ── */}
      <button
        type="button"
        onClick={() => router.push("/admin/landlord")}
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-content-muted/70 hover:text-content transition-colors cursor-pointer select-none mb-5">
        <ArrowLeft size={13} /> Back to Landlords
      </button>

      {/* ── Landlord tabs ── */}
      <div className="flex items-center gap-1 bg-panel border border-line/15 rounded-2xl p-1.5 mb-6 overflow-x-auto scrollbar-none shadow-xs">
        {LANDLORDS.map((l) => {
          const isActive = l.slug === landlord.slug;
          const photo = l.businessPhotos?.[0];
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => router.push(`/admin/landlord/${l.slug}`)}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all shrink-0 group",
                isActive ? "bg-surface-deep shadow-xs" : "hover:bg-surface-deep/60"
              )}>
              <div className="relative w-7 h-7 rounded-lg overflow-hidden shrink-0 bg-surface-deep border border-line/15">
                {photo
                  ? <Image src={photo} alt={l.name} fill className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-[9px] font-bold text-content-muted/40">{l.name[0]}</div>
                }
                <span className={cn("absolute bottom-0 right-0 w-2 h-2 rounded-full border border-panel", STATUS_DOT[l.status])} />
              </div>
              <div className="text-left min-w-0">
                <p className={cn("text-xs font-bold truncate", isActive ? "text-content" : "text-content-muted/70 group-hover:text-content")}>
                  {l.name}
                </p>
                <p className="text-[10px] text-content-muted/50 truncate">{l.hostels?.length ?? 0} hostels</p>
              </div>
              {l.isVerified
                ? <ShieldCheck size={12} className="text-green-600 shrink-0 ml-0.5" />
                : <Clock size={12} className="text-orange-400 shrink-0 ml-0.5" />
              }
            </button>
          );
        })}
      </div>

      {/* ── Active landlord header card ── */}
      <div className="bg-panel border border-line/15 rounded-2xl mb-6 overflow-hidden shadow-xs">
        {landlord.businessPhotos?.[0] && (
          <div className="w-full h-28 sm:h-36 overflow-hidden relative">
            <Image src={landlord.businessPhotos[0]} alt={landlord.name} fill className="w-full h-full object-fit" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        <div className="px-5 py-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-lg font-bold font-display text-content tracking-tight">{landlord.name}</h1>
              {landlord.isVerified
                ? <ShieldCheck size={15} className="text-green-600 shrink-0" />
                : <Clock size={15} className="text-orange-400 shrink-0" />
              }
              <span className={cn("inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md", catColor)}>
                {landlord.category}
              </span>
            </div>
            <p className="text-[10px] font-mono text-content-muted/50">{landlord.landlordId}</p>
          </div>
          <LandlordStatusBadge status={landlord.status} />
        </div>

        <div className="flex items-center gap-5 px-5 py-3 border-t border-line/10 bg-surface-deep/30 overflow-x-auto scrollbar-none flex-wrap">
          <StatChip icon={<Building2 size={11} />} label="Bookings" value={landlord.bookings.toLocaleString()} />
          <StatChip icon={<TrendingUp size={11} />} label="Revenue" value={formatRevenue(landlord.revenue)} />
          <StatChip icon={<Star size={11} className="fill-amber-400 text-amber-400" />} label="Rating" value={landlord.rating !== null ? `${landlord.rating}` : "N/A"} />
          <div className="h-3.5 w-px bg-line/20 shrink-0" />
          <StatChip icon={<Mail size={11} />} label="Email" value={landlord.email} />
          <StatChip icon={<Phone size={11} />} label="Phone" value={landlord.phone} />
          <StatChip icon={<MapPin size={11} />} label="Location" value={landlord.location} />
          <StatChip icon={<Calendar size={11} />} label="Joined" value={landlord.joinedDate} />
        </div>
      </div>

      {/* ── Main content ── */}
      {isVerifiedAndActive ? (
        <>
          <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/70 mb-4 select-none">
            {(landlord.hostels ?? []).length} hostel{(landlord.hostels ?? []).length === 1 ? "" : "s"}
          </p>
          <HostelGrid landlord={landlord} />
        </>
      ) : (
        <>
          <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/70 mb-4 select-none">
            Verification review
          </p>
          <LandlordVerificationView
            landlord={landlord}
            onVerify={handleVerify}
            onReject={handleReject}
          />
        </>
      )}
    </div>
  );
}

function StatChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span className="text-content-muted/50">{icon}</span>
      <span className="text-[10px] text-content-muted/50 select-none">{label}:</span>
      <span className="text-[11px] font-semibold text-content">{value}</span>
    </div>
  );
}
