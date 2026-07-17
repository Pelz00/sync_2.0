// event-card.tsx
import Image, { StaticImageData } from "next/image"
import { LuDot } from "react-icons/lu"
import { MoveRight } from "lucide-react"
import Link from "next/link"

interface LineupArtist {
    name: string
    avatar?: StaticImageData | string
}

interface EventCardProps {
    slug: string
    image: StaticImageData | string
    date: string
    price: string
    title: string
    location: string
    time: string
    lineup?: LineupArtist[]
    soldOut?: boolean
}

export default function EventCards({
    slug,
    image,
    date,
    price,
    title,
    location,
    time,
    lineup,
    soldOut = false,
}: EventCardProps) {
    // Show max 2 avatars + overflow count on the card
    const visibleLineup = lineup?.slice(0, 2) ?? []
    const extraCount = (lineup?.length ?? 0) - visibleLineup.length

    return (
        <Link href={`/events/${slug}`} className="w-full group block">
            <div className="w-full">
                {/* Image */}
                <div className="w-full relative h-[200px] overflow-hidden rounded-t-lg">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={`object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105 ${soldOut ? "grayscale-[40%] opacity-80" : ""
                            }`}
                    />
                    {soldOut && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                            <span className="rotate-[-6deg] border-2 border-red-500 bg-red-500/90 text-white font-black font-mono text-sm px-4 py-1 rounded-md tracking-wide">
                                SOLD OUT
                            </span>
                        </div>
                    )}
                </div>

                {/* Info panel */}
                <div className="rounded-b-lg px-3 py-3 shadow-card bg-panel border border-line/10 border-t-0">

                    {/* Date + price row */}
                    <div className="flex items-center gap-2">
                        <div className="border-none rounded-xl px-[4px] py-[2px] w-fit lg:px-2 lg:py-1 bg-ink font-medium text-cream text-xs lg:text-sm">
                            {date}
                        </div>
                        {soldOut ? (
                            <div className="text-sm lg:text-base bg-red-500 font-medium text-white rounded-xl px-2 py-0.5 w-fit">
                                Sold Out
                            </div>
                        ) : (
                            <div className="text-sm lg:text-base bg-lime font-medium text-ink rounded-xl px-1 py-0.5 w-fit lg:px-2">
                                {price}
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="font-bold tracking-normal text-sm lg:text-base mt-2 text-content">
                        {title}
                    </h1>

                    {/* Location + time */}
                    <p className="text-xs flex items-center mt-0.5 text-content-muted">
                        {location} <LuDot /> {time}
                    </p>

                    {/* Combined Lineup & CTA Footer Row */}
                    <div className="flex items-center justify-between gap-4 mt-2 min-h-[42px]">

                        {/* Lineup Section */}
                        {visibleLineup.length > 0 ? (
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="flex -space-x-2 flex-shrink-0">
                                    {visibleLineup.map((artist, i) => (
                                        <div
                                            key={i}
                                            className="relative w-6 h-6 rounded-full overflow-hidden border border-line/20"
                                        >
                                            {artist.avatar ? (
                                                <Image
                                                    src={artist.avatar}
                                                    alt={artist.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-lime text-[9px] font-bold text-ink">
                                                    {artist.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <p className="text-xs text-content-muted truncate">
                                    {visibleLineup.map(a => a.name).join(", ")}
                                    {extraCount > 0 && ` +${extraCount}`}
                                </p>
                            </div>
                        ) : (
                            // Spacer div keeps the ticket button pushed to the right side if lineup is empty
                            <div />
                        )}

                        {/* CTA Button Section */}
                        {soldOut ? (
                            <span className="flex items-center gap-2 bg-red-500 text-white font-bold font-mono text-xs lg:text-sm px-4 py-2 lg:px-2 lg:py-1.5 rounded-xl border-0 border-red-700 cursor-not-allowed flex-shrink-0 opacity-90">
                                Sold Out
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 bg-lime text-ink font-bold font-mono text-xs lg:text-sm px-4 py-2  lg:px-2 lg:py-1.5 rounded-xl border border-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:opacity-90 transition flex-shrink-0">
                                Get Tickets <MoveRight strokeWidth={3} width={14} height={14} />
                            </span>
                        )}

                    </div>

                </div>
            </div>
        </Link>
    )
}