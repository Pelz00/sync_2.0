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
    isFree?: boolean
    deliveryTime?: string
    discount?: string
    status?: VendorStatus
    isTopRated?: boolean
}

const statusConfig: Record<VendorStatus, { label: string; className: string }> = {
    open: {
        label: "Open",
        className:
            "bg-lime-100 text-lime-deep border border-lime-300 dark:border-line/10",
    },
    closed: {
        label: "Closed",
        className:
            "bg-red-100 text-red-700 border border-red-300 dark:border-line/10",
    },
    "delivery-only": {
        label: "Delivery only",
        className:
            "bg-blue-100 text-blue-700 border border-blue-300 dark:border-line/10",
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
    isFree,
    deliveryTime,
    discount,
    status = "open",
    isTopRated,
}: FoodCardProps) {
    const { label, className } = statusConfig[status]

    return (
        <Card className="w-full h-fit bg-panel border border-line/10 shadow-card">
            {/* Image */}
            <div className="relative w-full h-48">
                {discount && (
                    <div className="absolute top-2 left-2 z-10 bg-lime text-ink text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        -{discount}
                    </div>
                )}

                <button
                    type="button"
                    className="absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 cursor-pointer rounded-full bg-white shadow-md hover:scale-105 transition-transform"
                >
                    <Heart size={18} className="text-green-700" strokeWidth={2} />
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
                        <span className="text-content-muted text-xs">
                            ({reviewCount})
                        </span>
                    )}
                </p>

                <p className="flex items-center gap-1">
                    <AlarmClock
                        strokeWidth={2}
                        width={18}
                        height={15}
                        className="text-accent-fg"
                    />
                    <span className="text-content">{time}</span>
                </p>

                <p className="flex items-center gap-1">
                    <MapPin
                        strokeWidth={2}
                        width={18}
                        height={15}
                        className="text-warning"
                    />
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
                    <Link
                        href={`/food/${slug}`}
                        className={`px-3 py-1 rounded-lg cursor-pointer text-sm font-semibold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:opacity-90 transition-opacity ${status === "closed"
                            ? "bg-content-muted/20 text-content-muted pointer-events-none"
                            : "bg-lime text-ink"
                            }`}
                        aria-disabled={status === "closed"}
                    >
                        {status === "closed" ? "Unavailable" : "Place Order"}
                    </Link>
                </CardFooter>
            </div>
        </Card>
    )
}