"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import type { Vendor } from "./vendor.types";
import { Button, Textarea } from "@/components/ui";

interface SuspendModalProps {
  vendor: Vendor | null;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function SuspendModal({ vendor, onClose, onConfirm }: SuspendModalProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!vendor) setReason("");
  }, [vendor]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (vendor) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [vendor, onClose]);

  if (!vendor) return null;

  const canSubmit = reason.trim().length >= 10;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-xs px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md bg-panel rounded-2xl border border-line/15 shadow-pop animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-line/15">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={16} className="text-orange-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-content">Suspend Vendor</h2>
              <p className="text-xs text-content-muted mt-0.5">
                This will immediately restrict <span className="font-semibold text-content">{vendor.name}</span> from the platform.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 rounded-lg text-content-muted hover:bg-surface-deep shrink-0">
            <X size={14} />
          </Button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-widest font-bold text-content-muted mb-2">
              Reason for suspension <span className="text-coral">*</span>
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe why this vendor is being suspended. This will be recorded and may be shared with the vendor..."
              rows={4}
              className="w-full text-sm text-content bg-surface-deep border border-line/20 px-3.5 py-3 placeholder:text-content-muted/30 resize-none outline-none! ring-0! focus:border-orange-300 focus:ring-1 focus:ring-orange-200 transition-all"
            />
            <div className="flex items-center justify-between mt-1.5">
              <p className={`text-[10px] font-medium ${reason.trim().length < 10 && reason.length > 0 ? "text-coral" : "text-content-muted/50"}`}>
                {reason.trim().length < 10 ? `${10 - reason.trim().length} more characters required` : "✓ Reason looks good"}
              </p>
              <p className="text-[10px] text-content-muted/40">{reason.length}/500</p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-xl p-3.5">
            <p className="text-[11px] text-orange-700 leading-relaxed font-medium">
              The vendor's storefront will be hidden from students and all active listings will be paused. You can reactivate them at any time.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex gap-2.5">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-line/20 text-xs font-bold uppercase tracking-widest text-content-muted hover:text-content">
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!canSubmit}
            onClick={() => canSubmit && onConfirm(reason.trim())}
            className="flex-1 h-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs">
            Suspend Vendor
          </Button>
        </div>
      </div>
    </div>
  );
}