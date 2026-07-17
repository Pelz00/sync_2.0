"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui";
import { LANDLORDS, computeLandlordStats } from "./landlord.constants";
import { LandlordStatsRow } from "./LandlordStatsRow";
import { LandlordFolderCard } from "./LandlordFolderCard";
import { LandlordKycSidebar } from "./LandlordKycSidebar";
import type { Landlord, LandlordStatusFilter } from "./landlord.types";
import { cn } from "@/lib/utils";

const FILTERS: LandlordStatusFilter[] = ["All Landlords", "Active", "Pending", "Suspended"];

const FILTER_STYLES: Record<LandlordStatusFilter, { active: string; dot?: string }> = {
  "All Landlords": { active: "bg-surface-deep text-content shadow-xs" },
  "Active": { active: "bg-green-50 text-green-700 shadow-xs", dot: "bg-green-500" },
  "Pending": { active: "bg-orange-50 text-orange-600 shadow-xs", dot: "bg-orange-400" },
  "Suspended": { active: "bg-red-50 text-red-600 shadow-xs", dot: "bg-red-500" },
};

export function AdminLandlordsPage() {
  const [landlords, setLandlords] = useState<Landlord[]>(LANDLORDS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LandlordStatusFilter>("All Landlords");
  const [kycLandlord, setKycLandlord] = useState<Landlord | null>(null);

  const stats = useMemo(() => computeLandlordStats(landlords), [landlords]);

  const filtered = useMemo(() => {
    return landlords.filter(l => {
      const matchesStatus = statusFilter === "All Landlords" || l.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.landlordId.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [landlords, search, statusFilter]);

  function handleVerify(landlord: Landlord) {
    setLandlords(prev =>
      prev.map(l => l.id === landlord.id
        ? { ...l, status: "Active", isVerified: true, rejectionReason: undefined }
        : l
      )
    );
  }

  function handleReject(landlord: Landlord, reason: string) {
    setLandlords(prev =>
      prev.map(l => l.id === landlord.id
        ? { ...l, status: "Suspended", isVerified: false, rejectionReason: reason }
        : l
      )
    );
  }

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300">

      <div className="mb-5">
        <p className="text-xs sm:text-sm text-content-muted">
          Manage and monitor all landlords and their hostels on the platform.
        </p>
      </div>

      {/* ── Search ── */}
      <div className="flex items-center gap-3 bg-panel border border-line/20 rounded-xl px-4 h-11 w-full shadow-sm mb-6">
        <Search size={14} className="text-content-muted shrink-0" />
        <Input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search landlords by name, email, or ID..."
          className="text-sm font-semibold text-content bg-transparent border-none! h-full p-0 placeholder:text-content-muted/30 w-full outline-none! ring-0!"
        />
      </div>

      {/* ── Stats ── */}
      <LandlordStatsRow stats={stats} />

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-1 bg-panel border border-line/15 rounded-2xl p-1.5 mb-5 overflow-x-auto scrollbar-none shadow-xs">
        {FILTERS.map((filter) => {
          const isActive = statusFilter === filter;
          const style = FILTER_STYLES[filter];
          const count = filter === "All Landlords"
            ? landlords.length
            : landlords.filter(l => l.status === filter).length;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0",
                isActive ? style.active : "text-content-muted/60 hover:text-content hover:bg-surface-deep/50"
              )}>
              {style.dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", style.dot)} />}
              {filter}
              <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-md", isActive ? "bg-black/5" : "bg-surface-deep text-content-muted/60")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Results label ── */}
      <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/70 mb-4 select-none">
        {filtered.length} {filtered.length === 1 ? "landlord" : "landlords"}
        {search && ` · "${search}"`}
      </p>

      {/* ── Folder cards ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-surface-deep/40 border border-line/15 rounded-xl">
          <p className="text-content-muted/80 font-medium text-xs uppercase tracking-widest">
            No landlords match your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(landlord => (
            <LandlordFolderCard
              key={landlord.id}
              landlord={landlord}
              onKycReview={setKycLandlord}
            />
          ))}
        </div>
      )}

      {/* ── KYC sidebar (pending landlords only) ── */}
      <LandlordKycSidebar
        landlord={kycLandlord}
        onClose={() => setKycLandlord(null)}
        onVerify={handleVerify}
        onReject={handleReject}
      />
    </div>
  );
}
