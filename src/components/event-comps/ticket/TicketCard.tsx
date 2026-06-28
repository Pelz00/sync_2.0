"use client"

import { Ticket } from "@/lib/event"
import { Minus, Plus } from "lucide-react"

interface TicketCardProps {
    ticket: Ticket
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
}

export default function TicketCard({
    ticket,
    quantity,
    onIncrease,
    onDecrease,
}: TicketCardProps) {
    const selected = quantity > 0

    return (
        <div
            className={`rounded-2xl border bg-panel p-5 sm:p-6 transition-all hover:-translate-y-0.5 ${selected ? "border-lime" : "border-line"
                }`}
        >
            <div className="flex items-start justify-between gap-4 sm:gap-6">
                <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-content">
                        {ticket.name}
                    </h2>

                    <p className="mt-1.5 text-sm text-content-muted">
                        {ticket.desc}
                    </p>

                    <p className="mt-4 text-2xl sm:text-3xl font-black text-lime">
                        ₦{ticket.price.toLocaleString()}
                    </p>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-2.5 py-2 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onDecrease}
                        disabled={quantity === 0}
                        aria-label={`Decrease ${ticket.name} quantity`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-panel transition hover:bg-lime/20 disabled:opacity-40 disabled:hover:bg-panel cursor-pointer disabled:cursor-not-allowed"
                    >
                        <Minus size={16} />
                    </button>

                    <span className="w-5 text-center font-bold text-content">
                        {quantity}
                    </span>

                    <button
                        type="button"
                        onClick={onIncrease}
                        aria-label={`Increase ${ticket.name} quantity`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime text-ink transition hover:scale-105 cursor-pointer"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}