"use client"

import { useState } from "react"
import { TbCurrencyNaira } from "react-icons/tb"
import { CirclePlus, CircleMinus, MoveRight } from "lucide-react"
import InvoiceModal from "./InvoiceModal"

interface Ticket {
    id: string
    name: string
    desc: string
    price: number
}

interface EventInfo {
    title: string
    location: string
    date: string
    time: string
}

export default function TicketPanel({
    tickets,
    event,
}: {
    tickets: Ticket[]
    event: EventInfo
}) {
    const [selections, setSelections] = useState<Record<string, number>>({})
    const [invoiceOpen, setInvoiceOpen] = useState(false)

    const syncFee = 500

    const subtotal = Object.entries(selections).reduce((acc, [id, qty]) => {
        const ticket = tickets.find((t) => t.id === id)
        return acc + (ticket ? ticket.price * qty : 0)
    }, 0)

    const totalTickets = Object.values(selections).reduce((acc, qty) => acc + qty, 0)
    const total = subtotal + (totalTickets > 0 ? syncFee : 0)

    function increment(id: string) {
        setSelections((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
    }

    function decrement(id: string) {
        setSelections((prev) => {
            const current = prev[id] ?? 0
            if (current <= 1) {
                const { [id]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [id]: current - 1 }
        })
    }

    const selectedEntries = Object.entries(selections).filter(([, qty]) => qty > 0)

    function handleConfirm() {
        setInvoiceOpen(false)
        // TODO: navigate to confirmation page
        // router.push('/checkout/confirm')
    }

    return (
        <>
            <div className="w-full lg:w-[30%] border-1 px-4 py-3 rounded-lg lg:sticky lg:top-5">
                <h1 className="font-bold text-sm tracking-widest font-mono uppercase">Pick your tickets</h1>

                {tickets.map((t) => {
                    const qty = selections[t.id] ?? 0
                    const active = qty > 0

                    return (
                        <div
                            key={t.id}
                            className={`flex justify-between items-center gap-2 p-3 mt-2 rounded-lg transition border-1
                ${active ? "bg-[#C5FF4A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : ""}`}
                        >
                            <div className="min-w-0 flex-1">
                                <h2 className="font-bold text-sm lg:text-base truncate">{t.name}</h2>
                                <p className="text-xs text-muted truncate">{t.desc}</p>
                                <p className="font-black text-sm flex items-center mt-1">
                                    <TbCurrencyNaira />
                                    {t.price.toLocaleString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                                {qty > 0 ? (
                                    <>
                                        <button onClick={() => decrement(t.id)} className="cursor-pointer">
                                            <CircleMinus strokeWidth={1} size={22} />
                                        </button>
                                        <span className="text-base font-bold w-4 text-center">{qty}</span>
                                        <button onClick={() => increment(t.id)} className="cursor-pointer">
                                            <CirclePlus strokeWidth={1} size={22} />
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => increment(t.id)}
                                        className="text-xs font-bold border-1 rounded-lg px-3 py-1 cursor-pointer hover:bg-black hover:text-white transition"
                                    >
                                        Add
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}

                {totalTickets > 0 && (
                    <>
                        <div className="border-y-2 border-dashed py-3 mt-3 flex flex-col gap-1">
                            {selectedEntries.map(([id, qty]) => {
                                const ticket = tickets.find((t) => t.id === id)!
                                return (
                                    <div key={id} className="flex justify-between items-center">
                                        <p className="text-xs text-muted">
                                            {qty} × {ticket.name}
                                        </p>
                                        <p className="text-sm font-medium flex items-center">
                                            <TbCurrencyNaira />
                                            {(ticket.price * qty).toLocaleString()}
                                        </p>
                                    </div>
                                )
                            })}
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-muted">Sync Fee</p>
                                <p className="text-sm font-medium flex items-center">
                                    <TbCurrencyNaira />
                                    {syncFee.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-1 rounded-lg p-3 mt-2">
                            <p className="text-sm font-bold">Total</p>
                            <p className="text-sm font-bold flex items-center">
                                <TbCurrencyNaira />
                                {total.toLocaleString()}
                            </p>
                        </div>

                        {/* BUY BUTTON — opens invoice modal */}
                        <button
                            onClick={() => setInvoiceOpen(true)}
                            className="flex items-center rounded-lg mt-3 w-full justify-center gap-2 bg-[#C5FF4A] py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-sm border-1 cursor-pointer"
                        >
                            Buy {totalTickets} ticket{totalTickets > 1 ? "s" : ""}{" "}
                            <MoveRight strokeWidth={2} width={15} />
                        </button>
                    </>
                )}
            </div>

            {/* Invoice Modal */}
            <InvoiceModal
                isOpen={invoiceOpen}
                onClose={() => setInvoiceOpen(false)}
                onConfirm={handleConfirm}
                selections={selections}
                tickets={tickets}
                event={event}
            />
        </>
    )
}
