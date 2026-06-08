import { LuDot } from "react-icons/lu"
import { TbCurrencyNaira } from "react-icons/tb"
import { MoveRight } from "lucide-react"
import { GoDotFill } from "react-icons/go"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from 'next'

import partyEvent from '@/assets/images/partyImage.jpg'
import OpenMicImage from '@/assets/images/OpenMic.jpg'
import techMeetUpImage from '@/assets/images/techmeet.jpg'
import soccer from '@/assets/images/soccer.jpg'
import BookClubImage from '@/assets/images/bookclub.jpg'
import sundayBrunchImage from '@/assets/images/sundaybrunch.jpg'
import comedyImage from '@/assets/images/comedy.jpg'
import hackathon from '@/assets/images/hackathon.jpg'
import partyImage from "@/assets/images/party.jpeg"
import taylorSwiftImage from '@/assets/images/taylor-swift.jpg'
import kendrickImage from '@/assets/images/kendrick.jpg'
import lilYatchyImage from '@/assets/images/lil-yatchy.jpg'
import TicketPanel from "@/components/event-comps/TicketPanel"

const events = [
  { slug: "freshers-night-phyno-live", image: partyEvent, date: "TUE 28", price: "₦3,500", title: "Fresher's Night '26 — Phyno Live", location: "UNILORIN Sports Hall", time: "8pm", going: 312, category: "Concert", tags: ["Concert", "18+"] },
  { slug: "open-mic-night", image: OpenMicImage, date: "TUE 28", price: "₦1,000", title: "Open mic night", location: "Caffeine Co.", time: "6pm", going: 42, category: "Campus", tags: ["Campus"] },
  { slug: "tech-meetup", image: techMeetUpImage, date: "WED 28", price: "Free", title: "Tech meetup: AI", location: "UNILORIN ICT", time: "4pm", going: 43, category: "Campus", tags: ["Campus", "Free"] },
  { slug: "book-club", image: BookClubImage, date: "THU 28", price: "₦500", title: "Book club: Achebe", location: "The Cube", time: "6pm", going: 19, category: "Campus", tags: ["Campus"] },
  { slug: "afro-house-pool", image: partyImage, date: "FRI 28", price: "₦2,500", title: "Afro House Pool Party", location: "Crystal Park", time: "6pm", going: 203, category: "Nightlife", tags: ["Nightlife"] },
  { slug: "kwasu-unilorin", image: soccer, date: "SAT 28", price: "Free", title: "KWASU vs UNILORIN", location: "Sports complex", time: "2pm", going: 511, category: "Sports", tags: ["Sports", "Free"] },
  { slug: "comedy", image: comedyImage, date: "SAT 28", price: "₦5,000", title: "Comedy: I Go Dye", location: "Convocation Hall", time: "8pm", going: 134, category: "Campus", tags: ["Campus"] },
  { slug: "sunday-brunch-vibes", image: sundayBrunchImage, date: "SUN 28", price: "₦3,000", title: "Sunday brunch and vibes", location: "Flower garden", time: "1pm", going: 67, category: "Nightlife", tags: ["Nightlife"] },
  { slug: "hackathon-kickoff", image: hackathon, date: "MON 28", price: "Free", title: "Hackathon kickoff", location: "Skyview Hall", time: "10am", going: 298, category: "Campus", tags: ["Campus", "Free"] },
]
const lineup = [
  { name: "Phyno", role: "Headliner", image: taylorSwiftImage },
  { name: "DJ Neptune", role: "Artist", image: kendrickImage },
  { name: "Local opening", role: "Artist", image: lilYatchyImage },
]


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = events.find(e => e.slug === slug)
  return { title: event?.title ?? 'Event detail' }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = events.find(e => e.slug === slug)

  if (!event) {
    return (
      <section className="flex flex-col gap-3">
        <p className="text-muted text-sm">Event not found.</p>
        <Link href="/events" className="flex items-center border-1 w-fit px-2 py-1 rounded-lg bg-[#C5FF4A] text-sm">
          <ArrowLeft strokeWidth={1} width={16} /> Back to events
        </Link>
      </section>
    )
  }

  const tickets = [
    { id: "regular", name: "Regular", desc: "Standing • open floor", price: 3500 },
    { id: "vip", name: "VIP", desc: "Reserved seats • meet & greet", price: 7500 },
    { id: "table", name: "Table for 4", desc: "Booth • drinks included", price: 25000 },
  ]

  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/events/{slug}</p>

      <main>
        <Link href="/events" className="flex items-center border-1 font-mono font-medium w-fit px-2 py-1 rounded-lg bg-[#C5FF4A] text-sm cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          <ArrowLeft strokeWidth={2} width={15} /> Events
        </Link>

        <div className="flex flex-col items-start gap-5 mt-5 lg:flex-row">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-[70%]">
            <div className="h-[300px] lg:h-[350px]">
              <Image src={event.image} alt={event.title} className="object-cover h-full w-full rounded-lg" />
            </div>

            <div className="mt-5 flex items-center gap-2">
              <div className="flex items-center rounded-xl w-fit px-2 py-[2px] bg-[#C5FF4A] text-[10px]">
                <GoDotFill className="animate-pulse" /> Tonight <LuDot /> 8:00pm
              </div>
              {event.tags.map(tag => (
                <div key={tag} className="border-1 rounded-xl px-2 py-[1px] text-[10px]">{tag}</div>
              ))}
            </div>

            <h1 className="text-2xl mt-[6px] lg:text-[44px]">{event.title}</h1>

            <p className="flex text-[10px] lg:text-[16px] items-center">
              {event.location} <LuDot /> doors {event.time}
            </p>

            <div className="border-y-1 mt-3 py-2">
              <h1 className="font-bold">About</h1>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque cum nihil facilis sit cupiditate vitae nesciunt reiciendis animi quasi error autem vero tempore fugiat molestiae quos eos, accusamus velit excepturi?
                Enim adipisci fugiat pariatur officiis vitae ratione a consectetur odit dignissimos debitis. Odit a, architecto ipsam vitae sequi veniam. Iste tempora molestias optio. At laborum quasi cumque quaerat nesciunt placeat.</p>
            </div>

            <div className="mt-2 py-2 border-b-1">
              <h1 className="font-bold">Line Up</h1>
              <div className="flex mt-2 flex-col lg:flex-row gap-2">
                {lineup.map((artist) => (
                  <div key={artist.name} className="flex w-full lg:w-[30%] rounded-lg p-2 items-center gap-2 shadow-lg bg-white">

                    {/* Circle image — position relative + overflow hidden is the key */}
                    <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border-1">
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h1 className="font-bold">{artist.name}</h1>
                      <p className="text-sm text-muted">{artist.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — needs useState so it's a Client Component */}
          <TicketPanel
            tickets={tickets}
            event={{
              title: event.title,
              location: event.location,
              date: event.date,
              time: event.time,
            }}
          />

        </div>
      </main>
    </section>
  )
}