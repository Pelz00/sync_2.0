'use client'

import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import type { StaticImageData } from 'next/image'

interface Props {
    title: string
    subtitle: string
    image: StaticImageData
    isAd?: boolean
    href?: string
}

export default function PromoBanner({ title, subtitle, image, isAd = true, href = '#' }: Props) {
    return (

        <a href={href}
            className="relative block h-36 w-full rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
            <Image src={image} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-center gap-1 px-5 max-w-[75%]">
                <p className="font-black text-white text-lg leading-tight">{title}</p>
                <p className="text-white/85 text-xs">{subtitle}</p>
                {isAd && <p className="text-white/50 text-[10px] mt-1">Ad</p>}
            </div>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5">
                <ChevronRight size={16} className="text-ink" />
            </div>
        </a>
    )
}