"use client";

import { useEffect, useState } from "react";
import { X, MapPin, Calendar, Clock, User, Tag, Phone, FileText, CheckCircle, XCircle, AlertCircle, ClipboardList } from "lucide-react";
import type { VerificationVisit, VisitStatus } from "../data";
import { Textarea, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface VisitDetailsModalProps {
  visit: VerificationVisit | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: VisitStatus, notes: string) => void;
}

const STATUS_CONFIG: Record<VisitStatus, { label: string; dot: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
  Scheduled: { 
    label: "Scheduled", 
    dot: "bg-blue-400", 
    bg: "bg-blue-100", 
    text: "text-blue-600", 
    border: "border-blue-200",
    icon: <Clock size={13} />
  },
  "In Progress": { 
    label: "In Progress", 
    dot: "bg-amber-400", 
    bg: "bg-amber-100", 
    text: "text-amber-600", 
    border: "border-amber-200",
    icon: <AlertCircle size={13} />
  },
  Completed: { 
    label: "Completed", 
    dot: "bg-emerald-400", 
    bg: "bg-emerald-100", 
    text: "text-emerald-600", 
    border: "border-emerald-200",
    icon: <CheckCircle size={13} />
  },
  Failed: { 
    label: "Failed", 
    dot: "bg-red-400", 
    bg: "bg-red-100", 
    text: "text-red-600", 
    border: "border-red-200",
    icon: <XCircle size={13} />
  },
};

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
    setTimeout(onClose, 200);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") handleClose(); }
    if (visit) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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

  const currentStep = STATUS_ORDER[visit.status];
  const isFailed = visit.status === "Failed";
  const isTerminal = visit.status === "Completed" || isFailed;
  const canUpdate = !isTerminal;
  const cfg = STATUS_CONFIG[visit.status];

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ease-out",
        isVisible ? "bg-black/60 backdrop-blur-xs" : "bg-black/0 backdrop-blur-none",
      )}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }} >
      
      {/* Modal Layout Frame */}
      <div 
        className={cn(
          "bg-panel border border-line/15 rounded-xl shadow-pop w-full max-w-xl flex flex-col max-h-[85vh] origin-center",
          "transition-all duration-200 ease-out",
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-98 translate-y-2"
        )} >
        
        {/* Header Block */}
        <div className="bg-panel border-b border-line/15 rounded-xl px-6 pt-6 pb-5 relative shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-content-muted/60 hover:text-content hover:bg-surface-deep border border-line/15 transition-colors cursor-pointer z-10" >
            <X size={15} />
          </button>

          {/* Status Badge */}
          <div className="mb-3">
            <span className={cn(
              "inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full border", 
              cfg.bg, cfg.text, cfg.border
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} />
              {cfg.label}
            </span>
          </div>

          <h2 className="text-base font-display font-semibold text-content tracking-tight mb-2">{visit.vendor}</h2>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-content-muted/70 text-xs font-mono">{visit.id}</span>
            <span className="text-line/30 text-xs">·</span>
            <span className="text-content-muted/70 text-xs font-mono">{visit.vendorId}</span>
            <span className="text-line/30 text-xs">·</span>
            <span className="inline-flex items-center gap-1 text-content-muted/80 text-xs font-medium bg-surface-deep/40 border border-line/15 rounded-md px-2 py-0.5">
              <Tag size={10} className="text-content-muted/50" />
              {visit.category}
            </span>
          </div>
        </div>

        {/* Input Fields / Details Wrapper */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5 rounded-xl CustomScrollbar bg-panel">

          {/* Timeline Pipeline */}
          {!isFailed && (
            <div className="border border-line/15 rounded-xl bg-surface-deep/20 p-4">
              <div className="flex items-start gap-0">
                {TIMELINE.map((step, i) => {
                  const done = currentStep > i;
                  const current = currentStep === i;
                  const last = i === TIMELINE.length - 1;
                  return (
                    <div key={step.status} className="flex items-start flex-1">
                      <div className="flex flex-col items-center flex-1">
                        {/* Vector Point indicator */}
                        <div className={cn(
                          "w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-semibold transition-colors shadow-sm",
                          done ? "bg-lime border-line text-ink" :
                          current ? "border-line/40 bg-panel text-lime shadow-sm" :
                                    "bg-panel border-line/15 text-content-muted/40"
                        )}>
                          {done ? <CheckCircle size={14} strokeWidth={2.5} /> : i + 1}
                        </div>
                        {/* Segment Meta text */}
                        <p className={cn(
                          "text-[9px] font-bold uppercase tracking-widest font-mono mt-2 text-center",
                          done || current ? "text-content" : "text-content-muted/60"
                        )}>{step.label}</p>
                      </div>
                      {/* Connection Bar line */}
                      {!last && (
                        <div className={cn(
                          "h-px flex-1 mt-3.5 mx-1 transition-colors",
                          done ? "bg-lime" : "bg-line/15"
                        )} /> 
                      )}
                    </div> 
                  ); 
                })}
              </div>
            </div>
          )}

          {/* Structured Detail Grid */}
          <div className="grid grid-cols-2 gap-4 border border-line/15 rounded-xl p-4 bg-surface-deep/20">
            <Detail icon={<Calendar size={13} />} label="Date" value={visit.date} />
            <Detail icon={<Clock size={13} />} label="Time" value={visit.time} />
            <Detail icon={<MapPin size={13} />} label="Location" value={visit.location} span />
            <Detail icon={<User size={13} />} label="Inspector" value={visit.inspector} span />
            {visit.phone && (
              <Detail icon={<Phone size={13} />} label="Phone" value={visit.phone} span />
            )}
          </div>

          {/* Historic Operational Observations */}
          {visit.notes && (
            <div className="bg-surface-deep/40 border border-line/15 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-content-muted/90">
                <FileText size={12} className="text-content-muted/60" />
                Visit Notes
              </div>
              <p className="text-xs text-content/90 leading-relaxed whitespace-pre-wrap font-sans font-medium">{visit.notes}</p>
            </div>
          )}

          {/* Concluded Result Banners */}
          {visit.result && (
            <div className={cn(
              "rounded-xl p-4 border flex items-center gap-3",
              visit.result === "Passed" ? "bg-lime/10 border-lime/20" : "bg-coral/10 border-coral/20"
            )}>
              {visit.result === "Passed"
                ? <CheckCircle size={18} className="text-lime shrink-0" />
                : <XCircle size={18} className="text-coral shrink-0" />
              }
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/80 mb-0.5">Result</p>
                <p className={cn("text-sm font-bold tracking-tight", visit.result === "Passed" ? "text-lime" : "text-coral")}>
                  {visit.result}
                </p>
              </div>
            </div>
          )}

          {/* Actionable Pipeline Area */}
          {canUpdate && (
            <div className="border border-line/15 rounded-xl p-4 flex flex-col gap-3.5 bg-surface-deep/10">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-content-muted/90">
                <ClipboardList size={12} className="text-content-muted/60" />
                Update Visit Status
              </div>

              <Textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add findings, observations or notes..."
                rows={3}
                className="w-full bg-surface-deep border border-line/15 rounded-md px-3 py-2 text-xs text-content placeholder:text-content-muted/50 resize-none transition-colors focus:border-line/40 focus:bg-surface-deep/70 outline-none" />

              <div className="flex flex-col md:flex-row gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleAction("Completed")}
                  disabled={updating}
                  className="flex-1 bg-lime text-ink py-2 font-semibold hover:opacity-90 transition-opacity h-9 shadow-sm gap-2 disabled:opacity-40" >
                  <CheckCircle size={14} />
                  {updating ? "Saving..." : "Mark Completed"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction("Failed")}
                  disabled={updating}
                  className="flex-1 border-coral/30 py-2 text-coral bg-panel hover:bg-coral/5 h-9 font-semibold gap-2 disabled:opacity-40" >
                  <XCircle size={14} />
                  Mark Failed
                </Button>
              </div>
            </div>
          )}

          {/* Locked Read-Only State Alerts */}
          {isTerminal && (
            <div className="text-center py-2.5 border-t border-line/15">
              <p className="text-xs text-content-muted/80">
                This visit is <span className="font-bold text-content">{visit.status}</span> and can no longer be modified.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-component Content Row Wrapper Helper

function Detail({ icon, label, value, span }: {
  icon: React.ReactNode; label: string; value: string; span?: boolean;
}) {
  return (
    <div className={span ? "col-span-2" : ""}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-content-muted/90 mb-1">
        <span className="text-content-muted/40 shrink-0">{icon}</span>
        {label}
      </div>
      <p className="text-xs font-semibold text-content leading-tight">{value}</p>
    </div>
  );
}