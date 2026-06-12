"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ClipboardX } from "lucide-react";
import { DisputeStatsRow }    from "./DisputeStatsRow";
import { DisputeCard }        from "./DisputeCard";
import { DisputeDetailModal } from "./DisputeDetailModal";
import { DisputeFilterDropdown } from "./DisputeFilterDropdown";
import {
  DISPUTES,
  STATUS_FILTERS,
  PRIORITY_FILTERS,
  computeDisputeStats,
} from "./dispute.constants";
import type {
  Dispute,
  StatusFilterOption,
  PriorityFilterOption,
} from "./dispute.types";
import { Input } from "@/components/ui";


export function AdminDisputesPage() {
  const [disputes,       setDisputes]      = useState<Dispute[]>(DISPUTES);
  const [search,         setSearch]        = useState("");
  const [statusFilter,   setStatusFilter]  = useState<StatusFilterOption>("All Status");
  const [priorityFilter, setPriorityFilter]= useState<PriorityFilterOption>("All Priority");
  const [viewing,        setViewing]       = useState<Dispute | null>(null);

  // ── Live stats calculation block ──
  const stats = useMemo(() => computeDisputeStats(disputes), [disputes]);

  // ── Complex filter-matrix matching parameters ──
  const filtered = useMemo(() => {
    return disputes.filter(d => {
      const matchesStatus   = statusFilter   === "All Status"    || d.status   === statusFilter;
      const matchesPriority = priorityFilter === "All Priority"  || d.priority === priorityFilter;
      const q = search.toLowerCase();
      const matchesSearch   = !q ||
        d.id.toLowerCase().includes(q)          ||
        d.customer.toLowerCase().includes(q)    ||
        d.vendor.toLowerCase().includes(q)      ||
        d.orderId.toLowerCase().includes(q)     ||
        d.category.toLowerCase().includes(q);
      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [disputes, search, statusFilter, priorityFilter]);

  // ── Core resolution state adjustments ──
  function handleResolve(id: string, resolution: string) {
    setDisputes(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status: "Resolved", resolution }
          : d
      )
    );
  }

  function handleEscalate(id: string) {
    setDisputes(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status: "Escalated", assignedTo: "Senior Manager" }
          : d
      )
    );
  }

  // Ensures state synchronizes instantly if sliding drawer view remains mounted
  function handleViewWithSync(d: Dispute) {
    const latest = disputes.find(x => x.id === d.id) ?? d;
    setViewing(latest);
  }

  return (
    <div className=" transition-colors duration-300">
      <div className="">

        {/* ── Page Header Dashboard Meta Info Cluster ── */}
        <div className="mb-7 select-none">
          <p className="eyebrow text-content-muted uppercase mb-1">
            Admin
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-content tracking-tight leading-tight">
            Disputes
          </h1>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Manage and resolve customer disputes and issues.
          </p>
        </div>

        {/* ── Search + Filter Toolbar Controller Box ── */}
        <div className="flex items-center gap-3 mb-6 flex-wrap w-full">
          {/* Main search text input framework */}
          <div className="flex items-center flex-wr gap-2.5 bg-panel border border-line/15 rounded-xl px-4 h-11 flex-1 min-w-[240px] focus-within:border-line/40 transition-all shadow-xs">
            <Search size={14} className="text-content-muted/50 shrink-0" />
            <Input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search disputes by ID, customer, vendor, or order..."
              className="text-xs sm:text-sm text-content bg-transparent outline-none! ring-0! border-none w-full placeholder:text-content-muted/40 font-medium"
            />
          </div>

          {/* Contextual filter spacer divider symbol */}
          <Filter size={14} className="text-content-muted/40 shrink-0 hidden md:block" />

          <div className="flex">
            {/* Categorical Status Selector Dropdown Matrix */}
          <div className="w-full sm:w-auto shrink-0">
            <DisputeFilterDropdown<StatusFilterOption>
              value={statusFilter}
              options={STATUS_FILTERS}
              onChange={setStatusFilter}
            />
          </div>

          {/* Priority Status Selector Dropdown Matrix */}
          <div className="w-full sm:w-auto shrink-0">
            <DisputeFilterDropdown<PriorityFilterOption>
              value={priorityFilter}
              options={PRIORITY_FILTERS}
              onChange={setPriorityFilter}
            />
          </div>
          </div>
        </div>

        {/* ── High-Level Numerical System Stats Analytics ── */}
        <DisputeStatsRow stats={stats} />

        {/* ── Real-Time Dynamic Search Query Results Counters ── */}
        <p className="text-[11px] font-mono font-semibold text-content-muted/60 mb-4 uppercase tracking-wide select-none pl-1">
          {filtered.length} {filtered.length === 1 ? "dispute" : "disputes"}
          {statusFilter   !== "All Status"   && ` · ${statusFilter}`}
          {priorityFilter !== "All Priority" && ` · ${priorityFilter}`}
          {search && ` · "${search}"`}
        </p>

        {/* ── Render Target Dispute Loop Blocks ── */}
        {filtered.length === 0 ? (
          <EmptyState onReset={() => {
            setSearch(""); setStatusFilter("All Status"); setPriorityFilter("All Priority");
          }} />
        ) : (
          <div className="flex flex-col gap-3.5">
            {filtered.map(dispute => (
              <DisputeCard
                key={dispute.id}
                dispute={dispute}
                onView={handleViewWithSync}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Interactive Context Detail Sidebar Slide-Over ── */}
      <DisputeDetailModal
        dispute={viewing}
        onClose={() => setViewing(null)}
        onResolve={handleResolve}
        onEscalate={handleEscalate}
      />
    </div>
  );
}

// ── Shared Vector Parameter Empty Fallback State Component ──────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-panel border border-line/15 rounded-xl text-center shadow-xs select-none animate-in fade-in duration-200">
      <div className="w-12 h-12 rounded-xl bg-surface-deep border border-line/10 flex items-center justify-center mb-4 shadow-xs">
        <ClipboardX size={20} className="text-content-muted/60" />
      </div>
      <p className="text-sm font-semibold text-content mb-1">No disputes found</p>
      <p className="text-xs text-content-muted/70 mb-5 max-w-xs">
        Try adjusting your search query string adjustments or filtering properties.
      </p>
      <button
        onClick={onReset}
        className="text-xs font-bold text-lime hover:text-lime/80 underline underline-offset-4 cursor-pointer transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}