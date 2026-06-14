"use client";

import { useState, useMemo } from "react";
import { Search, UserPlus } from "lucide-react";
import { Input, Button } from "@/components/ui";
import { VENDORS, computeVendorStats, VendorStatsRow, VendorTable, VendorFilterDropdown, VendorDetailModal } from "./index";
import type { Vendor, VendorStatusFilter } from "./vendor.types";

export function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<VendorStatusFilter>("All Vendors");
  const [viewing, setViewing] = useState<Vendor | null>(null);

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

  function handleActivate(vendor: Vendor) {
    setVendors(prev =>
      prev.map(v => v.id === vendor.id ? { ...v, status: "Active", isVerified: true } : v)
    );
  }

  function handleSuspend(vendor: Vendor) {
    setVendors(prev =>
      prev.map(v => v.id === vendor.id ? { ...v, status: "Suspended" } : v)
    );
  }

  function handleDelete(vendor: Vendor) {
    setVendors(prev => prev.filter(v => v.id !== vendor.id));
    if (viewing?.id === vendor.id) setViewing(null);
  }

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300">
      <div>

        {/* ── Page header  ── */}
          <div className="mb-7">
            <p className="eyebrow text-content-muted uppercase">Admin</p>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-content tracking-tight leading-tight">Vendors</h1>
            <p className="text-xs sm:text-sm text-content-muted mt-1">
              Manage and monitor all vendors on the platform.
            </p>
          </div>


        {/* ── Search + filter action toolbar cluster ── */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Form wrapper for Input Field Shell Layout */}
          <div className="flex items-center gap-3 bg-panel border border-line/20  rounded-xl px-4 h-11 flex-1 min-w-[240px] shadow-sm transition-all">
            <Search size={14} className="text-content-muted shrink-0" />
            <Input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search vendors by name, email, or ID..."
              className="text-sm font-semibold text-content bg-transparent border-none! h-full p-0 placeholder:text-content-muted/30 w-full transition-none"/>
          </div>

          {/* Dropdown Control Frame Context */}
          <VendorFilterDropdown value={statusFilter} onChange={setStatusFilter} />
        </div>

        {/* ── Metric Display Panels row component ── */}
        <VendorStatsRow stats={stats} />

        {/* ── Reactive Filter Results Meta Label ── */}
        <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/70 mb-3 select-none">
          {filtered.length} {filtered.length === 1 ? "vendor" : "vendors"}
          {statusFilter !== "All Vendors" && ` · ${statusFilter}`}
          {search && ` · "${search}"`}
        </p>

        {/* ── Table Grid Frame ── */}
        <div className="rounded-xl  overflow-hidden">
             <VendorTable
                vendors={filtered}
                onView={setViewing}
                onActivate={handleActivate}
                onSuspend={handleSuspend}
                onDelete={handleDelete}
             />
        </div>
      </div>

      {/* ── Detail Focus Modal  ── */}
      <VendorDetailModal
        vendor={viewing}
        onClose={() => setViewing(null)}
        onActivate={handleActivate}
        onSuspend={handleSuspend}
      />
    </div>
  );
}