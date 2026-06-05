import Image, { StaticImageData } from "next/image"
import { LuDot } from "react-icons/lu"
import { ArrowRight, Users } from "lucide-react"
import Link from "next/link"

interface EventCardProps {
    slug: string
    image: StaticImageData | string
    date: string
    price: string
    title: string
    location: string
    time: string
    going: number
}

export default function EventCards({
    slug,
    image,
    date,
    price,
    title,
    location,
    time,
    going
}: EventCardProps) {

    return (
        <Link href={`/events/${slug}`} className="w-full group block">
            <div className="w-full">

                {/* IMAGE */}
                <div className="w-full relative h-[200px] overflow-hidden rounded-t-lg">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* CONTENT */}
                <div className="rounded-b-lg px-3 py-3 shadow-lg bg-white">
                    <div className="flex items-center gap-2">
                        <div className="border-none rounded-xl px-[4px] py-[2px] w-fit lg:px-2 lg:py-[2px] bg-black font-medium text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-xs lg:text-sm">
                            {date}
                        </div>
                        <div className="text-sm lg:text-base bg-[#C5FF4A] font-medium text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] rounded-xl px-1 w-fit lg:px-2">
                            {price}
                        </div>
                    </div>

                    <h1 className="font-bold tracking-normal text-sm lg:text-base mt-2">
                        {title}
                    </h1>

                    <p className="text-sm lg:text-base flex items-center lg:mt-2">
                        {location} <LuDot /> {time}
                    </p>

                    <div className="flex justify-between items-center mt-1 lg:mt-3">
                        <div className="flex items-center justify-start text-sm gap-1">
                            <Users width={25} height={25} color="darkgreen" />
                            <span className="relative text-[14px] top-[3px] font-medium">
                                {going} going
                            </span>
                        </div>
                        <ArrowRight
                            strokeWidth={3}
                            color="#C5FF4A"
                            width={18}
                            className="cursor-pointer border-2 rounded-sm w-[25px] h-[25px] bg-black"
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}