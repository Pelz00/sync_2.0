"use client"

import { useEffect, useState } from "react"
import { X, Ticket, MapPin, Clock, Calendar } from "lucide-react"
import { TbCurrencyNaira } from "react-icons/tb"

interface Ticket {
  id: string
  name: string
  desc: string
  price: number
}

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  selections: Record<string, number>
  tickets: Ticket[]
  event: {
    title: string
    location: string
    date: string
    time: string
  }
}

const syncFee = 500

export default function InvoiceModal({
  isOpen,
  onClose,
  onConfirm,
  selections,
  tickets,
  event,
}: InvoiceModalProps) {
  const selectedEntries = Object.entries(selections).filter(([, qty]) => qty > 0)

  const subtotal = selectedEntries.reduce((acc, [id, qty]) => {
    const ticket = tickets.find((t) => t.id === id)
    return acc + (ticket ? ticket.price * qty : 0)
  }, 0)

  const totalTickets = selectedEntries.reduce((acc, [, qty]) => acc + qty, 0)
  const total = subtotal + syncFee

  // Invoice number generated once via a useState initializer - the supported way
  // to seed state with a random value, since Math.random() can't run during render.
  const [invoiceNo] = useState(() => `SYN-${Math.floor(100000 + Math.random() * 900000)}`)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  if (!isOpen) return null

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-[#F5F2EA] border-2 border-black rounded-t-2xl sm:rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">

        {/* Header bar */}
        <div className="bg-[#C5FF4A] border-b-2 border-black px-5 py-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/60">Invoice</p>
            <h2 className="font-black text-lg leading-tight text-black">{invoiceNo}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-white hover:bg-black hover:text-white transition cursor-pointer"
            aria-label="Close"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">

          {/* Event info */}
          <div className="border-2 border-black rounded-xl bg-white p-3 flex flex-col gap-[6px]">
            <h3 className="font-black text-base leading-tight">{event.title}</h3>
            <div className="flex flex-wrap gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-black/60">
                <MapPin size={12} strokeWidth={2} /> {event.location}
              </span>
              <span className="flex items-center gap-1 text-xs text-black/60">
                <Calendar size={12} strokeWidth={2} /> {event.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-black/60">
                <Clock size={12} strokeWidth={2} /> Doors {event.time}
              </span>
            </div>
          </div>

          {/* Ticket line items */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/50 mb-2">Ticket breakdown</p>
            <div className="flex flex-col gap-[6px]">
              {selectedEntries.map(([id, qty]) => {
                const ticket = tickets.find((t) => t.id === id)!
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between border-2 border-black rounded-xl px-3 py-2 bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#C5FF4A] border-2 border-black flex items-center justify-center">
                        <Ticket size={11} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-tight">{ticket.name}</p>
                        <p className="text-[10px] text-black/50">{ticket.desc}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-black/50">{qty} × <TbCurrencyNaira className="inline" />{ticket.price.toLocaleString()}</p>
                      <p className="font-black text-sm flex items-center justify-end">
                        <TbCurrencyNaira />{(ticket.price * qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Fee breakdown */}
          <div className="border-t-2 border-dashed border-black pt-3 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-black/60">Subtotal</span>
              <span className="font-medium flex items-center"><TbCurrencyNaira />{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-black/60">Sync Fee</span>
              <span className="font-medium flex items-center"><TbCurrencyNaira />{syncFee.toLocaleString()}</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-2 border-black rounded-xl bg-black text-[#C5FF4A] px-4 py-3 flex justify-between items-center">
            <span className="font-mono font-bold text-sm tracking-wide uppercase">Total</span>
            <span className="font-black text-xl flex items-center">
              <TbCurrencyNaira />{total.toLocaleString()}
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2 pb-1">
            <button
              onClick={onClose}
              className="flex-1 border-2 border-black rounded-xl py-[10px] text-sm font-bold bg-white hover:bg-black hover:text-white transition cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-[2] border-2 border-black rounded-xl py-[10px] text-sm font-black bg-[#C5FF4A] hover:bg-black hover:text-[#C5FF4A] transition cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Confirm & Pay {totalTickets} ticket{totalTickets > 1 ? "s" : ""}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}