"use client";

import { Mail, Phone, MapPin, Star, ShieldCheck, Clock } from "lucide-react";
import { VendorStatusBadge } from "./VendorStatusBadge";
import { VendorRowMenu }     from "./VendorRowMenu";
import { formatRevenue }     from "./vendor.constants";
import type { Vendor }       from "./vendor.types";
import { cn }                from "@/lib/utils";

interface VendorTableProps {
  vendors:     Vendor[];
  onView:      (v: Vendor) => void;
  onActivate:  (v: Vendor) => void;
  onSuspend:   (v: Vendor) => void;
  onDelete:    (v: Vendor) => void;
}

/**
 * VendorTable
 * Full data table — desktop view with all columns.
 * On mobile collapses to a card-per-row layout.
 */
export function VendorTable({
  vendors, onView, onActivate, onSuspend, onDelete,
}: VendorTableProps) {
  if (vendors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-surface-deep/40 border border-line/15 rounded-xl">
        <p className="text-content-muted/80 font-medium text-xs uppercase tracking-widest">No vendors match your search.</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Desktop table view matrix system framework layout ── */}
      <div className="hidden md:block bg-panel border border-line/15 rounded-xl overflow-hidden transition-colors duration-300">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line/15 bg-surface-deep/40 select-none">
              {["VENDOR", "CONTACT", "LOCATION", "STATUS", "ORDERS", "REVENUE", "RATING", "ACTIONS"].map(h => (
                <th
                  key={h}
                  className="text-left text-[11px] uppercase tracking-widest font-bold text-content-muted/80 px-5 py-3.5" >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line/10">
            {vendors.map(vendor => (
              <tr
                key={vendor.id}
                className="hover:bg-surface-deep/60 transition-colors group cursor-pointer"
                onClick={() => onView(vendor)} >
                {/* Vendor name + structural layout identity ID block metadata */}
                <td className="px-5 py-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-content group-hover:text-green-700 transition-colors">
                        {vendor.name}
                      </span>
                      {vendor.isVerified ? (
                        <ShieldCheck size={13} className="text-green-700 shrink-0" />
                      ) : (
                        <Clock size={13} className="text-orange-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] font-mono font-medium text-content-muted/50 mt-0.5">{vendor.vendorId}</p>
                  </div>
                </td>

                {/* Contact communication stack parameters array */}
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-0.5 max-w-[180px]">
                    <span className="flex items-center gap-1.5 text-xs text-content truncate font-medium">
                      <Mail size={11} className="text-content-muted/50 shrink-0" />
                      {vendor.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-content-muted/70 truncate">
                      <Phone size={11} className="text-content-muted/40 shrink-0" />
                      {vendor.phone}
                    </span>
                  </div>
                </td>

                {/* Location metadata framework indicator slot view layout */}
                <td className="px-5 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-content">
                    <MapPin size={12} className="text-content-muted/50 shrink-0" />
                    {vendor.location}
                  </span>
                </td>

                {/* Compliance System Status Badges tracking layer output */}
                <td className="px-5 py-4">
                  <VendorStatusBadge status={vendor.status} />
                </td>

                {/* Volume Orders execution transactions unit dynamic formatting */}
                <td className="px-5 py-4 text-xs font-mono font-bold text-content">
                  {vendor.orders.toLocaleString()}
                </td>

                {/* Monetary Metrics Gross Financial Performance Revenue matrix tracking */}
                <td className="px-5 py-4 text-xs font-mono font-bold text-content">
                  {formatRevenue(vendor.revenue)}
                </td>

                {/* Platform review rating algorithmic system weight indicators list row layout */}
                <td className="px-5 py-4">
                  {vendor.rating !== null ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-content">
                      {vendor.rating}
                      <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-content-muted/50">N/A</span>
                  )}
                </td>

                {/* Actions context navigation trigger dropdown layout wrapper execution */}
                <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                  <VendorRowMenu
                    vendor={vendor}
                    onView={onView}
                    onActivate={onActivate}
                    onSuspend={onSuspend}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile layout  ── */}
      <div className="md:hidden flex flex-col gap-3">
        {vendors.map(vendor => (
          <div
            key={vendor.id}
            className="bg-panel border border-line/15 rounded-xl p-4 cursor-pointer hover:bg-surface-deep/40 transition-all shadow-xs"
            onClick={() => onView(vendor)} >
            <div className="flex items-start justify-between mb-3.5 gap-2">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-bold text-content group-hover:text-green-700 transition-colors">{vendor.name}</span>
                  {vendor.isVerified && <ShieldCheck size={13} className="text-green-700 shrink-0" />}
                </div>
                <p className="text-[10px] font-mono font-medium text-content-muted/50 mt-0.5">{vendor.vendorId}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                <VendorStatusBadge status={vendor.status} />
                <VendorRowMenu
                  vendor={vendor}
                  onView={onView}
                  onActivate={onActivate}
                  onSuspend={onSuspend}
                  onDelete={onDelete}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-content-muted/90 border-t border-line/10 pt-3">
              <span className="flex items-center gap-2 truncate"><Mail size={12} className="text-content-muted/40 shrink-0" />{vendor.email}</span>
              <span className="flex items-center gap-2 truncate"><Phone size={12} className="text-content-muted/40 shrink-0" />{vendor.phone}</span>
              <span className="flex items-center gap-2 truncate"><MapPin size={12} className="text-content-muted/40 shrink-0" />{vendor.location}</span>
              {vendor.rating !== null ? (
                <span className="flex items-center gap-1 font-semibold text-content">
                  <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" /> {vendor.rating} <span className="text-[10px] text-content-muted/50 font-normal">Rating</span>
                </span>
              ) : (
                <span className="text-content-muted/40 flex items-center gap-1"><Star size={12} className="shrink-0" /> No rating</span>
              )}
            </div>

            <div className="flex items-center gap-4 mt-3.5 pt-3.5 border-t border-line/15 text-[11px] text-content-muted/70">
              <span className="font-medium"><span className="font-mono font-bold text-content text-xs mr-0.5">{vendor.orders.toLocaleString()}</span> orders</span>
              <span className="font-medium"><span className="font-mono font-bold text-content text-xs mr-0.5">{formatRevenue(vendor.revenue)}</span> revenue</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}