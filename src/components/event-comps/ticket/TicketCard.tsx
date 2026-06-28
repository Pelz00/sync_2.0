"use client"

import { Ticket } from "@/lib/event"
import { Minus, Plus, Ticket as TicketIcon } from "lucide-react"
import { TbCurrencyNaira } from "react-icons/tb"

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
            className={`w-full rounded-xl border bg-panel shadow-card transition-all relative overflow-hidden ${
                selected
                    ? "border-lime shadow-[2px_2px_0px_0px_rgba(197,255,74,0.4)]"
                    : "border-line/10 hover:border-line/30"
            }`}
        >
            {/* Lime accent bar at top when selected */}
            {selected && (
                <div className="h-1 w-full bg-lime" />
            )}

            <div className="px-5 py-4 flex items-start justify-between gap-4">

                {/* Left — ticket info */}
                <div className="flex items-start gap-3 min-w-0">
                    <div className={`mt-0.5 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selected ? "bg-lime text-ink" : "bg-content-muted/10 text-content-muted"
                    }`}>
                        <TicketIcon size={16} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                        <h2 className="font-bold text-base text-content">{ticket.name}</h2>
                        <p className="text-xs text-content-muted mt-0.5">{ticket.desc}</p>
                        <p className="flex items-center font-black text-lg text-content mt-2">
                            <TbCurrencyNaira className="text-xl" />
                            {ticket.price.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Right — stepper */}
                <div className="flex items-center gap-2 flex-shrink-0 border border-line/20 rounded-full px-2 py-1.5 bg-surface">
                    <button
                        type="button"
                        onClick={onDecrease}
                        disabled={quantity === 0}
                        aria-label={`Decrease ${ticket.name} quantity`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-content border border-line/20 hover:bg-content-muted/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                    >
                        <Minus size={13} />
                    </button>
                    <span className="w-5 text-center font-bold text-sm text-content">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={onIncrease}
                        aria-label={`Increase ${ticket.name} quantity`}
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-lime text-ink hover:scale-105 cursor-pointer transition"
                    >
                        <Plus size={13} />
                    </button>
                </div>
            </div>

            {/* Selected qty badge bottom-right */}
            {selected && (
                <div className="px-5 pb-3 flex justify-end">
                    <span className="text-xs font-semibold text-lime-deep dark:text-lime bg-lime/10 px-2 py-0.5 rounded-full border border-lime/20">
                        {quantity} selected · <TbCurrencyNaira className="inline" />{(ticket.price * quantity).toLocaleString()}
                    </span>
                </div>
            )}
        </div>
    )
}