import { LuDot } from "react-icons/lu"
import { TbCurrencyNaira } from "react-icons/tb"
import { MoveRight, ArrowLeft, Calendar, Clock, MapPin, MoveLeft, XCircle } from "lucide-react"
import { GoDotFill } from "react-icons/go"
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
import EventLocationMap from "@/components/event-comps/EventLocationMap"

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
  category: string
  tags: string[]
  tickets: Ticket[]
  lineup: LineupArtist[]
  // When true: card shows a red "Sold Out" badge instead of price, and
  // this detail page disables the "Get Tickets" CTA, replacing it with a
  // non-clickable "Sold Out" button.
  soldOut?: boolean
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
    category: "Concert",
    tags: ["Concert", "18+"],
    soldOut: true, // headliner event — highest demand, marked sold out
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
    category: "Campus",
    tags: ["Campus"],
    soldOut: true, // small venue (Convocation Hall) + well-known comedian
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
  {
    slug: "queen-birthday",
    image: BirthdayImage,
    date: "SAT 28",
    price: "₦6,000",
    title: "Queen Tima's Birthday Party",
    location: "The Lounge, GRA",
    time: "6pm",
    category: "Nightlife",
    tags: ["Nightlife", "18+"],
    soldOut: true, // 18+ exclusive party — naturally capped capacity
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

  const { tickets, lineup, soldOut } = event

  return (
    <section className="flex flex-col gap-4">

      <Link href={`/events`} className="w-fit flex items-center gap-2 bg-lime text-ink font-bold font-mono text-xs lg:text-sm px-4 py-2  lg:px-2 lg:py-1.5 rounded-xl border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:opacity-90 transition flex-shrink-0">
        <MoveLeft strokeWidth={3} width={14} height={14} />Go Back
      </Link>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        <div className="w-full lg:w-[45%] flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">

          {/* Event image */}
          <div className="relative w-full aspect-square sm:aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-line/10">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className={`object-cover ${soldOut ? "grayscale-[30%] opacity-80" : ""}`}
              priority
            />
            {soldOut && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                <span className="rotate-[-6deg] border-2 border-red-500 bg-red-500/90 text-white font-black font-mono text-lg px-6 py-2 rounded-md tracking-wide">
                  SOLD OUT
                </span>
              </div>
            )}
          </div>

          {/* CTA — disabled red "Sold Out" button when the event has no
              tickets left, instead of the normal lime "Get Tickets" link. */}
          {soldOut ? (
            <span
              aria-disabled="true"
              className="flex items-center justify-center gap-2 bg-red-500 text-white font-black text-xl py-4 rounded-2xl border-2 border-red-700 cursor-not-allowed opacity-90"
            >
              <XCircle size={20} />
              Sold Out
            </span>
          ) : (
            <Link
              href={`/events/${event.slug}/tickets`}
              className="flex items-center justify-center gap-2 bg-lime text-ink font-black text-xl py-4 rounded-2xl border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              Get Tickets
              <MoveRight size={20} />
            </Link>
          )}
        </div>

        {/* RIGHT — all event details */}
        <div className="w-full lg:w-[55%] flex flex-col gap-5">

          {/* Title */}
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-content leading-tight">
              {event.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {soldOut ? (
                <span className="flex items-center gap-1 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Sold Out
                </span>
              ) : (
                <span className="flex items-center gap-1 bg-lime text-ink text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  <GoDotFill className="animate-pulse" /> Tonight
                </span>
              )}
              {event.tags.map(tag => (
                <span key={tag} className="border border-line/20 text-content-muted rounded-full px-2 py-0.5 text-[10px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metadata rows — tix.africa style */}
          <div className="flex flex-col gap-3 border-t border-b border-line/10 py-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-line/15 bg-panel flex items-center justify-center flex-shrink-0">
                <Calendar size={15} className="text-content-muted" />
              </div>
              <div>
                <p className="text-xs text-content-muted">Date</p>
                <p className="text-sm font-medium text-content">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-line/15 bg-panel flex items-center justify-center flex-shrink-0">
                <Clock size={15} className="text-content-muted" />
              </div>
              <div>
                <p className="text-xs text-content-muted">Time</p>
                <p className="text-sm font-medium text-content">Doors {event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-line/15 bg-panel flex items-center justify-center flex-shrink-0">
                <MapPin size={15} className="text-content-muted" />
              </div>
              <div>
                <p className="text-xs text-content-muted">Location</p>
                <p className="text-sm font-medium text-content">{event.location}</p>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-base text-content">About this event</h2>
            <p className="text-sm text-content-muted leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cum nihil facilis sit
              cupiditate vitae nesciunt reiciendis animi quasi error autem vero tempore fugiat
              molestiae quos eos, accusamus velit excepturi? Enim adipisci fugiat pariatur officiis
              vitae ratione a consectetur odit dignissimos debitis.
            </p>
          </div>

          {/* Line Up */}
          {lineup.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-base text-content">Line Up</h2>
              <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
                {lineup.map((artist) => (
                  <div
                    key={artist.name}
                    className="flex items-center gap-3 rounded-xl p-3 border border-line/10 bg-panel w-full sm:w-auto sm:flex-1"
                  >
                    <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border border-line/15">
                      <Image src={artist.image} alt={artist.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-content">{artist.name}</p>
                      <p className="text-xs text-content-muted">{artist.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <EventLocationMap location={event.location} />

        </div>
      </div>

    </section>
  )
}