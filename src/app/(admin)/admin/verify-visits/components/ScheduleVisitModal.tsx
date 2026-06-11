"use client";

import { useEffect, useState } from "react";
import { X, Plus, CheckCircle } from "lucide-react";
import { Input, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ScheduleVisitModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: NewVisitForm) => void;
}

export interface NewVisitForm {
  vendor: string;
  vendorId: string;
  date: string;
  time: string;
  location: string;
  inspector: string;
  notes: string;
  category: string;
}

const INITIAL: NewVisitForm = {
  vendor: "", vendorId: "", date: "", time: "", location: "", inspector: "", notes: "", category: "",
};

const INSPECTORS = ["Inspector Adegbite Pelumi", "Inspector Gaf Muiz", "Inspector Pop Loner"];
const CATEGORIES = ["Food & Grocery", "Food & Canteen", "Convenience Store", "Pharmacy", "Electronics", "Clothing"];

export function ScheduleVisitModal({ open, onClose, onSave }: ScheduleVisitModalProps) {
  const [form, setForm] = useState<NewVisitForm>(INITIAL);
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Animation layout phase entry tracking hooks
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => { 
      setForm(INITIAL); 
      setSubmitted(false); 
      onClose(); 
    }, 200);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") handleClose(); }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function handleSave() {
    if (!form.vendor || !form.inspector || !form.location) return;

    const now = new Date();
    const liveDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const liveTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    onSave({ ...form, date: liveDate, time: liveTime });

    setSubmitted(true);
    setTimeout(() => handleClose(), 1500);
  }

  function field(key: keyof NewVisitForm, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  if (!open) return null;

  const isValid = form.vendor && form.inspector && form.location;

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
          "bg-panel border border-line/15 rounded-xl shadow-pop w-full max-w-md flex flex-col max-h-[85vh] overflow-hidden origin-center",
          "transition-all duration-200 ease-out",
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-98 translate-y-2",
        )}>
        
        {/* Header Block */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-line/15 shrink-0">
          <div>
            <h2 className="text-base font-display font-semibold text-content tracking-tight">Schedule New Visit</h2>
            <p className="text-xs text-content-muted/80 mt-0.5">
              Fill in the details to schedule a vendor verification
            </p>
          </div>
          <button 
            type="button"
            onClick={handleClose} 
            className="p-1.5 rounded-lg text-content-muted/60 hover:text-content hover:bg-surface-deep border border-line/15 transition-colors cursor-pointer" >
            <X size={15} />
          </button>
        </div>

        {/* Success state */}
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 py-12 bg-panel">
            <div className="w-14 h-14 rounded-full bg-surface-deep border border-line/15 flex items-center justify-center animate-bounce">
              <CheckCircle size={28} className="text-lime" />
            </div>
            <p className="text-sm font-semibold text-content">Visit scheduled</p>
            <p className="text-xs text-content-muted/80 text-center max-w-xs">
              Added to the visits list. Connect your backend to persist this.
            </p>
          </div>
        ) : (
          <>
            {/* Input Fields Wrapper */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5 CustomScrollbar bg-panel">
              <Field label="Vendor Name">
                <Input
                  type="text"
                  value={form.vendor}
                  onChange={e => field("vendor", e.target.value)}
                  placeholder="e.g. Fresh Foods Market"
                  className="w-full bg-surface-deep/40 border-line/15 text-xs text-content placeholder:text-content-muted/50 h-9 transition-colors focus:border-line/40 focus:bg-surface-deep/70" />
              </Field>

              <Field label="Vendor ID">
                <Input
                  type="text"
                  value={form.vendorId}
                  onChange={e => field("vendorId", e.target.value)}
                  placeholder="e.g. VEN-2843"
                  className="w-full bg-surface-deep/40 border-line/15 text-xs text-content placeholder:text-content-muted/50 h-9 transition-colors focus:border-line/40 focus:bg-surface-deep/70" />
              </Field>

              <Field label="Category">
                <Select value={form.category} onValueChange={val => field("category", val)}>
                  <SelectTrigger className="w-full h-9 bg-surface-deep/40 border-line/15 text-xs focus:border-line/40 focus:bg-surface-deep/70 focus:ring-0">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="w-[--radix-select-trigger-width]">
                    {CATEGORIES.map(c => (
                      <SelectItem key={c} value={c} className="text-xs">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Location">
                <Input
                  type="text"
                  value={form.location}
                  onChange={e => field("location", e.target.value)}
                  placeholder="e.g. 12 Marina Street, Lagos"
                  className="w-full bg-surface-deep/40 border-line/15 text-xs text-content placeholder:text-content-muted/50 h-9 transition-colors focus:border-line/40 focus:bg-surface-deep/70" />
              </Field>

              <Field label="Assigned Inspector">
                <Select value={form.inspector} onValueChange={val => field("inspector", val)}>
                  <SelectTrigger className="w-full h-9 bg-surface-deep/40 border-line/15 text-xs focus:border-line/40 focus:bg-surface-deep/70 focus:ring-0">
                    <SelectValue placeholder="Select inspector" />
                  </SelectTrigger>
                  <SelectContent className="w-[--radix-select-trigger-width]">
                    {INSPECTORS.map(i => (
                      <SelectItem key={i} value={i} className="text-xs">
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Notes">
                <Textarea
                  value={form.notes}
                  onChange={e => field("notes", e.target.value)}
                  placeholder="Add any relevant notes..."
                  rows={3}
                  className="w-full bg-surface-deep/40 border-line/15 rounded-md px-3 py-2 text-xs text-content placeholder:text-content-muted/50 resize-none transition-colors outline-none! ring-0!" />
              </Field>
            </div>

            {/* Form Control Strip */}
            <div className="px-6 py-4 border-t border-line/15 flex items-center gap-2 shrink-0 bg-surface-deep/10">
              <Button
                type="button"
                size="sm"
                onClick={handleSave}
                disabled={!isValid}
                className="flex-1 bg-lime text-ink font-semibold hover:opacity-90 transition-opacity h-9 shadow-sm gap-2 disabled:opacity-40 disabled:cursor-not-allowed" >
                <Plus size={15} />
                Schedule Visit
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClose}
                className="bg-panel border-line/15 text-content hover:bg-surface-deep px-4 h-9 cursor-pointer" >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  ); 
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] uppercase tracking-widest font-bold text-content-muted/90">
        {label}
      </label>
      {children}
    </div>
  );
}