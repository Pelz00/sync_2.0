"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams, useRouter, notFound } from "next/navigation"

import { MoveLeft } from "lucide-react"
import CheckoutSteps from "@/components/event-comps/ticket/CheckoutSteps"
import OrderSummary from "@/components/event-comps/ticket/OrderSummary"
import RecipientAllocator, { type Recipient } from "@/components/event-comps/ticket/RecipientAllocator"

import { events } from "@/lib/event"

// Reverses the `?sel=regular:2,vip:3` format the Tickets page encodes.
function parseSelection(sel: string | null): Record<string, number> {
    if (!sel) return {}
    const out: Record<string, number> = {}
    for (const pair of sel.split(",")) {
        const [id, qty] = pair.split(":")
        if (id && qty) out[id] = parseInt(qty, 10) || 0
    }
    return out
}

interface PurchaserData {
    firstName: string
    lastName: string
    email: string
    confirmEmail: string
    phone: string
}

const EMPTY_PURCHASER: PurchaserData = {
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
}

function makeId() {
    return Math.random().toString(36).slice(2, 10)
}

export default function ContactPage() {
    const { slug } = useParams<{ slug: string }>()
    const searchParams = useSearchParams()
    const router = useRouter()
    const event = events.find(e => e.slug === slug)

    const quantities = parseSelection(searchParams.get("sel"))
    const [purchaser, setPurchaser] = useState<PurchaserData>(EMPTY_PURCHASER)

    // Starts with exactly one recipient — the purchaser themself, with no
    // allocations yet. They can leave it that way (everything stays with
    // them) or add more recipients and redistribute freely.
    const [recipients, setRecipients] = useState<Recipient[]>([
        { id: makeId(), name: "", email: "", allocations: {} },
    ])

    if (!event) notFound()

    const totalTickets = Object.values(quantities).reduce((sum, q) => sum + q, 0)

    function set<K extends keyof PurchaserData>(key: K, val: PurchaserData[K]) {
        setPurchaser(prev => ({ ...prev, [key]: val }))
    }

    const emailsMatch = purchaser.email.trim() !== "" && purchaser.email === purchaser.confirmEmail

    // Every ticket must be assigned to *someone*, and every recipient who
    // has at least one ticket assigned must have a name + email filled in.
    const totalAssigned = recipients.reduce(
        (sum, r) => sum + Object.values(r.allocations).reduce((a, b) => a + b, 0),
        0,
    )
    const allAssigned = totalAssigned === totalTickets
    const recipientsWithTicketsAreComplete = recipients
        .filter(r => Object.values(r.allocations).some(q => q > 0))
        .every(r => {
            const idx = recipients.indexOf(r)
            const isFirst = idx === 0
            const name = isFirst ? r.name || purchaser.firstName + " " + purchaser.lastName : r.name
            const email = isFirst ? r.email || purchaser.email : r.email
            return name.trim() !== "" && email.trim() !== ""
        })

    const canContinue =
        purchaser.firstName.trim() !== "" &&
        purchaser.lastName.trim() !== "" &&
        emailsMatch &&
        purchaser.phone.trim() !== "" &&
        totalTickets > 0 &&
        allAssigned &&
        recipientsWithTicketsAreComplete

    function goToPayment() {
        const sel = Object.entries(quantities)
            .map(([id, qty]) => `${id}:${qty}`)
            .join(",")
        router.push(`/events/${event!.slug}/tickets/payment?sel=${encodeURIComponent(sel)}`)
    }

    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-5 py-6 sm:py-8">

            <Link
                href={`/events/${event.slug}/tickets`}
                className="inline-flex items-center gap-2 bg-lime text-ink font-bold px-4 py-2 rounded-xl border border-black shadow-[3px_3px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
                <MoveLeft size={18} />
                Back to Tickets
            </Link>

            <div className="mt-6 sm:mt-8">
                <CheckoutSteps current="contact" />
            </div>

            <div className="mt-6 sm:mt-8">
                <h1 className="text-2xl sm:text-4xl font-black text-content">
                    Contact Information
                </h1>

                <p className="mt-2 text-sm sm:text-base text-content-muted">
                    Enter your details below, then choose who each ticket goes to.
                </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 mt-6 sm:mt-8">

                <div className="lg:order-2">
                    <OrderSummary
                        event={event}
                        tickets={event.tickets}
                        quantities={quantities}
                        ctaLabel={
                            !canContinue
                                ? "Complete the details above to continue"
                                : "Continue to payment"
                        }
                        onContinue={canContinue ? goToPayment : undefined}
                    />
                </div>

                <div className="lg:order-1 space-y-6">

                    {/* Purchaser details — the person completing the purchase,
                        always required regardless of who the tickets go to. */}
                    <div className="rounded-2xl border border-line/10 bg-panel p-5 sm:p-6 space-y-5">
                        <h2 className="font-bold text-content">Your details</h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={purchaser.firstName}
                                onChange={e => set("firstName", e.target.value)}
                                placeholder="First name"
                                className="w-full rounded-xl border border-line/10 bg-surface px-4 py-3 text-sm text-content placeholder:text-content-muted/60 outline-none transition focus:border-lime"
                            />
                            <input
                                type="text"
                                value={purchaser.lastName}
                                onChange={e => set("lastName", e.target.value)}
                                placeholder="Last name"
                                className="w-full rounded-xl border border-line/10 bg-surface px-4 py-3 text-sm text-content placeholder:text-content-muted/60 outline-none transition focus:border-lime"
                            />
                        </div>

                        <input
                            type="email"
                            value={purchaser.email}
                            onChange={e => set("email", e.target.value)}
                            placeholder="Email address"
                            className="w-full rounded-xl border border-line/10 bg-surface px-4 py-3 text-sm text-content placeholder:text-content-muted/60 outline-none transition focus:border-lime"
                        />

                        <input
                            type="email"
                            value={purchaser.confirmEmail}
                            onChange={e => set("confirmEmail", e.target.value)}
                            placeholder="Confirm email address"
                            className="w-full rounded-xl border border-line/10 bg-surface px-4 py-3 text-sm text-content placeholder:text-content-muted/60 outline-none transition focus:border-lime"
                        />

                        <input
                            type="tel"
                            value={purchaser.phone}
                            onChange={e => set("phone", e.target.value)}
                            placeholder="Phone number"
                            className="w-full rounded-xl border border-line/10 bg-surface px-4 py-3 text-sm text-content placeholder:text-content-muted/60 outline-none transition focus:border-lime"
                        />
                    </div>

                    {/* Flexible recipient allocation — replaces a rigid
                        "one form per ticket" pattern. The purchaser can keep
                        every ticket for themself, or split any mix of ticket
                        types/quantities across as many named recipients as
                        they like (e.g. 15 tickets to self, 5 to a friend). */}
                    <RecipientAllocator
                        tickets={event.tickets}
                        quantities={quantities}
                        purchaserName={`${purchaser.firstName} ${purchaser.lastName}`.trim()}
                        purchaserEmail={purchaser.email}
                        value={recipients}
                        onChange={setRecipients}
                    />

                    {totalTickets === 0 && (
                        <p className="text-sm text-content-muted">
                            No tickets were carried over from the previous step —{" "}
                            <Link href={`/events/${event.slug}/tickets`} className="text-lime-deep dark:text-lime underline">
                                go back and select tickets
                            </Link>{" "}
                            before continuing.
                        </p>
                    )}
                </div>

            </div>

        </section>
    )
}