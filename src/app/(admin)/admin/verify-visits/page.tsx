"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Plus, ClipboardList } from "lucide-react";
import { StatsRow } from "./components/StatsRow";
import { VisitCard } from "./components/VisitCard";
import { VisitDetailsModal } from "./components/VisitDetailsModal";
import { ScheduleVisitModal, type NewVisitForm } from "./components/ScheduleVisitModal";
import { VISITS, computeStats, STATUS_FILTER_OPTIONS,
  type VerificationVisit, type VisitStatus, type StatusFilter } from "./data";
import { Input } from "@/components/ui";

export default function VerificationVisitsPage() {
  const [visits, setVisits] = useState<VerificationVisit[]>(VISITS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All Visits");
  const [selectedVisit, setSelected] = useState<VerificationVisit | null>(null);
  const [scheduleOpen, setSchedule] = useState(false);

  // ── Live stats derived from current visits array ───────────────────────────
  const stats = useMemo(() => computeStats(visits), [visits]);

  // ── Filter + search ───────────────────────────────────────────────────────
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

  // ── Update a visit's status after inspector action ────────────────────────
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

  // ── Add a new scheduled visit ─────────────────────────────────────────────
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
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page header ── */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Admin</p>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">Verification Visits</h1>
              <p className="text-sm text-gray-500 mt-1">Schedule and track vendor verification visits.</p>
            </div>
            <button
              onClick={() => setSchedule(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#7abf00] to-[#90d505] hover:from-[#6aaf00] hover:to-[#80c500] text-black text-sm font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-all active:scale-95 shadow-sm whitespace-nowrap" >
              <Plus size={16} />
              Schedule New Visit
            </button>
          </div>
        </div>

        {/* Stats — live */}
        <StatsRow stats={stats} />

        {/* ── Search + filter bar ── */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 flex-1 min-w-[200px]">
            <Search size={15} className="text-gray-400 shrink-0" />
            <Input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by vendor, visit ID..."
              className="text-sm text-gray-800 bg-transparent outline-none! ring-0! w-full placeholder:text-gray-400" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#90d505] transition-all">
              <SlidersHorizontal size={14} className="text-gray-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as StatusFilter)}
                className="text-sm font-medium text-gray-700 bg-transparent outline-none! ring-0! cursor-pointer pr-1" >
                {STATUS_FILTER_OPTIONS.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Results count ── */}
        <p className="text-xs text-gray-400 font-medium mb-3">
          {filtered.length} {filtered.length === 1 ? "visit" : "visits"} found
          {statusFilter !== "All Visits" && ` · ${statusFilter}`}
          {search && ` · "${search}"`}
        </p>

        {/* ── Visit cards list ── */}
        {filtered.length === 0 ? (
          <EmptyState onReset={() => { setSearch(""); setStatusFilter("All Visits"); }} />
        ) : (
          <div className="flex flex-col gap-3">
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

      {/* ── Modals ── */}
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

// ── Empty state ────────────────────────────────────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <ClipboardList size={28} className="text-gray-400" />
      </div>
      <h3 className="text-base font-bold text-gray-800 mb-1">No visits found</h3>
      <p className="text-sm text-gray-400 mb-5 max-w-xs">
        Try adjusting your search or filter to find what you're looking for.
      </p>
      <button
        onClick={onReset}
        className="text-sm font-bold text-[#5a9e00] hover:underline underline-offset-2 transition" >
        Clear filters
      </button>
    </div>
  );
}