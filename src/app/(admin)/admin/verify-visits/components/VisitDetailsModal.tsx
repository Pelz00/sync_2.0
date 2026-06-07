"use client";
import { useEffect, useState } from "react";
import { X, MapPin, Calendar, Clock, User, Tag, Phone, FileText, CheckCircle, XCircle, AlertCircle, ClipboardList, Building2, ExternalLink,} from "lucide-react";
import type { VerificationVisit, VisitStatus } from "../data";
import { Textarea } from "@/components/ui";

interface VisitDetailsModalProps {
  visit: VerificationVisit | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: VisitStatus, notes: string) => void;
}

const GRADIENT: Record<VisitStatus, string> = {
  Scheduled: "from-blue-500 to-blue-600",
  "In Progress": "from-amber-500 to-orange-500",
  Completed: "from-emerald-500 to-green-600",
  Failed: "from-red-500 to-rose-600",
};

const STATUS_ICON: Record<VisitStatus, React.ReactNode> = {
  Scheduled: <Clock size={16} />,
  "In Progress": <AlertCircle size={16} />,
  Completed: <CheckCircle size={16} />,
  Failed: <XCircle size={16} />,
};

// Timeline steps shown in the modal
const TIMELINE: { status: VisitStatus; label: string; desc: string }[] = [
  { status: "Scheduled", label: "Scheduled", desc: "Visit logged and inspector assigned" },
  { status: "In Progress", label: "In Progress", desc: "Inspector on-site conducting review" },
  { status: "Completed", label: "Completed", desc: "Visit concluded and result recorded" },
];

const STATUS_ORDER: Record<VisitStatus, number> = {
  Scheduled: 0, "In Progress": 1, Completed: 2, Failed: 2,
};

export function VisitDetailsModal({ visit, onClose, onUpdateStatus }: VisitDetailsModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [notes, setNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (visit) {
      setNotes(visit.notes ?? "");
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [visit]);

  function handleClose() {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") handleClose(); }
    if (visit) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visit]);

  useEffect(() => {
    if (visit) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [visit]);

  async function handleAction(status: "Completed" | "Failed") {
    if (!visit) return;
    setUpdating(true);
    await new Promise(r => setTimeout(r, 700));
    onUpdateStatus(visit.id, status, notes);
    setUpdating(false);
    handleClose();
  }

  if (!visit) return null;

  const currentStep  = STATUS_ORDER[visit.status];
  const isFailed = visit.status === "Failed";
  const isTerminal = visit.status === "Completed" || isFailed;
  const canUpdate = !isTerminal;

  return (
    <div className={[
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "transition-all duration-300 ease-in-out",
        isVisible ? "bg-black/50 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none",
      ].join(" ")}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }} >
      <div className={[
          "bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[92vh]",
          "transition-all duration-300 ease-out",
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6" ].join(" ")} >
        {/* ── Gradient header ── */}
        <div className={`bg-gradient-to-br ${GRADIENT[visit.status]} px-6 pt-6 pb-6 rounded-t-3xl relative overflow-hidden`}>
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors z-10" >
            <X size={16} />
          </button>

          {/* Status chip */}
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            {STATUS_ICON[visit.status]}
            {visit.status}
          </div>

          <h2 className="text-2xl font-black text-white leading-tight mb-1">{visit.vendor}</h2>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-white/70 text-xs font-mono">{visit.id}</span>
            <span className="text-white/40">·</span>
            <span className="text-white/70 text-xs font-mono">{visit.vendorId}</span>
            <span className="inline-flex items-center gap-1 text-white/80 text-xs font-semibold bg-white/15 rounded-full px-2.5 py-0.5">
              <Tag size={10} />
              {visit.category}
            </span>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto modal-scroll">

          {/* ── Timeline (not shown for failed) ── */}
          {!isFailed && (
            <div className="px-6 pt-5 pb-1">
              <div className="flex items-start gap-0">
                {TIMELINE.map((step, i) => {
                  const done = currentStep > i;
                  const current = currentStep === i;
                  const last = i === TIMELINE.length - 1;
                  return (
                    <div key={step.status} className="flex items-start flex-1">
                      <div className="flex flex-col items-center flex-1">
                        {/* Dot */}
                        <div className={[
                          "w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all",
                          done ? "bg-[#90d505] border-[#90d505] text-white" :
                          current ? "bg-white border-[#90d505] text-[#5a9e00]" :
                                    "bg-gray-100 border-gray-200 text-gray-400",
                        ].join(" ")}>
                          {done ? <CheckCircle size={14} /> : i + 1}
                        </div>
                        {/* Label */}
                        <p className={`text-[0.6rem] font-bold uppercase tracking-wide mt-1 text-center ${
                          done || current ? "text-gray-700" : "text-gray-400"
                        }`}>{step.label}</p>
                      </div>
                      {/* Connector */}
                      {!last && (
                        <div className={`h-0.5 flex-1 mt-3.5 mx-1 rounded-full transition-colors ${
                          done ? "bg-[#90d505]" : "bg-gray-200" }`} /> )}
                    </div> ) })}
              </div>
            </div>
          )}

          {/* ── Details grid ── */}
          <div className="px-6 py-5 grid grid-cols-2 gap-4">
            <Detail icon={<Calendar size={13} />} label="Date" value={visit.date} />
            <Detail icon={<Clock size={13} />} label="Time" value={visit.time} />
            <Detail icon={<MapPin size={13} />} label="Location" value={visit.location}  span />
            <Detail icon={<User size={13} />} label="Inspector" value={visit.inspector} />
            {visit.phone && (
              <Detail icon={<Phone size={13} />} label="Phone" value={visit.phone} />
            )}
          </div>

          {/* ── Notes block ── */}
          {visit.notes && (
            <div className="mx-6 mb-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-2">
                <FileText size={11} />
                Visit Notes
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{visit.notes}</p>
            </div>
          )}

          {/* ── Result banner ── */}
          {visit.result && (
            <div className={`mx-6 mb-4 rounded-2xl p-4 border flex items-center gap-3 ${
              visit.result === "Passed"
                ? "bg-emerald-50 border-emerald-200"
                : "bg-red-50 border-red-200"
            }`}>
              {visit.result === "Passed"
                ? <CheckCircle size={20} className="text-emerald-600 shrink-0" />
                : <XCircle size={20} className="text-red-500 shrink-0" />
              }
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Result</p>
                <p className={`text-sm font-bold ${visit.result === "Passed" ? "text-emerald-700" : "text-red-600"}`}>
                  {visit.result}
                </p>
              </div>
            </div>
          )}

          {/* ── Update status section ── */}
          {canUpdate && (
            <div className="mx-6 mb-6">
              <div className="flex items-center gap-2 text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-3">
                <ClipboardList size={11} />
                Update Visit Status
              </div>

              <Textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add findings, observations or notes..."
                rows={3}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none! ring-0! focus:border-[#90d505] focus:ring-2 focus:ring-[#90d505]/20 resize-none transition-all"/>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAction("Completed")}
                  disabled={updating}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#7abf00] to-[#90d505] hover:from-[#6aaf00] hover:to-[#80c500] disabled:opacity-60 text-white text-sm font-bold py-3 rounded-2xl transition-all active:scale-95 shadow-sm" >
                  <CheckCircle size={15} />
                  {updating ? "Saving..." : "Mark Completed"}
                </button>
                <button
                  onClick={() => handleAction("Failed")}
                  disabled={updating}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-60 text-sm font-bold py-3 rounded-2xl transition-all active:scale-95" >
                  <XCircle size={15} />
                  Mark Failed
                </button>
              </div>
            </div>
          )}

          {/* ── Terminal state footer ── */}
          {isTerminal && (
            <div className="mx-6 mb-6 text-center">
              <p className="text-xs text-gray-400">
                This visit is <span className="font-bold">{visit.status.toLowerCase()}</span> and can no longer be updated.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────

function Detail({ icon, label, value, span }: {
  icon: React.ReactNode; label: string; value: string; span?: boolean;
}) {
  return (
    <div className={span ? "col-span-2" : ""}>
      <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest mb-1">
        <span className="text-gray-300">{icon}</span>
        {label}
      </div>
      <p className="text-sm font-semibold text-gray-800 leading-snug">{value}</p>
    </div>
  );
}
