// components/FeaturedCarousel.tsx
"use client"
import { useState, useEffect, useRef } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { MoveRight } from "lucide-react"
import { GoDotFill } from "react-icons/go"
import { LuDot } from "react-icons/lu"
import { TbCurrencyNaira } from "react-icons/tb"

interface FeaturedFood {
    name: string
    tagline: string
    badge: string
    location: string
    distance: string
    opens: string
    tags: string[]
    rating: number
    fromPrice: number
    orders: number
    slug: string
    image: StaticImageData | string
}

export default function FeaturedCarousel({ items }: { items: FeaturedFood[] }) {
    const [current, setCurrent] = useState(0)
    const [sliding, setSliding] = useState(false)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    // SWIPE refs
    const startX = useRef<number | null>(null)
    const startY = useRef<number | null>(null)
    const endX = useRef<number | null>(null)
    const isHorizontalSwipe = useRef<boolean | null>(null)
    const minSwipeDistance = 50

    function startTimer() {
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            goTo("next")
        }, 5000)
    }

    useEffect(() => {
        startTimer()
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [current])

    function goTo(dir: "next" | "prev" | number) {
        if (sliding) return

        const next =
            typeof dir === "number"
                ? dir
                : dir === "next"
                    ? (current + 1) % items.length
                    : (current - 1 + items.length) % items.length

        if (next === current) return

        setSliding(true)

        setTimeout(() => {
            setCurrent(next)
            setSliding(false)
        }, 450)

        startTimer()
    }

    // SWIPE HANDLERS
    function onTouchStart(e: React.TouchEvent) {
        startX.current = e.touches[0].clientX
        startY.current = e.touches[0].clientY
        endX.current = e.touches[0].clientX
        isHorizontalSwipe.current = null
    }

    function onTouchMove(e: React.TouchEvent) {
        if (startX.current === null || startY.current === null) return

        endX.current = e.touches[0].clientX
        const dx = e.touches[0].clientX - startX.current
        const dy = e.touches[0].clientY - startY.current

        if (isHorizontalSwipe.current === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
            isHorizontalSwipe.current = Math.abs(dx) > Math.abs(dy)
        }

        if (isHorizontalSwipe.current) {
            e.preventDefault()
        }
    }

    function onTouchEnd() {
        if (startX.current === null || endX.current === null || !isHorizontalSwipe.current) {
            startX.current = null
            startY.current = null
            endX.current = null
            isHorizontalSwipe.current = null
            return
        }

        const distance = startX.current - endX.current

        if (Math.abs(distance) >= minSwipeDistance) {
            if (distance > 0) {
                goTo("next")
            } else {
                goTo("prev")
            }
        }

        startX.current = null
        startY.current = null
        endX.current = null
        isHorizontalSwipe.current = null
    }

    return (
        <div
            className="rounded-2xl overflow-hidden border border-white/10 bg-[#111111] shadow-[3px_3px_0px_0px_rgba(197,255,74,0.25)] touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >

            {/* IMAGE TRACK */}
            <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
                <div
                    className="flex h-full transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {items.map((item, i) => (
                        <div key={i} className="relative min-w-full h-full flex-shrink-0">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                priority={i === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-lime text-ink text-xs font-semibold px-3 py-1 rounded-full pointer-events-none">
                    <GoDotFill className="animate-pulse" />
                    {items[current].badge}
                </div>

                {/* Orders */}
                <div className="absolute bottom-3 left-3 z-10 bg-black/80 text-white text-[11px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1.5 pointer-events-none">
                    <GoDotFill className="text-lime animate-pulse" />
                    {items[current].orders}+ orders today
                </div>

                {/* Dots */}
                {items.length > 1 && (
                    <div className="absolute bottom-3 right-3 z-10 flex gap-1.5 items-center">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current
                                    ? "bg-lime w-5"
                                    : "bg-white/40 w-2 hover:bg-white/70"
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* INFO PANEL TRACK */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {items.map((item, i) => {
                        // Defensive URL composition checking how slug data string is configured
                        const targetHref = item.slug.startsWith('/')
                            ? item.slug
                            : item.slug.startsWith('food/')
                                ? `/${item.slug}`
                                : `/food/${item.slug}`;

                        return (
                            <div key={i} className="min-w-full flex flex-col gap-3 px-4 py-4 sm:px-5 sm:py-5 text-white">
                                <h2 className="font-mono text-base sm:text-xl font-medium leading-snug">
                                    {item.name}{" "}
                                    <i className="text-lime not-italic">— {item.tagline}</i>
                                </h2>

                                <p className="flex items-center flex-wrap text-[11px] sm:text-sm text-white/60 gap-0.5">
                                    {item.location}
                                    <LuDot />
                                    {item.distance}
                                    <LuDot />
                                    {item.opens}
                                </p>

                                <div className="flex gap-2 flex-wrap">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-white/25 rounded-full px-2.5 py-0.5 text-xs text-white/80"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    <span className="border border-white/25 rounded-full px-2.5 py-0.5 text-xs text-white/80 flex items-center gap-1">
                                        ★ {item.rating}
                                    </span>
                                </div>

                                <div className="flex items-end justify-between mt-1">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/50">From</span>
                                        <span className="font-bold text-xl sm:text-2xl flex items-center">
                                            <TbCurrencyNaira className="text-2xl sm:text-3xl" />
                                            {item.fromPrice.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {items.length > 1 && (
                                            <div className="hidden sm:flex gap-1.5">
                                                <button
                                                    onClick={() => goTo("prev")}
                                                    className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/10 transition cursor-pointer text-sm"
                                                    aria-label="Previous"
                                                >
                                                    ←
                                                </button>

                                                <button
                                                    onClick={() => goTo("next")}
                                                    className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/10 transition cursor-pointer text-sm"
                                                    aria-label="Next"
                                                >
                                                    →
                                                </button>
                                            </div>
                                        )}

                                        <Link
                                            href={targetHref}
                                            className="flex items-center gap-2 bg-lime text-ink font-bold font-mono text-sm px-4 py-2 rounded-xl border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:opacity-90 transition"
                                        >
                                            Order now{" "}
                                            <MoveRight strokeWidth={3} width={14} height={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}