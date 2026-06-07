"use client";
import { useEffect, useState } from "react";
import { X, Plus, CheckCircle } from "lucide-react";
import { Input, Textarea } from "@/components/ui";

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
  category:  string;
}

const INITIAL: NewVisitForm = {
  vendor: "", vendorId: "", date: "", time: "", location: "", inspector: "", notes: "", category: "",
};

const INSPECTORS = ["Inspector John Doe", "Inspector Jane Smith", "Inspector Mike Johnson"];
const CATEGORIES = ["Food & Grocery", "Food & Canteen", "Convenience Store", "Pharmacy", "Electronics", "Clothing"];

export function ScheduleVisitModal({ open, onClose, onSave }: ScheduleVisitModalProps) {
  const [form, setForm] = useState<NewVisitForm>(INITIAL);
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => { setForm(INITIAL); setSubmitted(false); onClose(); }, 300);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") handleClose(); }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function handleSave() {
    if (!form.vendor || !form.inspector || !form.location) return;

    //live date + time at click
    const now = new Date();
    const liveDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const liveTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    // Pass data to parent — swap this for await api.post(...) when backend is ready
    onSave({ ...form, date: liveDate, time: liveTime });

    // Show confirmation state, then close
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
      className={[
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "transition-all duration-300 ease-in-out",
        isVisible ? "bg-black/50 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none",
      ].join(" ")}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }} >
      <div
        className={[
          "bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col max-h-[92vh] overflow-hidden",
          "transition-all duration-300 ease-out",
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6",
        ].join(" ")}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-gray-900">Schedule New Visit</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Fill in the details to schedule a vendor verification
            </p>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Success state */}
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 py-12">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle size={28} className="text-[#7abf00]" />
            </div>
            <p className="text-base font-black text-gray-900">Visit scheduled</p>
            <p className="text-sm text-gray-400 text-center">
              Added to the visits list. Connect your backend to persist this.
            </p>
          </div>
        ) : (
          <>
            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
              <Field label="Vendor Name *">
                <Input
                  value={form.vendor}
                  onChange={e => field("vendor", e.target.value)}
                  placeholder="e.g. Fresh Foods Market"
                  className={`outline-none! ring-0! ${inputCls}`} />
              </Field>

              <Field label="Vendor ID">
                <Input
                  value={form.vendorId}
                  onChange={e => field("vendorId", e.target.value)}
                  placeholder="e.g. VEN-2843"
                  className={`outline-none! ring-0! ${inputCls}`} />
              </Field>

              <Field label="Category">
                <select
                  value={form.category}
                  onChange={e => field("category", e.target.value)}
                  className={`outline-none! ring-0! ${inputCls}`} >
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Location *">
                <Input
                  value={form.location}
                  onChange={e => field("location", e.target.value)}
                  placeholder="e.g. 12 Marina Street, Lagos"
                  className={`outline-none! ring-0! ${inputCls}`} />
              </Field>

              <Field label="Assigned Inspector *">
                <select
                  value={form.inspector}
                  onChange={e => field("inspector", e.target.value)}
                  className={`outline-none! ring-0! ${inputCls}`} >
                  <option value="">Select inspector</option>
                  {INSPECTORS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </Field>

              <Field label="Notes">
                <Textarea
                  value={form.notes}
                  onChange={e => field("notes", e.target.value)}
                  placeholder="Add any relevant notes..."
                  rows={3}
                  className={`outline-none! ring-0! ${inputCls} resize-none`} />
              </Field>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={handleSave}
                disabled={!isValid}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#7abf00] to-[#90d505] hover:from-[#6aaf00] disabled:opacity-50 text-white text-sm font-bold py-2.5 rounded-xl transition-all active:scale-95 shadow-sm" >
                <Plus size={15} />
                Schedule Visit
              </button>
              <button
                onClick={handleClose}
                className="px-5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors" >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#90d505] focus:ring-2 focus:ring-[#90d505]/20 bg-white transition-all placeholder:text-gray-400";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}