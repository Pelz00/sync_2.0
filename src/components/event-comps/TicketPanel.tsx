"use client"

import { useState } from "react"
import { TbCurrencyNaira } from "react-icons/tb"
import { CirclePlus, CircleMinus, MoveRight } from "lucide-react"

interface Ticket {
    id: string
    name: string
    desc: string
    price: number
}

export default function TicketPanel({ tickets }: { tickets: Ticket[] }) {
    const [selected, setSelected] = useState(tickets[0])
    const [qty, setQty] = useState(2)

    const syncFee = 500
    const subtotal = selected.price * qty
    const total = subtotal + syncFee

    return (
        <div className="w-full lg:w-[30%] border-1 px-4 py-3 rounded-lg lg:top-5">
            <h1 className="font-bold text-sm tracking-widest font-mono uppercase">Pick your ticket</h1>

            {/* TICKET TIERS */}
            {tickets.map((t) => {
                const active = selected.id === t.id
                return (
                    <div
                        key={t.id}
                        onClick={() => setSelected(t)}
                        className={`flex justify-between items-center gap-2 p-3 mt-2 rounded-lg cursor-pointer transition
                            ${active
                                ? "bg-[#C5FF4A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                : "border-1"
                            }`}
                    >
                        <div className="min-w-0 flex-1">
                            <h2 className="font-bold text-sm lg:text-base truncate">{t.name}</h2>
                            <p className="text-xs text-muted truncate">{t.desc}</p>
                        </div>
                        <p className="font-black text-base lg:text-xl flex items-center flex-shrink-0">
                            <TbCurrencyNaira />{t.price.toLocaleString()}
                        </p>
                    </div>
                )
            })}

            {/* QUANTITY */}
            <div className="border-y-2 border-dashed flex justify-between items-center py-3 mt-3">
                <p className="text-sm font-medium">Quantity</p>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="cursor-pointer"
                    >
                        <CircleMinus strokeWidth={1} size={22} />
                    </button>
                    <span className="text-lg font-bold w-4 text-center">{qty}</span>
                    <button
                        onClick={() => setQty((q) => q + 1)}
                        className="cursor-pointer"
                    >
                        <CirclePlus strokeWidth={1} size={22} />
                    </button>
                </div>
            </div>

            {/* SUMMARY */}
            <div className="border-1 flex flex-col gap-1 p-3 mt-2 rounded-lg">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-muted">{qty} × {selected.name}</p>
                    <p className="text-sm font-medium flex items-center">
                        <TbCurrencyNaira />{subtotal.toLocaleString()}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xs text-muted">Sync Fee</p>
                    <p className="text-sm font-medium flex items-center">
                        <TbCurrencyNaira />{syncFee.toLocaleString()}
                    </p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t-1 border-dashed mt-1">
                    <p className="text-sm font-bold">Total</p>
                    <p className="text-sm font-bold flex items-center">
                        <TbCurrencyNaira />{total.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* CTA */}
            <button className="flex items-center rounded-lg mt-3 w-full justify-center gap-2 bg-[#C5FF4A] py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-sm border-1 cursor-pointer">
                Buy {qty} ticket{qty > 1 ? 's' : ''} <MoveRight strokeWidth={2} width={15} />
            </button>
        </div>
    )
}