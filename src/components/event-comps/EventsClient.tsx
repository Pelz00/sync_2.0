"use client"
import { useState } from "react"
import EventCards from "@/components/event-comps/event-card"
import { StaticImageData } from "next/image"

interface Event {
    slug: string
    image: StaticImageData | string
    date: string
    price: string
    title: string
    location: string
    time: string
    going: number
    category: string
}

interface Props {
    events: Event[]
}

const categories = ["All", "Concert", "Campus", "Sports", "Nightlife", "Free"]

export default function EventsClient({ events }: Props) {
    const [activeCategory, setActiveCategory] = useState('All')

    const filtered = activeCategory === 'All'
        ? events
        : events.filter(e => e.category === activeCategory)

    return (
        <>
            {/* FILTER CHIPS */}
            <h2 className="text-2xl text-center lg:text-left font-black tracking-tight md:text-4xl lg:text-4xl font-display text-neutral-900 leading-none">
                <span className="text-[#C5FF4A] bg-black px-2 py-1 lg:px-4 lg:py-1 inline-block transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(197,255,74,1)]">
                    Stay tuned.
                </span>
            </h2>
            <div className="mt-2 flex flex-row gap-1 lg:gap-2">
                {categories.map((category) => (
                    <div
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`border-none rounded-lg px-1 py-0 lg:px-3 lg:py-1 cursor-pointer text-xs lg:text-sm ${activeCategory === category
                            ? "bg-[#C5FF4A] text-black font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                            : "bg-white text-black"
                            }`}
                    >
                        {category}
                    </div>
                ))}
            </div>

            {/* EVENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4 mt-2">
                {filtered.length > 0 ? (
                    filtered.map((event, index) => (
                        <EventCards key={index} {...event} />
                    ))
                ) : (
                    <p className="col-span-4 text-center text-muted text-sm py-8">
                        No events in this category yet.
                    </p>
                )}
            </div>
        </>
    )
}