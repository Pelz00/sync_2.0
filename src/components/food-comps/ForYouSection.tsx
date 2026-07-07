'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Info } from 'lucide-react'
import type { StaticImageData } from 'next/image'

export interface ForYouItem {
    slug: string
    image: StaticImageData
    label: string
}

interface Props {
    userName: string
    items: ForYouItem[]
}

export default function ForYouSection({ userName, items }: Props) {
    return (
        <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h2 className="font-black text-lg text-content">
                    {userName}, these are for you
                </h2>
                <Info size={16} className="text-content-muted" />
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
                {items.map((item) => (
                    <Link
                        key={item.slug}
                        href={`/food/${item.slug}`}
                        className="flex flex-col items-center gap-2 flex-shrink-0 w-20"
                    >
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-black">
                            <Image
                                src={item.image}
                                alt={item.label}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-xs text-content text-center leading-tight line-clamp-2">
                            {item.label}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}