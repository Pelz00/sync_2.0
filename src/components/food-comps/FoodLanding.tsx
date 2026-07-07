'use client'

import Image from 'next/image'
import { MoveRight, Star, Clock, Bike } from 'lucide-react'
import { GoDotFill } from 'react-icons/go'

import JollofOne from '@/assets/images/Food-Pics/Jollof/JollofOne.webp'
import SwallowOne from '@/assets/images/Food-Pics/Swallow/SwallowOne.webp'
import BurgerOne from '@/assets/images/Food-Pics/Burgers/BurgerImageOne.webp'
import DesertOne from '@/assets/images/Food-Pics/Desert/DesertOne.webp'

interface Props {
    onExplore: () => void
}

const HIGHLIGHTS = [
    { icon: <Clock size={16} className="text-lime" />, text: '15–40 min delivery' },
    { icon: <Bike size={16} className="text-lime" />, text: 'Free delivery available' },
    { icon: <Star size={16} className="text-lime" fill="currentColor" />, text: 'Top-rated campus vendors' },
]

const PREVIEW_IMAGES = [JollofOne, SwallowOne, BurgerOne, DesertOne]

export default function FoodLanding({ onExplore }: Props) {
    return (
        <div className="fixed inset-0 z-50 bg-surface flex flex-col overflow-hidden">

            {/* ── 2×2 image grid ── */}
            <div className="relative flex-1 min-h-0">
                <div className="grid grid-cols-2 h-full">
                    {PREVIEW_IMAGES.map((img, i) => (
                        <div key={i} className="relative overflow-hidden">
                            <Image
                                src={img}
                                alt=""
                                fill
                                className="object-cover"
                                priority={i === 0}
                            />
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-mono px-3 py-1.5 rounded-full border border-white/10">
                    <GoDotFill className="text-lime animate-pulse" />
                    20+ vendors open now
                </div>
            </div>

            {/* ── Bottom sheet ── */}
            <div className="bg-panel rounded-t-3xl px-6 pt-7 pb-10 flex flex-col gap-5 flex-shrink-0">
                <div className="flex flex-col gap-1.5">
                    <h1 className="font-black text-3xl text-content leading-tight">
                        Discover varieties of{' '}
                        <span className="text-lime-deep dark:text-lime">delicacies</span>
                    </h1>
                    <p className="text-sm text-content-muted leading-relaxed">
                        Campus food, ordered fast. From jollof to burgers —
                        everything you crave, delivered to your door.
                    </p>
                </div>

                <div className="flex flex-col gap-2.5">
                    {HIGHLIGHTS.map((h, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-lime/10 flex items-center justify-center flex-shrink-0">
                                {h.icon}
                            </div>
                            <p className="text-sm text-content">{h.text}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onExplore}
                    className="w-full bg-lime text-ink font-black text-base py-4 rounded-2xl border-0 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                    Explore food
                    <MoveRight size={20} />
                </button>

                {/* <button
                    onClick={onExplore}
                    className="text-xs text-content-muted underline underline-offset-2 cursor-pointer text-center"
                >
                    Skip for now
                </button> */}
            </div>
        </div>
    )
}