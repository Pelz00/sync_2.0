"use client";

import { useState, useEffect } from "react";
import { Siren, X, CheckCircle2 } from "lucide-react";
import type { Landlord } from "../../landlords-components/landlord.types";
import { Button, Textarea } from "@/components/ui";

interface ReportPoliceModalProps {
  landlord: Landlord | null;
  onClose: () => void;
}

export function ReportPoliceModal({ landlord, onClose }: ReportPoliceModalProps) {
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!landlord) { setDetails(""); setSubmitted(false); }
  }, [landlord]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (landlord) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [landlord, onClose]);

  if (!landlord) return null;

  const canSubmit = details.trim().length >= 15;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-xs px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md bg-panel rounded-2xl border border-line/15 shadow-pop animate-in fade-in zoom-in-95 duration-200">

        {submitted ? (
          <div className="p-8 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={22} className="text-green-600" />
            </div>
            <h2 className="text-sm font-bold text-content">Report filed</h2>
            <p className="text-xs text-content-muted leading-relaxed max-w-xs">
              Your report on <span className="font-semibold text-content">{landlord.name}</span> has been logged and forwarded for follow-up.
            </p>
            <Button type="button" onClick={onClose} className="mt-2 h-9 px-6 rounded-xl bg-surface-deep text-content font-semibold text-xs">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between p-5 border-b border-line/15">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Siren size={16} className="text-coral" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-content">Report to Police</h2>
                  <p className="text-xs text-content-muted mt-0.5">
                    File a fraud/scam report on <span className="font-semibold text-content">{landlord.name}</span> ({landlord.landlordId}).
                  </p>
                </div>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 rounded-lg text-content-muted hover:bg-surface-deep shrink-0">
                <X size={14} />
              </Button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-bold text-content-muted mb-2">
                  Incident details <span className="text-coral">*</span>
                </label>
                <Textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe the suspected fraud, scam, or unsafe conduct, including any evidence..."
                  rows={5}
                  className="w-full text-sm text-content bg-surface-deep border border-line/20 px-3.5 py-3 placeholder:text-content-muted/30 resize-none outline-none! ring-0! focus:border-coral/40 focus:ring-1 focus:ring-coral/20 transition-all"
                />
                <p className="text-[10px] text-content-muted/40 mt-1.5">{details.length}/1000</p>
              </div>
              <div className="bg-surface-deep/60 border border-line/15 rounded-xl p-3.5">
                <p className="text-[11px] text-content-muted/70 leading-relaxed">
                  This report will be logged against the landlord's record along with your admin account and timestamp.
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 flex gap-2.5">
              <Button type="button" variant="ghost" onClick={onClose} className="flex-1 h-10 rounded-xl border border-line/20 text-xs font-bold uppercase tracking-widest text-content-muted hover:text-content">
                Cancel
              </Button>
              <Button
                type="button"
                disabled={!canSubmit}
                onClick={() => canSubmit && setSubmitted(true)}
                className="flex-1 h-10 rounded-xl bg-coral hover:opacity-90 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs">
                File Report
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
