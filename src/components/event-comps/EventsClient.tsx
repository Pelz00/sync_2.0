"use client"
import { useState } from "react"

export default function EventCLients() {
    const [activeButton, setActiveButton] = useState('All')

    const categories = ["All", "Concert", "Campus", "Sports", "Nightlife", "Free"]

    return (
        <div className="flex flex-row gap-1 lg:gap-2">
            {categories.map((category) => {
                return <div
                    key={category}
                    onClick={() => setActiveButton(category)}
                    className={`border-1 rounded-lg px-1 py-0 lg:px-3 lg:py-1 cursor-pointer text-xs lg:text-sm ${activeButton === category
                        ? "bg-black text-white font-bold"
                        : "bg-white text-black"
                        }`}
                >
                    {category}
                </div>
            })}
        </div>
    )
}