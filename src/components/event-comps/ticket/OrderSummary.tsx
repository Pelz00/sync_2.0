"use client"

import Image from "next/image"
import { Event, Ticket } from "@/lib/event"

const SERVICE_FEE_RATE = 0.05 // 5% service fee — adjust to match your real pricing rule

interface OrderSummaryProps {
    event: Event
    tickets: Ticket[]
    quantities: Record<string, number>
    /** Label for the CTA button. Defaults to a sensible "Continue" message. */
    ctaLabel?: string
    /** Called when the CTA is clicked. Omit to render no button at all. */
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
        <aside className="lg:sticky lg:top-24 rounded-2xl border border-line bg-panel overflow-hidden">
            {/* Event Image */}
            <div className="relative h-40 sm:h-48 w-full">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-black text-content leading-tight">
                    {event.title}
                </h2>

                <p className="mt-2 text-sm text-content-muted">
                    {event.location}
                </p>

                <p className="text-sm text-content-muted">
                    {event.date} • {event.time}
                </p>

                <div className="my-5 h-px bg-line" />

                {totalTickets === 0 ? (
                    <p className="text-sm text-content-muted text-center py-2">
                        No tickets selected yet
                    </p>
                ) : (
                    <div className="space-y-2.5">
                        {selectedTickets.map(({ ticket, qty }) => (
                            <div key={ticket.id} className="flex justify-between text-sm">
                                <span className="text-content-muted">
                                    {ticket.name} <span className="text-content-muted/70">× {qty}</span>
                                </span>
                                <span className="text-content font-medium">
                                    ₦{(ticket.price * qty).toLocaleString()}
                                </span>
                            </div>
                        ))}

                        <div className="flex justify-between text-sm pt-1">
                            <span className="text-content-muted">Subtotal</span>
                            <span className="text-content font-medium">₦{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-content-muted">Service Fee</span>
                            <span className="text-content font-medium">₦{serviceFee.toLocaleString()}</span>
                        </div>
                    </div>
                )}

                <div className="my-5 h-px bg-line" />

                <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-semibold text-content">
                        Total
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-lime">
                        ₦{total.toLocaleString()}
                    </span>
                </div>

                {onContinue && (
                    <button
                        type="button"
                        onClick={onContinue}
                        disabled={totalTickets === 0}
                        className="mt-5 w-full rounded-xl bg-lime py-3.5 font-bold text-ink transition disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:opacity-90 enabled:cursor-pointer"
                    >
                        {ctaLabel ??
                            (totalTickets === 0
                                ? "Select a ticket to continue"
                                : `Continue with ${totalTickets} ticket${totalTickets > 1 ? "s" : ""}`)}
                    </button>
                )}
            </div>
        </aside>
    )
}