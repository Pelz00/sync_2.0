// components/food-comps/StoreInfoModal.tsx
"use client"
import { X, MapPin, Clock, Phone, Mail, AlertCircle, CheckCircle } from "lucide-react"

export interface StoreInfo {
    address: string
    openingHours: { day: string; hours: string }[]
    phone?: string
    email?: string
    instagram?: string
    minOrder?: number
    hygieneRating?: number   // out of 5
    description?: string
}

interface Props {
    vendorName: string
    info: StoreInfo
    onClose: () => void
}

const TODAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]

export default function StoreInfoModal({ vendorName, info, onClose }: Props) {
    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center sm:px-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="bg-panel border border-content-muted/20 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[85vh]">

                {/* ── Header ───────────────────────────────────────────── */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-content-muted/20 flex-shrink-0">
                    <h2 className="font-bold text-lg text-content">Store information</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full border border-content-muted/30 flex items-center justify-center text-content-muted hover:text-content hover:border-content-muted transition cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* ── Scrollable body ───────────────────────────────────── */}
                <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-6">

                    {/* About */}
                    {info.description && (
                        <section>
                            <p className="eyebrow text-content-muted mb-2">About</p>
                            <p className="text-sm text-content-muted leading-relaxed">{info.description}</p>
                        </section>
                    )}

                    {/* Address */}
                    <section>
                        <p className="eyebrow text-content-muted mb-2">Address</p>
                        <div className="flex items-start gap-2">
                            <MapPin size={15} className="text-lime-deep dark:text-lime mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-content">{info.address}</p>
                        </div>
                    </section>

                    {/* Opening hours */}
                    <section>
                        <p className="eyebrow text-content-muted mb-2">Opening hours</p>
                        <div className="flex flex-col gap-1.5">
                            {info.openingHours.map(({ day, hours }) => {
                                const isToday = day === TODAY
                                return (
                                    <div
                                        key={day}
                                        className={`flex justify-between items-center text-sm px-3 py-2 rounded-lg ${isToday
                                            ? "bg-lime/10 border border-lime/30"
                                            : "hover:bg-content-muted/5"
                                            }`}
                                    >
                                        <span className={`${isToday ? "font-bold text-content" : "text-content-muted"}`}>
                                            {day}
                                            {isToday && (
                                                <span className="ml-2 text-[10px] bg-lime text-ink px-1.5 py-0.5 rounded-full font-bold">
                                                    Today
                                                </span>
                                            )}
                                        </span>
                                        <span className={`${isToday ? "font-bold text-content" : "text-content-muted"} flex items-center gap-1`}>
                                            <Clock size={12} />
                                            {hours}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    {/* Contact */}
                    {(info.phone || info.email || info.instagram) && (
                        <section>
                            <p className="eyebrow text-content-muted mb-2">Contact</p>
                            <div className="flex flex-col gap-2">
                                {info.phone && (
                                    <a
                                        href={`tel:${info.phone}`}
                                        className="flex items-center gap-2 text-sm text-content hover:text-lime-deep dark:hover:text-lime transition"
                                    >
                                        <Phone size={15} className="text-content-muted flex-shrink-0" />
                                        {info.phone}
                                    </a>
                                )}
                                {info.email && (
                                    <a
                                        href={`mailto:${info.email}`}
                                        className="flex items-center gap-2 text-sm text-content hover:text-lime-deep dark:hover:text-lime transition"
                                    >
                                        <Mail size={15} className="text-content-muted flex-shrink-0" />
                                        {info.email}
                                    </a>
                                )}
                                {info.instagram && (
                                    <a
                                        href={`https://instagram.com/${info.instagram.replace("@", "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-content hover:text-lime-deep dark:hover:text-lime transition"
                                    >
                                        {/* <Instagram size={15} className="text-content-muted flex-shrink-0" /> */}
                                        {info.instagram}
                                    </a>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Hygiene + min order */}
                    <section>
                        <p className="eyebrow text-content-muted mb-2">More details</p>
                        <div className="flex flex-col gap-2">
                            {info.minOrder && (
                                <div className="flex items-center gap-2 text-sm">
                                    <AlertCircle size={15} className="text-content-muted flex-shrink-0" />
                                    <span className="text-content-muted">Minimum order:</span>
                                    <span className="font-semibold text-content">₦{info.minOrder.toLocaleString()}</span>
                                </div>
                            )}
                            {info.hygieneRating && (
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle size={15} className="text-lime-deep dark:text-lime flex-shrink-0" />
                                    <span className="text-content-muted">Hygiene rating:</span>
                                    <span className="font-semibold text-content">
                                        {"★".repeat(info.hygieneRating)}{"☆".repeat(5 - info.hygieneRating)}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle size={15} className="text-lime-deep dark:text-lime flex-shrink-0" />
                                <span className="text-content-muted">Verified by</span>
                                <span className="font-semibold text-content">Sync ✓</span>
                            </div>
                        </div>
                    </section>

                </div>

                {/* ── Footer button ─────────────────────────────────────── */}
                <div className="px-5 py-4 border-t border-content-muted/20 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full bg-lime text-ink font-bold text-sm border-2 border-black rounded-xl py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer font-mono"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    )
}