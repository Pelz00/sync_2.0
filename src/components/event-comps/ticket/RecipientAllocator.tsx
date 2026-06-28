"use client"

import { useState } from "react"
import { Plus, Trash2, User, AlertCircle, CheckCircle2 } from "lucide-react"
import { Ticket } from "@/lib/event"

export interface Recipient {
    id: string
    name: string
    email: string
    /** ticketId -> quantity assigned to this recipient */
    allocations: Record<string, number>
}

interface RecipientAllocatorProps {
    tickets: Ticket[]
    /** Total purchased quantity per ticket id — the pool being divided up. */
    quantities: Record<string, number>
    purchaserName: string
    purchaserEmail: string
    value: Recipient[]
    onChange: (next: Recipient[]) => void
}

function makeId() {
    return Math.random().toString(36).slice(2, 10)
}

/** How many of `ticketId` are still unassigned across all recipients. */
function remainingFor(
    ticketId: string,
    quantities: Record<string, number>,
    recipients: Recipient[],
): number {
    const total = quantities[ticketId] ?? 0
    const assigned = recipients.reduce((sum, r) => sum + (r.allocations[ticketId] ?? 0), 0)
    return total - assigned
}

export default function RecipientAllocator({
    tickets,
    quantities,
    purchaserName,
    purchaserEmail,
    value,
    onChange,
}: RecipientAllocatorProps) {
    const ticketsWithQty = tickets.filter(t => (quantities[t.id] ?? 0) > 0)

    function addRecipient() {
        onChange([
            ...value,
            { id: makeId(), name: "", email: "", allocations: {} },
        ])
    }

    function removeRecipient(id: string) {
        onChange(value.filter(r => r.id !== id))
    }

    function updateRecipient(id: string, patch: Partial<Recipient>) {
        onChange(value.map(r => (r.id === id ? { ...r, ...patch } : r)))
    }

    function setAllocation(recipientId: string, ticketId: string, qty: number) {
        const recipient = value.find(r => r.id === recipientId)
        if (!recipient) return

        const currentForThisTicket = recipient.allocations[ticketId] ?? 0
        const remaining = remainingFor(ticketId, quantities, value) + currentForThisTicket
        const clamped = Math.max(0, Math.min(qty, remaining))

        updateRecipient(recipientId, {
            allocations: { ...recipient.allocations, [ticketId]: clamped },
        })
    }

    // Fully assigned only when every ticket type has zero remaining.
    const fullyAssigned = ticketsWithQty.every(
        t => remainingFor(t.id, quantities, value) === 0,
    )

    return (
        <div className="rounded-2xl border border-line bg-panel p-5 sm:p-6 space-y-5">
            <div>
                <h2 className="font-bold text-content">Who are these tickets for?</h2>
                <p className="text-sm text-content-muted mt-1">
                    Split your tickets across one or more people. You can keep them all for
                    yourself, or send some to friends — mix and match any ticket type.
                </p>
            </div>

            {/* Live status: what's left to assign, per ticket type */}
            <div className="flex flex-wrap gap-2">
                {ticketsWithQty.map(t => {
                    const remaining = remainingFor(t.id, quantities, value)
                    return (
                        <span
                            key={t.id}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                                remaining === 0
                                    ? "bg-lime/15 text-lime-deep dark:text-lime"
                                    : "bg-content-muted/10 text-content-muted"
                            }`}
                        >
                            {remaining === 0 ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                            {t.name}: {remaining === 0 ? "all assigned" : `${remaining} left`}
                        </span>
                    )
                })}
            </div>

            <div className="space-y-4">
                {value.map((recipient, idx) => {
                    const isFirst = idx === 0
                    return (
                        <div
                            key={recipient.id}
                            className="rounded-xl border border-line bg-surface p-4 sm:p-5 space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <User size={14} className="text-lime-deep dark:text-lime" />
                                    <h3 className="font-semibold text-sm text-content">
                                        Recipient {idx + 1}
                                        {isFirst && (
                                            <span className="text-content-muted font-normal"> (you, by default)</span>
                                        )}
                                    </h3>
                                </div>
                                {!isFirst && (
                                    <button
                                        type="button"
                                        onClick={() => removeRecipient(recipient.id)}
                                        aria-label="Remove recipient"
                                        className="text-content-muted hover:text-red-500 cursor-pointer"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                )}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={isFirst ? recipient.name || purchaserName : recipient.name}
                                    onChange={e => updateRecipient(recipient.id, { name: e.target.value })}
                                    placeholder={isFirst ? purchaserName || "Full name" : "Full name"}
                                    className="w-full rounded-lg border border-line bg-panel px-3.5 py-2.5 text-sm text-content placeholder:text-content-muted/60 outline-none transition focus:border-lime"
                                />
                                <input
                                    type="email"
                                    value={isFirst ? recipient.email || purchaserEmail : recipient.email}
                                    onChange={e => updateRecipient(recipient.id, { email: e.target.value })}
                                    placeholder={isFirst ? purchaserEmail || "Email address" : "Email address"}
                                    className="w-full rounded-lg border border-line bg-panel px-3.5 py-2.5 text-sm text-content placeholder:text-content-muted/60 outline-none transition focus:border-lime"
                                />
                            </div>

                            {/* Per-ticket-type quantity steppers for THIS recipient */}
                            <div className="space-y-2">
                                {ticketsWithQty.map(t => {
                                    const qty = recipient.allocations[t.id] ?? 0
                                    const remainingForOthers =
                                        remainingFor(t.id, quantities, value) + qty
                                    return (
                                        <div
                                            key={t.id}
                                            className="flex items-center justify-between gap-3"
                                        >
                                            <span className="text-sm text-content-muted">{t.name}</span>
                                            <div className="flex items-center gap-2.5 flex-shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() => setAllocation(recipient.id, t.id, qty - 1)}
                                                    disabled={qty === 0}
                                                    className="h-7 w-7 rounded-md border border-line bg-panel text-content text-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-lime/10"
                                                >
                                                    −
                                                </button>
                                                <span className="w-5 text-center text-sm font-bold text-content">
                                                    {qty}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setAllocation(recipient.id, t.id, qty + 1)}
                                                    disabled={qty >= remainingForOthers}
                                                    className="h-7 w-7 rounded-md border border-line bg-lime text-ink text-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:opacity-90"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <button
                type="button"
                onClick={addRecipient}
                className="flex items-center gap-1.5 text-sm font-semibold text-lime-deep dark:text-lime hover:underline cursor-pointer"
            >
                <Plus size={15} /> Add another recipient
            </button>

            {!fullyAssigned && (
                <p className="text-xs text-content-muted flex items-center gap-1.5">
                    <AlertCircle size={13} />
                    Assign every ticket to a recipient before continuing.
                </p>
            )}
        </div>
    )
}