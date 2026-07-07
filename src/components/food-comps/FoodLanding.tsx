'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MoveRight, Star, Clock, Bike, Info, ChevronRight } from 'lucide-react'
import { GoDotFill } from 'react-icons/go'
import type { StaticImageData } from 'next/image'

import JollofOne from '@/assets/images/Food-Pics/Jollof/JollofOne.webp'
import JollofTwo from '@/assets/images/Food-Pics/Jollof/JollofTwo.webp'
import SwallowOne from '@/assets/images/Food-Pics/Swallow/SwallowOne.webp'
import BurgerOne from '@/assets/images/Food-Pics/Burgers/BurgerImageOne.webp'
import DesertOne from '@/assets/images/Food-Pics/Desert/DesertOne.webp'
import SmallChopsOne from '@/assets/images/Food-Pics/SmallChops/SmallChopOne.webp'
import DrinkOne from '@/assets/images/Food-Pics/Drinks/DrinkOne.avif'
import BreakFastOne from '@/assets/images/Food-Pics/BreakFast/BreakFastOne.webp'
import PremiumOne from '@/assets/images/BBQ and cravings.webp'
import PremiumTwo from '@/assets/images/See lagos.webp'

interface Props {
    onExplore: () => void
    userName?: string
}

const PREVIEW_IMAGES = [JollofOne, SwallowOne, BurgerOne, DesertOne]

const FOR_YOU_ITEMS: { slug: string; image: StaticImageData; label: string }[] = [
    { slug: 'mama-puta-tanke', image: JollofOne, label: 'Mama Put Tanke' },
    { slug: 'spit-africana', image: SwallowOne, label: 'Spit Africana' },
    { slug: 'chop-life', image: SmallChopsOne, label: 'Chewy Chops' },
    { slug: 'tasty-munch-drinks', image: DrinkOne, label: 'Cha Cha Exotics' },
    { slug: 'tasty-munch-breakfast', image: BreakFastOne, label: 'Breakfast Corner' },
    { slug: 'fast-joint', image: BurgerOne, label: 'Fast Joint' },
]

const PROMO_BANNERS: {
    title: string
    subtitle: string
    image: StaticImageData
    href: string
}[] = [
        {
            title: 'Up to 30% off today',
            subtitle: 'Save big on your first order',
            image: PremiumOne,
            href: '/food',
        },
        // {
        //     title: 'Free delivery available',
        //     subtitle: 'Order from select vendors',
        //     image: PremiumTwo,
        //     href: '/food',
        // },
    ]

export default function FoodLanding({ onExplore, userName = 'Abdulmuiz' }: Props) {
    return (
        <div className="fixed inset-0 z-50 bg-surface flex flex-col overflow-hidden">

            {/* ── 2×2 hero image grid ── */}
            <div className="relative flex-shrink-0 h-[42vh]">
                <div className="grid grid-cols-2 h-full">
                    {PREVIEW_IMAGES.map((img, i) => (
                        <div key={i} className="relative overflow-hidden">
                            <Image src={img} alt="" fill className="object-cover" priority={i === 0} />
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap">
                    <GoDotFill className="text-lime animate-pulse" />
                    20+ vendors open now
                </div>
            </div>

            {/* ── Scrollable bottom sheet ── */}
            <div className="bg-panel rounded-t-3xl flex-1 overflow-y-auto">
                <div className="px-5 pt-6 pb-10 flex flex-col gap-6">

                    {/* Heading */}
                    <div className="flex flex-col gap-1.5">
                        <h1 className="font-black text-2xl text-content leading-tight">
                            Discover varieties of{' '}
                            <span className="text-lime-deep dark:text-lime">delicacies</span>
                        </h1>
                        <p className="text-sm text-content-muted leading-relaxed">
                            Campus food, ordered fast. From jollof to burgers —
                            everything you crave, delivered to your door.
                        </p>
                    </div>

                    {/* ── For You Section ── */}
                    <section className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h2 className="font-black text-base text-content">
                                {userName}, these are for you
                            </h2>
                            <Info size={15} className="text-content-muted" />
                        </div>
                        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
                            {FOR_YOU_ITEMS.map(item => (
                                <button
                                    key={item.slug}
                                    onClick={onExplore}
                                    className="flex flex-col items-center gap-2 flex-shrink-0 w-[72px] cursor-pointer"
                                >
                                    <div className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden border-2 border-black">
                                        <Image src={item.image} alt={item.label} fill className="object-cover" />
                                    </div>
                                    <p className="text-[11px] text-content text-center leading-tight line-clamp-2">
                                        {item.label}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* ── Promo Banners ── */}
                    <section className="flex flex-col gap-3">
                        {PROMO_BANNERS.map((banner, i) => (
                            <button
                                key={i}
                                onClick={onExplore}
                                className="relative block h-32 w-full rounded-2xl overflow-hidden border-0 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer text-left"
                            >
                                <Image src={banner.image} alt={banner.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-center gap-1 px-4 max-w-[75%]">
                                    <p className="font-black text-white text-base leading-tight">{banner.title}</p>
                                    <p className="text-white/85 text-xs">{banner.subtitle}</p>
                                    <p className="text-white/50 text-[10px] mt-0.5">Ad</p>
                                </div>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5">
                                    <ChevronRight size={15} className="text-ink" />
                                </div>
                            </button>
                        ))}
                    </section>

                    {/* ── Explore CTA ── */}
                    <button
                        onClick={onExplore}
                        className="w-full bg-lime text-ink font-black text-base py-4 rounded-2xl border-0 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                        Explore all food
                        <MoveRight size={20} />
                    </button>

                </div>
            </div>
        </div>
    )
}