"use client"
import { useState } from "react"
import FoodCards from "./food-card"
import { StaticImageData } from "next/image"

interface Food {
    slug: string
    image: StaticImageData | string
    name: string
    tags: string[]
    rating: string
    location: string
    time: string
    category: string
}

interface Props {
    food: Food[]
}

const categories = ["All", "Breakfast", "Jollof", "Swallow", "Fast Food", "Small Chops", "Desert", "Suya", "Drinks"]

export default function FoodSection({ food }: Props) {
    const [activeCategory, setActiveCategory] = useState("All")

    const filtered = activeCategory === "All"
        ? food
        : food.filter(f => f.category === activeCategory)

    return (
        <>
            <h2 className="mt-5 text-2xl text-center lg:text-left font-black tracking-tight md:text-4xl lg:text-4xl font-display leading-none">
                <span className="text-[#C5FF4A] bg-ink dark:bg-[#111111] border-2 border-[#C5FF4A] dark:border-[#C5FF4A] px-2 py-1 lg:px-4 lg:py-1 inline-block transform-rotate-1 shadow-[4px_4px_0px_0px_rgba(197,255,74,1)]">
                    Order up.
                </span>
            </h2>

            <div className="mt-2 flex flex-row gap-1 lg:gap-2 flex-wrap">
                {categories.map((category) => (
                    <div
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`border rounded-full px-3 py-1 lg:px-5 lg:py-2 cursor-pointer text-xs lg:text-sm transition-colors ${activeCategory === category
                            ? "bg-[#C5FF4A] text-ink font-bold border-transparent shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                            : "bg-panel text-content border-white/20 dark:border-white/15"
                            }`}
                    >
                        {category}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 mt-2">
                {filtered.length > 0 ? (
                    filtered.map((item, index) => (
                        <FoodCards key={index} {...item} />
                    ))
                ) : (
                    <p className="col-span-4 text-center text-content-muted text-sm py-8">
                        No food spots in this category yet.
                    </p>
                )}
            </div>
        </>
    )
}