"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Plus, ClipboardList } from "lucide-react";
import { StatsRow } from "./components/StatsRow";
import { VisitCard } from "./components/VisitCard";
import { VisitDetailsModal } from "./components/VisitDetailsModal";
import { ScheduleVisitModal, type NewVisitForm } from "./components/ScheduleVisitModal";
import { VISITS, computeStats, STATUS_FILTER_OPTIONS,
  type VerificationVisit, type VisitStatus, type StatusFilter } from "./data";
import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";

export default function VerificationVisitsPage() {
  const [visits, setVisits] = useState<VerificationVisit[]>(VISITS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All Visits");
  const [selectedVisit, setSelected] = useState<VerificationVisit | null>(null);
  const [scheduleOpen, setSchedule] = useState(false);

  // ── Live stats derived from current visits array 
  const stats = useMemo(() => computeStats(visits), [visits]);

  // ── Filter + search 
  const filtered = useMemo(() => {
    return visits.filter(v => {
      const matchesStatus = statusFilter === "All Visits" || v.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        v.vendor.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q) ||
        v.vendorId.toLowerCase().includes(q) ||
        v.inspector.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [visits, search, statusFilter]);

  // ── Update a visit's status after inspector action ──
  function handleUpdateStatus(id: string, status: VisitStatus, notes: string) {
    setVisits(prev =>
      prev.map(v =>
        v.id === id
          ? {
              ...v,
              status,
              notes,
              result: status === "Completed" ? "Passed" : "Failed",
            }
          : v,
      ),
    );
  }

  // ── Add a new scheduled visit ──
  function handleScheduleVisit(data: NewVisitForm) {
    const newVisit: VerificationVisit = {
      id: `VIS-${1000 + visits.length + 1}`,
      vendorId: data.vendorId || `VEN-${2800 + visits.length}`,
      vendor: data.vendor,
      date: data.date,
      time: data.time,
      location: data.location,
      inspector: data.inspector,
      status: "Scheduled",
      notes: data.notes,
      category: data.category || "General",
    };
    setVisits(prev => [newVisit, ...prev]);
  }

  return (
    <div className="min-h-screen bg-surface ">
      <div className=" mx-auto">

        {/* ── Page Header ── */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
           <p className="text-sm text-content-muted mt-1">
              Schedule and track vendor verification visits.
           </p>
          <button
            onClick={() => setSchedule(true)}
            className="flex items-center justify-center gap-2 bg-accent text-sm text-black font-semibold h-10 px-4 rounded-lg cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all shadow-card whitespace-nowrap" >
            <Plus size={16} />
            Schedule New Visit
          </button>
        </div>

        {/* Live Stats */}
        <StatsRow stats={stats} />

        {/* ── Search + Filter Toolbar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="flex items-center gap-2 bg-panel border border-line/15 rounded-lg px-3 flex-1 h-10">
            <Search size={15} className="text-content-muted/50 shrink-0" />
            <Input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by vendor name, visit ID, inspector..."
              className="text-sm text-content bg-transparent border-none! outline-none! ring-0! w-full placeholder:text-content-muted/40 py-1" />
          </div>

          <div className="w-full sm:w-56">
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val as StatusFilter)}>
              <SelectTrigger className="w-full h-10 bg-panel border-line/15">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-content-muted/50 shrink-0" />
                  <SelectValue placeholder="Filter status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {STATUS_FILTER_OPTIONS.map(o => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── Results Sub-Header Count Meta ── */}
        <p className="text-eyebrow font-mono text-content-muted mb-3">
          {filtered.length} {filtered.length === 1 ? "visit" : "visits"} found
          {statusFilter !== "All Visits" && ` · ${statusFilter}`}
          {search && ` · "${search}"`}
        </p>

        {/* ── Visit Cards Layout ── */}
        {filtered.length === 0 ? (
          <EmptyState onReset={() => { setSearch(""); setStatusFilter("All Visits"); }} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((visit, i) => (
              <VisitCard
                key={visit.id}
                visit={visit}
                onViewDetails={setSelected}
                style={{ animationDelay: `${i * 40}ms` }} />
            ))}
          </div>
        )}
      </div>

      {/* ── Overlays and Modals ── */}
      <VisitDetailsModal
        visit={selectedVisit}
        onClose={() => setSelected(null)}
        onUpdateStatus={handleUpdateStatus} />
      
      <ScheduleVisitModal
        open={scheduleOpen}
        onClose={() => setSchedule(false)}
        onSave={handleScheduleVisit} />
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-line/20 rounded-xl bg-panel/30">
      <div className="w-12 h-12 rounded-lg bg-surface-deep border border-line/15 flex items-center justify-center mb-4 shadow-card">
        <ClipboardList size={22} className="text-content-muted/70" />
      </div>
      <h3 className="text-base font-bold text-content mb-1">No visits found</h3>
      <p className="text-sm text-content-muted mb-5 max-w-xs leading-relaxed">
        Try adjusting your search query parameters or shifting active status filters.
      </p>
      <button
        onClick={onReset}
        className="text-xs font-bold uppercase tracking-wider text-accent-fg hover:text-accent-fg/80 underline underline-offset-4 transition cursor-pointer" >
        Clear dynamic filters
      </button>
    </div>
  );
}