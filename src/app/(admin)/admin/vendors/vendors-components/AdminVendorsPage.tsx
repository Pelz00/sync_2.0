"use client";

import { useState, useMemo } from "react";
import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui";
import {
  VENDORS, computeVendorStats,
  VendorStatsRow, VendorTable, VendorDetailModal,
} from "./index";
import { VendorKycSidebar } from "./VendorKycSidebar";
import type { Vendor, VendorStatusFilter, VendorView } from "./vendor.types";
import { cn } from "@/lib/utils";

const FILTERS: VendorStatusFilter[] = ["All Vendors", "Active", "Pending", "Suspended"];

const FILTER_STYLES: Record<VendorStatusFilter, { active: string; dot?: string }> = {
  "All Vendors": { active: "bg-surface-deep text-content shadow-xs" },
  "Active":      { active: "bg-green-50 text-green-700 shadow-xs", dot: "bg-green-500" },
  "Pending":     { active: "bg-orange-50 text-orange-600 shadow-xs", dot: "bg-orange-400" },
  "Suspended":   { active: "bg-red-50 text-red-600 shadow-xs", dot: "bg-red-500" },
};

export function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<VendorStatusFilter>("All Vendors");
  const [viewing, setViewing] = useState<Vendor | null>(null);
  const [kycVendor, setKycVendor] = useState<Vendor | null>(null);
  const [view, setView] = useState<VendorView>("grid");

  const stats = useMemo(() => computeVendorStats(vendors), [vendors]);

  const filtered = useMemo(() => {
    return vendors.filter(v => {
      const matchesStatus = statusFilter === "All Vendors" || v.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        v.vendorId.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [vendors, search, statusFilter]);

  function handleView(vendor: Vendor) {
    if (!vendor.isVerified || vendor.status === "Pending") {
      setKycVendor(vendor);
    } else {
      setViewing(vendor);
    }
  }

  function handleActivate(vendor: Vendor) {
    setVendors(prev =>
      prev.map(v => v.id === vendor.id ? { ...v, status: "Active", isVerified: true } : v)
    );
  }

  function handleVerify(vendor: Vendor, note: string) {
    setVendors(prev =>
      prev.map(v => v.id === vendor.id
        ? { ...v, status: "Active", isVerified: true, verificationNote: note }
        : v
      )
    );
  }

  function handleSuspend(vendor: Vendor, reason: string) {
    setVendors(prev =>
      prev.map(v => v.id === vendor.id
        ? { ...v, status: "Suspended", suspendReason: reason }
        : v
      )
    );
    if (viewing?.id === vendor.id) setViewing(null);
  }

  function handleUnsuspend(vendor: Vendor, reason: string) {
    setVendors(prev =>
      prev.map(v => v.id === vendor.id
        ? { ...v, status: "Active", isVerified: true, unsuspendReason: reason, suspendReason: undefined }
        : v
      )
    );
    if (viewing?.id === vendor.id) setViewing(null);
  }

  function handleReject(vendor: Vendor, reason: string) {
    setVendors(prev =>
      prev.map(v => v.id === vendor.id
        ? { ...v, status: "Suspended", isVerified: false, rejectionReason: reason }
        : v
      )
    );
  }

  function handleDelete(vendor: Vendor) {
    setVendors(prev => prev.filter(v => v.id !== vendor.id));
    if (viewing?.id === vendor.id) setViewing(null);
    if (kycVendor?.id === vendor.id) setKycVendor(null);
  }

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300">

      <div className="mb-4">
        <p className="text-xs sm:text-sm text-content-muted">
          Manage and monitor all vendors on the platform.
        </p>
      </div>

      {/* ── Search + view toggle ── */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-3 bg-panel border border-line/20 rounded-xl px-4 h-11 flex-1 min-w-[240px] shadow-sm">
          <Search size={14} className="text-content-muted shrink-0" />
          <Input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search vendors by name, email, or ID..."
            className="text-sm font-semibold text-content bg-transparent border-none! h-full p-0 placeholder:text-content-muted/30 w-full outline-none! ring-0!"
          />
        </div>
        <div className="flex items-center gap-1 bg-panel border border-line/20 rounded-xl p-1 shadow-sm shrink-0">
          <button type="button" onClick={() => setView("grid")} className={cn("h-8 w-8 flex items-center justify-center rounded-lg transition-all", view === "grid" ? "bg-surface-deep text-content shadow-xs" : "text-content-muted/50 hover:text-content-muted")} aria-label="Grid view">
            <LayoutGrid size={15} />
          </button>
          <button type="button" onClick={() => setView("list")} className={cn("h-8 w-8 flex items-center justify-center rounded-lg transition-all", view === "list" ? "bg-surface-deep text-content shadow-xs" : "text-content-muted/50 hover:text-content-muted")} aria-label="List view">
            <List size={15} />
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <VendorStatsRow stats={stats} />

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-1 bg-panel border border-line/15 rounded-2xl p-1.5 mb-5 overflow-x-auto scrollbar-none shadow-xs">
        {FILTERS.map((filter) => {
          const isActive = statusFilter === filter;
          const style = FILTER_STYLES[filter];
          const count = filter === "All Vendors"
            ? vendors.length
            : vendors.filter(v => v.status === filter).length;
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
      <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/70 mb-3 select-none">
        {filtered.length} {filtered.length === 1 ? "vendor" : "vendors"}
        {statusFilter !== "All Vendors" && ` · ${statusFilter}`}
        {search && ` · "${search}"`}
      </p>

      {/* ── Table / Grid ── */}
      <div className="rounded-xl overflow-hidden">
        <VendorTable
          vendors={filtered}
          view={view}
          onView={handleView}
          onActivate={handleActivate}
          onSuspend={handleSuspend}
          onDelete={handleDelete}
        />
      </div>

      {/* ── Detail modal (active/verified vendors) ── */}
      <VendorDetailModal
        vendor={viewing}
        onClose={() => setViewing(null)}
        onActivate={handleActivate}
        onSuspend={handleSuspend}
        onUnsuspend={handleUnsuspend}
      />

      {/* ── KYC sidebar (pending/unverified vendors) ── */}
      <VendorKycSidebar
        vendor={kycVendor}
        onClose={() => setKycVendor(null)}
        onVerify={handleVerify}
        onReject={handleReject}
      />
    </div>
  );
}
