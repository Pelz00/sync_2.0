import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { Star } from 'lucide-react';
import { AlarmClock } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

interface FoodCardProps {
    slug: string
    image: StaticImageData | string
    name: string
    tags: string[]   // fixed: was string, now string[]
    rating: string
    location: string
    time: string
}

export default function FoodCards({ slug, image, name, tags, rating, location, time }: FoodCardProps) {
    return (
        <Card className="w-full h-fit">
            <div className="relative w-full h-48">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>

            <CardHeader className="px-5 py-2">
                <CardTitle className="flex items-center gap-3 text-xl">{name} <span className="bg-lime px-2 py-[0px] border-1 text-xs rounded-lg">Open</span></CardTitle>
                <CardDescription className="text-xs">
                    {tags.join(" · ")}
                </CardDescription>
            </CardHeader>

            <div className="flex justify-between items-end">
                <CardContent className="pb-2 font-display">
                    {/* <p>⭐ {rating}</p> */}
                    <p className="flex items-center"><Star strokeWidth={1} width={18} height={15} color="gold" fill="gold" /> {rating}</p>
                    {/* <p>🕐 {time}</p> */}
                    <p className="flex items-center gap-1"><AlarmClock strokeWidth={2} width={18} height={15} color="#4a8500" /> {time}</p>

                    <p className="flex items-center"><MapPin strokeWidth={2} width={18} height={15} color="red" fill="white" /> {location}</p>
                </CardContent>

                <CardFooter className=" border-t-0">
                    <Link
                        href={`/food/${slug}`}
                        className="bg-[#C5FF4A] px-3 py-1 rounded-lg cursor-pointer text-sm font-semibold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    >
                        Place Order
                    </Link>
                </CardFooter>
            </div>
        </Card>
    )
}