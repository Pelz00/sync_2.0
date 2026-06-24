"use client"

import { useState } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { Star, AlarmClock, MapPin, Bike, Dot, Heart } from "lucide-react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { useOptionalFavorites, type FavoriteFood } from "@/app/(app)/food/favorites-context"

type VendorStatus = "open" | "closed" | "delivery-only"

interface FoodCardProps {
    slug: string
    image: StaticImageData | string
    name: string
    tags: string[]
    rating: string
    reviewCount?: number
    location: string
    time: string
    category?: string
    isFree?: boolean
    deliveryTime?: string
    discount?: string
    status?: VendorStatus
    isTopRated?: boolean
}

const statusConfig: Record<VendorStatus, { label: string; className: string }> = {
    open: {
        label: "Open",
        className: "bg-lime-100 text-lime-deep border border-lime-300 dark:border-line/10",
    },
    closed: {
        label: "Closed",
        className: "bg-red-100 text-red-700 border border-red-300 dark:border-line/10",
    },
    "delivery-only": {
        label: "Delivery only",
        className: "bg-blue-100 text-blue-700 border border-blue-300 dark:border-line/10",
    },
}

export default function FoodCards({
    slug,
    image,
    name,
    tags,
    rating,
    reviewCount,
    location,
    time,
    category,
    isFree,
    deliveryTime,
    discount,
    status = "open",
    isTopRated,
}: FoodCardProps) {
    const { label, className } = statusConfig[status]

    const favorites = useOptionalFavorites()
    const [localFavourited, setLocalFavourited] = useState(false)
    const isFavourited = favorites ? favorites.isFavorite(slug) : localFavourited

    const [toast, setToast] = useState<"added" | "removed" | null>(null)

    function toggleFavourite(e: React.MouseEvent) {
        // Prevent the card link from firing when tapping the heart
        e.preventDefault()
        e.stopPropagation()

        let next: boolean

        if (favorites) {
            const item: FavoriteFood = {
                slug, image, name, tags, rating, reviewCount,
                location, time, category, isFree, deliveryTime, discount, status,
            }
            next = favorites.toggleFavorite(item)
        } else {
            next = !localFavourited
            setLocalFavourited(next)
        }

        setToast(next ? "added" : "removed")
        setTimeout(() => setToast(null), 2500)
    }

    return (
        <Link
            href={`/food/${slug}`}
            className="block w-full h-fit group"
            aria-label={`View ${name}`}
        >
            <Card className="w-full h-fit bg-panel border border-line/10 shadow-card relative group-hover:border-line/30 transition-colors cursor-pointer">

                {/* Toast notification */}
                <div
                    className={`absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md border transition-all duration-300 whitespace-nowrap
                        ${toast
                            ? "opacity-100 translate-y-0 pointer-events-none"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        }
                        ${toast === "added"
                            ? "bg-lime text-ink border-lime/40"
                            : "bg-panel text-content-muted border-line/20"
                        }`}
                >
                    <Heart
                        size={11}
                        className={toast === "added" ? "fill-ink text-ink" : "text-content-muted"}
                    />
                    {toast === "added" ? "Added to favourites" : "Removed from favourites"}
                </div>

                {/* Image */}
                <div className="relative w-full h-48">
                    {discount && (
                        <div className="absolute top-2 left-2 z-10 bg-lime text-ink text-[10px] font-semibold px-2.5 py-1 rounded-full">
                            -{discount}
                        </div>
                    )}

                    {/* Heart button — stops propagation so it doesn't trigger the card link */}
                    <button
                        type="button"
                        onClick={toggleFavourite}
                        aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
                        aria-pressed={isFavourited}
                        className="absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 cursor-pointer rounded-full bg-white shadow-md hover:scale-110 active:scale-95 transition-transform"
                    >
                        <Heart
                            size={18}
                            strokeWidth={2}
                            className={`transition-colors duration-200 ${isFavourited
                                    ? "fill-lime-deep text-lime-deep"
                                    : "text-green-700"
                                }`}
                        />
                    </button>

                    <Image src={image} alt={name} fill className="object-cover" />
                </div>

                {/* Name + tags */}
                <CardHeader className="px-5 py-2">
                    <CardTitle className="flex items-center gap-3 text-xl text-content">
                        {name}
                        <span className={`${className} px-2 py-[0px] text-xs rounded-lg font-semibold whitespace-nowrap`}>
                            {label}
                        </span>
                    </CardTitle>
                    <CardDescription className="text-xs text-content-muted">
                        {tags.join(" · ")}
                    </CardDescription>
                </CardHeader>

                {/* Meta info */}
                <CardContent className="pb-2 font-display text-content">
                    <p className="flex items-center gap-1">
                        <Star strokeWidth={1} width={18} height={15} color="gold" fill="gold" />
                        <span className="text-content font-medium">{rating}</span>
                        {reviewCount && (
                            <span className="text-content-muted text-xs">({reviewCount})</span>
                        )}
                    </p>
                    <p className="flex items-center gap-1">
                        <AlarmClock strokeWidth={2} width={18} height={15} className="text-accent-fg" />
                        <span className="text-content">{time}</span>
                    </p>
                    <p className="flex items-center gap-1">
                        <MapPin strokeWidth={2} width={18} height={15} className="text-warning" />
                        <span className="text-content">{location}</span>
                    </p>
                </CardContent>

                {/* Bottom row */}
                <div className="flex justify-between items-center px-5 py-3">
                    <div className="flex items-center text-sm text-content-muted">
                        {isFree ? (
                            <div className="flex items-center bg-lime text-ink text-xs font-semibold px-2 py-1 rounded-sm gap-1">
                                <Bike width={16} height={16} />
                                Free
                            </div>
                        ) : (
                            <div className="flex items-center text-content-muted text-xs gap-1">
                                <Bike width={16} height={16} />
                                Paid
                            </div>
                        )}
                        {deliveryTime && (
                            <>
                                <Dot />
                                <span className="text-xs">{deliveryTime}</span>
                            </>
                        )}
                    </div>

                    <CardFooter className="border-t-0 px-0 py-0">
                        {/* Stop propagation so clicking "Place Order" doesn't double-navigate */}
                        <span
                            onClick={e => e.stopPropagation()}
                            className={`px-3 py-1 rounded-lg text-sm font-semibold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${status === "closed"
                                    ? "bg-content-muted/20 text-content-muted pointer-events-none"
                                    : "bg-lime text-ink"
                                }`}
                        >
                            {status === "closed" ? "Unavailable" : "Place Order"}
                        </span>
                    </CardFooter>
                </div>
            </Card>
        </Link>
    )
}