"use client"
import { useState } from "react"
import EventCards from "@/components/event-comps/event-card"
import { StaticImageData } from "next/image"
import { ChevronDown, ArrowDownUp } from "lucide-react"

interface Event {
    slug: string
    image: StaticImageData | string
    date: string
    price: string
    title: string
    location: string
    time: string
    category: string
}

interface Props {
    events: Event[]
}

const categories = ["All", "Concert", "Campus", "Sports", "Nightlife", "Free"]

type SortKey = "date" | "price-asc" | "price-desc" | "title"

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: "date", label: "Date (soonest)" },
    { key: "price-asc", label: "Price (low to high)" },
    { key: "price-desc", label: "Price (high to low)" },
    { key: "title", label: "Title (A–Z)" },
]

// "TUE 28" -> a comparable weekday index. Falls back to a large number for
// anything unrecognized so it sorts to the end instead of crashing.
const WEEKDAY_ORDER: Record<string, number> = {
    MON: 0, TUE: 1, WED: 2, THU: 3, FRI: 4, SAT: 5, SUN: 6,
}

function dateSortValue(date: string) {
    const day = date.trim().slice(0, 3).toUpperCase()
    return WEEKDAY_ORDER[day] ?? 99
}

// "₦1,000" -> 1000, "Free" -> 0, anything unparseable -> a large number so it
// sorts last under "low to high" instead of breaking the sort.
function priceSortValue(price: string) {
    if (/free/i.test(price)) return 0
    const numeric = price.replace(/[^\d.]/g, "")
    const parsed = parseFloat(numeric)
    return Number.isFinite(parsed) ? parsed : Infinity
}

export default function EventsClient({ events }: Props) {
    const [activeCategory, setActiveCategory] = useState('All')
    const [sortKey, setSortKey] = useState<SortKey>("date")
    const [sortOpen, setSortOpen] = useState(false)

    const filtered = activeCategory === 'All'
        ? events
        : events.filter(e => e.category === activeCategory)

    // Sort a COPY — never mutate the array passed down from the parent.
    const sorted = [...filtered].sort((a, b) => {
        switch (sortKey) {
            case "date":
                return dateSortValue(a.date) - dateSortValue(b.date)
            case "price-asc":
                return priceSortValue(a.price) - priceSortValue(b.price)
            case "price-desc":
                return priceSortValue(b.price) - priceSortValue(a.price)
            case "title":
                return a.title.localeCompare(b.title)
            default:
                return 0
        }
    })

    const activeSortLabel = SORT_OPTIONS.find(o => o.key === sortKey)?.label ?? "Sort"

    return (
        <>
            {/* FILTER CHIPS */}
            <h2 className="text-2xl text-left lg:text-left font-black tracking-tight md:text-4xl lg:text-4xl font-display text-content leading-none">
                <span className="text-ink bg-lime px-2 py-1 lg:px-4 lg:py-1 inline-block transform -rotate-3">
                    Stay tuned.
                </span>
            </h2>

            <div className="mt-2 flex items-center justify-between gap-2">
                <div className="flex flex-row gap-1 lg:gap-2 overflow-x-auto scrollbar-none">
                    {categories.map((category) => (
                        <div
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`rounded-lg px-2 py-1 lg:px-3 lg:py-1.5 cursor-pointer text-xs lg:text-sm border transition-colors flex-shrink-0 ${activeCategory === category
                                ? "bg-lime text-ink font-bold border-transparent"
                                : "bg-panel text-content border-line/15 hover:bg-content-muted/5"
                                }`}
                        >
                            {category}
                        </div>
                    ))}
                </div>

                {/* SORT DROPDOWN — replaces the old decorative "Sort: nearest"
                    label. Click toggles a small menu; picking an option
                    re-sorts the grid below immediately. */}
                <div className="relative flex-shrink-0">
                    <button
                        type="button"
                        onClick={() => setSortOpen(o => !o)}
                        className="flex items-center gap-1.5 text-xs lg:text-sm text-content-muted border border-line/15 rounded-lg px-2.5 py-1.5 bg-panel hover:bg-content-muted/5 transition-colors cursor-pointer whitespace-nowrap"
                    >
                        <ArrowDownUp size={13} />
                        <span className="hidden sm:inline">Sort: </span>{activeSortLabel}
                        <ChevronDown size={13} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                    </button>

                    {sortOpen && (
                        <>
                            {/* Backdrop closes the menu on outside click */}
                            <button
                                type="button"
                                tabIndex={-1}
                                aria-hidden="true"
                                onClick={() => setSortOpen(false)}
                                className="fixed inset-0 z-40 cursor-default"
                            />
                            <ul
                                role="listbox"
                                className="absolute right-0 z-50 mt-1.5 w-48 overflow-hidden rounded-xl border border-line/15 bg-panel shadow-pop py-1"
                            >
                                {SORT_OPTIONS.map((opt) => (
                                    <li key={opt.key}>
                                        <button
                                            type="button"
                                            onClick={() => { setSortKey(opt.key); setSortOpen(false) }}
                                            className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer ${sortKey === opt.key
                                                ? "bg-lime/15 text-content font-semibold"
                                                : "text-content hover:bg-content-muted/5"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>

            {/* EVENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 mt-2">
                {sorted.length > 0 ? (
                    sorted.map((event) => (
                        <EventCards key={event.slug} {...event} />
                    ))
                ) : (
                    <p className="col-span-3 text-center text-content-muted text-sm py-8">
                        No events in this category yet.
                    </p>
                )}
            </div>
        </>
    )
}