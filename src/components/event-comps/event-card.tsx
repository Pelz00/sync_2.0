import Image, { StaticImageData } from "next/image"
import partyImage from "@/assets/images/party.jpeg"
import { LuDot } from "react-icons/lu"
import { Star } from "lucide-react"
import { ArrowRight } from 'lucide-react';



interface EventCardProps {
    image: StaticImageData | string
    date: string
    price: string
    title: string
    location: string
    time: string
    going: number
}


export default function EventCards({ image, date, price, title, location, time, going }: EventCardProps) {
    return (
        <div className="w-full">
            <div className="">
                <div className="w-full lg:w-[100%] relative h-[200px]">
                    <Image src={image} alt="party event" fill className="object-cover lg:w-[100%] rounded-t-lg" />
                </div>

                <div className="border-1 border-black-500 rounded-b-lg px-2 py-2">
                    <div className="flex items-center gap-2">
                        {/* date of the event */}
                        <div className="border-1 rounded-xl px-[4px] py-[2px] w-fit lg:px-2 lg:py-1 bg-[black] text-[white] text-xs lg:text-sm">{date}</div>

                        {/* price of the event */}
                        <div className="text-sm lg:text-base border-1 rounded-xl px-1 w-fit lg:px-2">{price}</div>
                    </div>
                    <h1 className="font-bold tracking-normal text-sm lg:text-base mt-2">{title}</h1>
                    <p className="text-sm lg:text-base flex items-center lg:mt-2">{location} <LuDot /> {time}</p>

                    <div className="flex justify-between items-center mt-1 lg:mt-3">
                        <span className="text-[darkgreen] flex items-center">
                            <Star
                                width={18}
                                height={25}
                                fill="darkgreen"
                                strokeWidth={0}
                                color="lightgreen" />
                            {going} going
                        </span>

                        <ArrowRight strokeWidth={1} width={18} className="cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    )
}