"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter, notFound } from "next/navigation"

import { MoveLeft } from "lucide-react"
import TicketCard from "@/components/event-comps/ticket/TicketCard"
import OrderSummary from "@/components/event-comps/ticket/OrderSummary"
import CheckoutSteps from "@/components/event-comps/ticket/CheckoutSteps"

import { events } from "@/lib/event"

export default function TicketsPage() {
    const { slug } = useParams<{ slug: string }>()
    const router = useRouter()
    const event = events.find(e => e.slug === slug)

    const [quantities, setQuantities] = useState<Record<string, number>>({})
    console.log("slug param:", slug, "found event:", event)

    if (!event) notFound()

    function increase(ticketId: string) {
        setQuantities(prev => ({ ...prev, [ticketId]: (prev[ticketId] ?? 0) + 1 }))
    }

    function decrease(ticketId: string) {
        setQuantities(prev => {
            const current = prev[ticketId] ?? 0
            if (current <= 0) return prev
            return { ...prev, [ticketId]: current - 1 }
        })
    }

    const totalTickets = Object.values(quantities).reduce((sum, q) => sum + q, 0)

    // Carries the selection forward to the Contact step via the URL, e.g.
    // ?sel=regular:2,vip:3 — no global state/cart backend needed yet, and
    // the Contact page can rebuild the same summary from this alone.
    //
    // event! is safe here: notFound() above throws before this component
    // can render any further, so goToContact only ever exists/gets called
    // once `event` is confirmed defined. TypeScript just can't carry that
    // narrowing across the closure boundary into a nested function on its
    // own, hence the explicit assertion.
    function goToContact() {
        const selection = Object.entries(quantities)
            .filter(([, qty]) => qty > 0)
            .map(([id, qty]) => `${id}:${qty}`)
            .join(",")

        router.push(`/events/${event!.slug}/tickets/contact?sel=${encodeURIComponent(selection)}`)
    }

    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-5 py-6 sm:py-8">

            <Link
                href={`/events/${event.slug}`}
                className="inline-flex items-center gap-2 bg-lime text-ink font-bold px-4 py-2 rounded-xl border-0 border-black shadow-[2px_2px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
                <MoveLeft size={18} />
                Back to Event
            </Link>

            <div className="mt-6 sm:mt-8">
                <CheckoutSteps current="tickets" />
            </div>

            <div className="mt-6 sm:mt-8">
                <h1 className="text-2xl sm:text-4xl font-black text-content">
                    Select Tickets
                </h1>

                <p className="mt-2 text-sm sm:text-base text-content-muted">
                    Choose your preferred ticket type.
                </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 mt-6 sm:mt-8">

                <div className="lg:order-2">
                    <OrderSummary
                        event={event}
                        tickets={event.tickets}
                        quantities={quantities}
                        ctaLabel={
                            totalTickets === 0
                                ? "Select a ticket to continue"
                                : `Continue with ${totalTickets} ticket${totalTickets > 1 ? "s" : ""}`
                        }
                        onContinue={goToContact}
                    />
                </div>

                <div className="space-y-4 sm:space-y-5 lg:order-1">
                    {event.tickets.map(ticket => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            quantity={quantities[ticket.id] ?? 0}
                            onIncrease={() => increase(ticket.id)}
                            onDecrease={() => decrease(ticket.id)}
                        />
                    ))}
                </div>

            </div>

        </section>
    )
}