import { LuDot } from "react-icons/lu"
import { TbCurrencyNaira } from "react-icons/tb"
import { MoveRight } from "lucide-react"
import { GoDotFill } from "react-icons/go"
import { ArrowLeft } from "lucide-react"
import Image, { StaticImageData } from "next/image"
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
import BirthdayImage from '@/assets/images/birthday.jpg'
import ShineImage from '@/assets/images/shine.jpg'
import TicketPanel from "@/components/event-comps/TicketPanel"

interface Ticket {
  id: string
  name: string
  desc: string
  price: number
}

interface LineupArtist {
  name: string
  role: string
  image: StaticImageData
}

interface EventDetail {
  slug: string
  image: StaticImageData
  date: string
  price: string
  title: string
  location: string
  time: string
  going: number
  category: string
  tags: string[]
  // tickets and lineup now live PER EVENT instead of being one shared
  // hardcoded set used for every event regardless of which one you opened.
  tickets: Ticket[]
  lineup: LineupArtist[]
}

const events: EventDetail[] = [
  {
    slug: "freshers-night-phyno-live",
    image: partyEvent,
    date: "TUE 28",
    price: "₦3,500",
    title: "Fresher's Night '26 — Phyno Live",
    location: "UNILORIN Sports Hall",
    time: "8pm",
    going: 312,
    category: "Concert",
    tags: ["Concert", "18+"],
    tickets: [
      { id: "regular", name: "Regular", desc: "Standing • open floor", price: 3500 },
      { id: "vip", name: "VIP", desc: "Reserved seats • meet & greet", price: 7500 },
      { id: "table", name: "Table for 4", desc: "Booth • drinks included", price: 25000 },
    ],
    lineup: [
      { name: "Phyno", role: "Headliner", image: taylorSwiftImage },
      { name: "DJ Neptune", role: "Artist", image: kendrickImage },
      { name: "Local opening", role: "Artist", image: lilYatchyImage },
    ],
  },
  {
    slug: "open-mic-night",
    image: OpenMicImage,
    date: "TUE 28",
    price: "₦1,000",
    title: "Open mic night",
    location: "Caffeine Co.",
    time: "6pm",
    going: 42,
    category: "Campus",
    tags: ["Campus"],
    tickets: [
      { id: "entry", name: "Entry", desc: "Walk-in • first come, first served", price: 1000 },
    ],
    lineup: [
      { name: "Tolu B", role: "Host / MC", image: taylorSwiftImage },
      { name: "MC Fresh", role: "Performer", image: kendrickImage },
    ],
  },
  {
    slug: "tech-meetup",
    image: techMeetUpImage,
    date: "WED 28",
    price: "Free",
    title: "Tech meetup: AI",
    location: "UNILORIN ICT",
    time: "4pm",
    going: 43,
    category: "Campus",
    tags: ["Campus", "Free"],
    tickets: [
      { id: "free", name: "Free entry", desc: "RSVP required • limited seats", price: 0 },
    ],
    lineup: [
      { name: "Dr. Adewale", role: "Speaker", image: taylorSwiftImage },
    ],
  },
  {
    slug: "book-club",
    image: BookClubImage,
    date: "THU 28",
    price: "₦500",
    title: "Book club: Achebe",
    location: "The Cube",
    time: "6pm",
    going: 19,
    category: "Campus",
    tags: ["Campus"],
    tickets: [
      { id: "entry", name: "Entry", desc: "Includes refreshments", price: 500 },
    ],
    lineup: [
      { name: "Rasheed a.k.a Vector", role: "Discussion lead", image: kendrickImage },
    ],
  },
  {
    slug: "afro-house-pool",
    image: partyImage,
    date: "FRI 28",
    price: "₦2,500",
    title: "Afro House Pool Party",
    location: "Crystal Park",
    time: "6pm",
    going: 203,
    category: "Nightlife",
    tags: ["Nightlife"],
    tickets: [
      { id: "regular", name: "Regular", desc: "Pool access • all day", price: 2500 },
      { id: "cabana", name: "Cabana for 4", desc: "Private cabana • drinks included", price: 18000 },
    ],
    lineup: [
      { name: "DJ Spinall", role: "Headliner", image: taylorSwiftImage },
      { name: "DJ Neptune", role: "Artist", image: kendrickImage },
      { name: "Teni", role: "Artist", image: lilYatchyImage },
    ],
  },
  {
    slug: "kwasu-unilorin",
    image: soccer,
    date: "SAT 28",
    price: "Free",
    title: "KWASU vs UNILORIN",
    location: "Sports complex",
    time: "2pm",
    going: 511,
    category: "Sports",
    tags: ["Sports", "Free"],
    tickets: [
      { id: "general", name: "General admission", desc: "Open seating", price: 0 },
    ],
    lineup: [],
  },
  {
    slug: "comedy",
    image: comedyImage,
    date: "SAT 28",
    price: "₦5,000",
    title: "Comedy: I Go Dye",
    location: "Convocation Hall",
    time: "8pm",
    going: 134,
    category: "Campus",
    tags: ["Campus"],
    tickets: [
      { id: "regular", name: "Regular", desc: "Standing • open floor", price: 5000 },
      { id: "vip", name: "VIP", desc: "Front row • meet & greet", price: 12000 },
    ],
    lineup: [
      { name: "I Go Dye", role: "Headliner", image: taylorSwiftImage },
      { name: "AY Comedian", role: "Guest", image: kendrickImage },
      { name: "Bovi", role: "Guest", image: lilYatchyImage },
    ],
  },
  {
    slug: "sunday-brunch-vibes",
    image: sundayBrunchImage,
    date: "SUN 28",
    price: "₦3,000",
    title: "Sunday brunch and vibes",
    location: "Flower garden",
    time: "1pm",
    going: 67,
    category: "Nightlife",
    tags: ["Nightlife"],
    tickets: [
      { id: "regular", name: "Regular", desc: "Brunch • live music", price: 3000 },
    ],
    lineup: [
      { name: "DJ Lyta", role: "Artist", image: taylorSwiftImage },
    ],
  },
  {
    slug: "hackathon-kickoff",
    image: hackathon,
    date: "MON 28",
    price: "Free",
    title: "Hackathon kickoff",
    location: "Skyview Hall",
    time: "10am",
    going: 298,
    category: "Campus",
    tags: ["Campus", "Free"],
    tickets: [
      { id: "free", name: "Free entry", desc: "Team registration required", price: 0 },
    ],
    lineup: [
      { name: "Segun Tech", role: "Lead organizer", image: kendrickImage },
      { name: "Ada Codes", role: "Organizer", image: lilYatchyImage },
    ],
  },
  // ── Newly added: each gets its own real image, tickets, and lineup ──
  {
    slug: "queen-birthday",
    image: BirthdayImage,
    date: "SAT 28",
    price: "₦6,000",
    title: "Queen Tima's Birthday Party",
    location: "The Lounge, GRA",
    time: "6pm",
    going: 156,
    category: "Nightlife",
    tags: ["Nightlife", "18+"],
    tickets: [
      { id: "regular", name: "Regular", desc: "Standing • open floor", price: 6000 },
      { id: "vip", name: "VIP", desc: "Reserved table • bottle service", price: 20000 },
    ],
    lineup: [
      { name: "DJ Cuppy", role: "Headliner", image: taylorSwiftImage },
      { name: "Surprise guest", role: "Artist", image: kendrickImage },
    ],
  },
  {
    slug: "paintball-party",
    image: ShineImage,
    date: "MON 30",
    price: "₦4,000",
    title: "Paintball Party",
    location: "Adventure Park, Malete",
    time: "8pm",
    going: 88,
    category: "Sports",
    tags: ["Sports", "Outdoor"],
    tickets: [
      { id: "regular", name: "Regular", desc: "Gear included • 2hr session", price: 4000 },
      { id: "team", name: "Team of 6", desc: "Gear included • private session", price: 20000 },
    ],
    lineup: [],
  },
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
        <p className="text-content-muted text-sm">Event not found.</p>
        <Link href="/events" className="flex items-center border border-line/15 w-fit px-2 py-1 rounded-lg bg-lime text-ink text-sm">
          <ArrowLeft strokeWidth={1} width={16} /> Back to events
        </Link>
      </section>
    )
  }

  // tickets and lineup now come from the matched event itself, not a
  // shared constant — so every event shows its own ticket tiers and its
  // own lineup instead of all events showing Fresher's Night's data.
  const { tickets, lineup } = event

  return (
    <section className="flex flex-col gap-3">
      <main>
        <Link href="/events" className="flex items-center border border-ink/20 font-mono font-medium w-fit px-2 py-1 rounded-lg bg-lime text-ink text-sm cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          <ArrowLeft strokeWidth={2} width={15} /> Events
        </Link>

        <div className="flex flex-col items-start gap-5 mt-5 lg:flex-row">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-[70%]">
            <div className="h-[300px] lg:h-[350px]">
              <Image src={event.image} alt={event.title} className="object-cover h-full w-full rounded-lg" />
            </div>

            <div className="mt-5 flex items-center gap-2">
              <div className="flex items-center rounded-xl w-fit px-2 py-[2px] bg-lime text-ink text-[10px]">
                <GoDotFill className="animate-pulse" /> Tonight <LuDot /> 8:00pm
              </div>
              {event.tags.map(tag => (
                <div key={tag} className="border border-line/20 text-content rounded-xl px-2 py-[1px] text-[10px]">{tag}</div>
              ))}
            </div>

            <h1 className="text-2xl mt-[6px] lg:text-[44px] text-content">{event.title}</h1>

            <p className="flex text-[10px] lg:text-[16px] items-center text-content-muted">
              {event.location} <LuDot /> doors {event.time}
            </p>

            <div className="border-y border-line/15 mt-3 py-2">
              <h1 className="font-bold text-content">About</h1>
              <p className="text-content-muted">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque cum nihil facilis sit cupiditate vitae nesciunt reiciendis animi quasi error autem vero tempore fugiat molestiae quos eos, accusamus velit excepturi?
                Enim adipisci fugiat pariatur officiis vitae ratione a consectetur odit dignissimos debitis. Odit a, architecto ipsam vitae sequi veniam. Iste tempora molestias optio. At laborum quasi cumque quaerat nesciunt placeat.</p>
            </div>

            {/* Line Up — only rendered when this event actually has one
                (e.g. KWASU vs UNILORIN and Paintball Party have none) */}
            {lineup.length > 0 && (
              <div className="mt-2 py-2 border-b border-line/15">
                <h1 className="font-bold text-content">Line Up</h1>
                <div className="flex mt-2 flex-col lg:flex-row gap-2">
                  {lineup.map((artist) => (
                    <div key={artist.name} className="flex w-full lg:w-[30%] rounded-lg p-2 items-center gap-2 shadow-card bg-panel">

                      {/* Circle image — position relative + overflow hidden is the key */}
                      <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border border-line/15">
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h1 className="font-bold text-content">{artist.name}</h1>
                        <p className="text-sm text-content-muted">{artist.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE — needs useState so it's a Client Component */}
          <TicketPanel tickets={tickets} />

        </div>
      </main>
    </section>
  )
}