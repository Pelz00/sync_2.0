"use client"

import Image from "next/image"
import { MapPin, Clock } from "lucide-react"
import { TbCurrencyNaira } from "react-icons/tb"
import { GoDotFill } from "react-icons/go"
import { Event, Ticket } from "@/lib/event"

const SERVICE_FEE_RATE = 0.05

interface OrderSummaryProps {
    event: Event
    tickets: Ticket[]
    quantities: Record<string, number>
    ctaLabel?: string
    onContinue?: () => void
}

export default function OrderSummary({
    event,
    tickets,
    quantities,
    ctaLabel,
    onContinue,
}: OrderSummaryProps) {
    const selectedTickets = tickets
        .map(t => ({ ticket: t, qty: quantities[t.id] ?? 0 }))
        .filter(t => t.qty > 0)

    const totalTickets = selectedTickets.reduce((sum, t) => sum + t.qty, 0)
    const subtotal = selectedTickets.reduce((sum, t) => sum + t.ticket.price * t.qty, 0)
    const serviceFee = totalTickets > 0 ? Math.round(subtotal * SERVICE_FEE_RATE) : 0
    const total = subtotal + serviceFee

    return (
        <aside className="lg:sticky lg:top-24 w-full rounded-xl border border-line/10 bg-panel shadow-card overflow-hidden">

            {/* Event image */}
            <div className="relative w-full h-36">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-lime text-ink text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    <GoDotFill className="animate-pulse" /> Tonight
                </div>
            </div>

            {/* Event info */}
            <div className="px-4 py-3 border-b border-line/10">
                <h2 className="font-bold text-base text-content leading-tight">{event.title}</h2>
                <div className="flex flex-col gap-1 mt-2">
                    <p className="flex items-center gap-1.5 text-xs text-content-muted">
                        <MapPin size={12} className="text-content-muted flex-shrink-0" />
                        {event.location}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-content-muted">
                        <Clock size={12} className="text-content-muted flex-shrink-0" />
                        {event.date} · {event.time}
                    </p>
                </div>
            </div>

            {/* Order breakdown */}
            <div className="px-4 py-3 flex flex-col gap-2">
                {totalTickets === 0 ? (
                    <p className="text-xs text-content-muted text-center py-3">
                        No tickets selected yet
                    </p>
                ) : (
                    <>
                        {selectedTickets.map(({ ticket, qty }) => (
                            <div key={ticket.id} className="flex justify-between text-sm">
                                <span className="text-content-muted">
                                    {ticket.name}
                                    <span className="text-content-muted/60 ml-1">× {qty}</span>
                                </span>
                                <span className="font-medium text-content flex items-center">
                                    <TbCurrencyNaira />{(ticket.price * qty).toLocaleString()}
                                </span>
                            </div>
                        ))}
                        <div className="flex justify-between text-sm">
                            <span className="text-content-muted">Service fee (5%)</span>
                            <span className="font-medium text-content flex items-center">
                                <TbCurrencyNaira />{serviceFee.toLocaleString()}
                            </span>
                        </div>
                    </>
                )}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-line/10">
                <span className="font-bold text-sm text-content">Total</span>
                <span className={`font-black text-xl flex items-center ${totalTickets > 0 ? "text-content" : "text-content-muted"}`}>
                    <TbCurrencyNaira />{total.toLocaleString()}
                </span>
            </div>

            {/* CTA */}
            {onContinue && (
                <div className="px-4 pb-4">
                    <button
                        type="button"
                        onClick={onContinue}
                        disabled={totalTickets === 0}
                        className="w-full bg-lime text-ink font-bold text-sm rounded-xl py-3 border-0 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none font-mono"
                    >
                        {ctaLabel ?? (
                            totalTickets === 0
                                ? "Select a ticket to continue"
                                : `Continue with ${totalTickets} ticket${totalTickets > 1 ? "s" : ""} →`
                        )}
                    </button>
                </div>
            )}
        </aside>
    )
}