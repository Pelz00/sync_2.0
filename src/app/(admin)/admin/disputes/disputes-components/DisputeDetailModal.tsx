"use client";

import { useEffect, useState } from "react";
import { X, ArrowLeft, MessageSquare, Calendar, User, Store, Tag, AlertCircle, CheckCircle } from "lucide-react";
import { DisputeStatusBadge, DisputePriorityBadge } from "./DisputeBadges";
import { formatAmount } from "./dispute.constants";
import type { Dispute } from "./dispute.types";
import { cn } from "@/lib/utils";

interface DisputeDetailModalProps {
  dispute: Dispute | null;
  onClose: () => void;
  onResolve: (id: string, resolution: string) => void;
  onEscalate:(id: string) => void;
}

export function DisputeDetailModal({
  dispute, onClose, onResolve, onEscalate,
}: DisputeDetailModalProps) {
  const [resolution, setResolution] = useState("");
  const [showResolveForm, setShowResolveForm] = useState(false);

  // Esc keyboard event binder context block
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (dispute) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dispute, onClose]);

  // Document body view-overflow container tracking toggle
  useEffect(() => {
    document.body.style.overflow = dispute ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [dispute]);

  // Reset the form when a different dispute is shown - render-time (tracking the
  // previous id) rather than setState-in-effect.
  const [prevId, setPrevId] = useState(dispute?.id);
  if (dispute?.id !== prevId) {
    setPrevId(dispute?.id);
    setResolution("");
    setShowResolveForm(false);
  }

  if (!dispute) return null;

  function handleResolve() {
    if (!resolution.trim()) return;
    onResolve(dispute!.id, resolution.trim());
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 backdrop-blur-xs select-none"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }} >
      <div className="h-full w-full max-w-lg bg-panel border-l border-line/15 shadow-2xl flex flex-col animate-slide-in-right duration-300">

        {/* ── Top Bar Control Row ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line/10 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-content-muted hover:text-content transition-colors cursor-pointer" >
            <ArrowLeft size={13} /> <span>Back to Disputes</span>
          </button>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-content-muted/60 hover:bg-surface-deep border border-transparent hover:border-line/10 transition-all cursor-pointer" >
            <X size={15} />
          </button>
        </div>

        {/* ── Scrollable Document Content Area ── */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 CustomScrollbar">

          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <h2 className="text-lg font-monospace font-semibold text-content tracking-tight">{dispute.id}</h2>
              <DisputeStatusBadge status={dispute.status}     />
              <DisputePriorityBadge priority={dispute.priority} />
            </div>
            <div className="flex items-center gap-2 text-[13px] font-semibold text-content-muted/60">
              <span>Order: <span className="font-monospace text-content">{dispute.orderId}</span></span>
              <span className="text-line/30">·</span>
              <span>{dispute.category}</span>
              <span className="text-line/30">·</span>
              <span className="font-monospace font-bold text-content">{formatAmount(dispute.amount)}</span>
            </div>
          </div>

          {/* Main Contextual Case Statement Field */}
          <Section title="Description">
            <p className="text-xs sm:text-sm text-content-muted/90 leading-relaxed bg-surface-deep border border-line/10 rounded-xl px-4 py-3.5 font-medium">
              {dispute.description}
            </p>
          </Section>

          {/* Target Involved Entities Block Layout */}
          <Section title="Parties Involved">
            <InfoRow icon={<User size={13} />} label="Customer" value={dispute.customer} />
            <InfoRow icon={<Store size={13} />} label="Vendor" value={dispute.vendor} />
            <InfoRow icon={<Calendar size={13} />} label="Created" value={dispute.createdDate} isMono />
            <InfoRow icon={<MessageSquare size={13} />} label="Comments" value={String(dispute.comments)} isMono />
          </Section>

          {/* Operator Allocation Parameter Layer */}
          {dispute.assignedTo && (
            <Section title="Assignment">
              <InfoRow icon={<Tag size={13} />} label="Assigned to" value={dispute.assignedTo} />
            </Section>
          )}

          {/* Static Case Resolution Log Panel Banner */}
          {dispute.resolution && (
            <Section title="Resolution Summary">
              <div className="bg-lime/5 border border-lime/10 rounded-xl px-4 py-3.5 flex items-start gap-3">
                <CheckCircle size={14} className="text-lime mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm font-medium text-content-muted/90 leading-normal">{dispute.resolution}</p>
              </div>
            </Section>
          )}

          {/* Core Interactive Workspace Textarea Input Shell */}
          {dispute.status !== "Resolved" && showResolveForm && (
            <Section title="Add Resolution Details">
              <textarea
                value={resolution}
                onChange={e => setResolution(e.target.value)}
                placeholder="Describe how this platform dispute was handled/resolved..."
                rows={3}
                className="w-full bg-surface-deep border border-line/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-content outline-none! ring-0! transition resize-none placeholder:text-content-muted/30 font-medium leading-relaxed"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleResolve}
                  disabled={!resolution.trim()}
                  className="flex-1 bg-lime hover:opacity-90 disabled:opacity-40 text-content text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer shadow-xs" >
                  Confirm Resolution
                </button>
                <button
                  onClick={() => setShowResolveForm(false)}
                  className="px-4 text-xs font-bold uppercase tracking-wider text-content-muted hover:text-content transition-colors cursor-pointer" >
                  Cancel
                </button>
              </div>
            </Section>
          )}
        </div>

        {/* ── Operational Control Footer Menu Layout ── */}
        {dispute.status !== "Resolved" && !showResolveForm && (
          <div className="px-6 py-4 border-t border-line/10 bg-surface-deep/30 flex gap-3 shrink-0">
            <button
              onClick={() => setShowResolveForm(true)}
              className="flex-1 bg-lime hover:opacity-90 text-content text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all shadow-xs cursor-pointer" >
              Resolve Dispute
            </button>
            {dispute.status !== "Escalated" && (
              <button
                onClick={() => { onEscalate(dispute.id); onClose(); }}
                className="flex-1 border border-orange-400/20 bg-orange-400/5 hover:bg-orange-400/10 text-orange-400 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs" >
                <AlertCircle size={13} className="shrink-0" />
                <span>Escalate</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full">
      <p className="text-[10px] font-bold tracking-widest text-content-muted/40 uppercase mb-3">{title}</p>
      <div className="flex flex-col gap-2 w-full">{children}</div>
    </div>
  );
}

function InfoRow({ 
  icon, label, value, isMono = false 
}: { 
  icon: React.ReactNode; label: string; value: string; isMono?: boolean 
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-line/5 last:border-0 min-w-0">
      <span className="text-content-muted/40 shrink-0">{icon}</span>
      <span className="text-[11px] font-semibold text-content-muted/50 w-24 shrink-0 uppercase tracking-wider">{label}</span>
      <span className={cn(
        "text-xs font-bold text-content truncate flex-1",
        isMono ? "font-monospace" : ""
      )}>
        {value}
      </span>
    </div>
  );
}