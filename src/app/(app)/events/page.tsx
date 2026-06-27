import Link from "next/link";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { ArrowDown } from 'lucide-react';
import EventCLients from "@/components/event-comps/EventsClient";
import type { Metadata } from 'next';
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

export const metadata: Metadata = { title: 'Events' };

// Featured row — tix.africa-style horizontal scroll of poster cards.
// Every slug below now points at a REAL event with its own image, tickets,
// and lineup in [slug]/page.tsx — queen-birthday and paintball-party were
// added as full events rather than borrowing afro-house-pool/comedy's data.
const featuredEvents = [
  {
    slug: "freshers-night-phyno-live",
    image: partyEvent,
    badge: "HIGHLIGHTED EVENT",
    title: "Fresher's Night '26 — Phyno Live",
    when: "Tonight, 8:00pm",
  },
  {
    slug: "queen-birthday",
    image: BirthdayImage,
    badge: "HIGHLIGHTED EVENT",
    title: "Queen Tima's Birthday Party",
    when: "Sat, Jun 28th, 6PM",
  },
  {
    slug: "paintball-party",
    image: ShineImage,
    badge: "HIGHLIGHTED EVENT",
    title: "Paintball Party",
    when: "Mon, Jun 30th, 8PM",
  },
]

export default function Page() {
  const events = [
    {
      slug: "open-mic-night",
      image: OpenMicImage,
      date: "TUE 28",
      price: "₦1,000",
      title: "Open mic night",
      location: "Caffeine Co.",
      time: "6pm",
      category: "Campus",
      lineup: [
        { name: "Tolu B", avatar: undefined },
        { name: "MC Fresh", avatar: undefined },
      ]
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
      lineup: [
        { name: "Dr. Adewale", avatar: undefined },
      ]
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
      lineup: [{
        name: "Rasheed a.k.a Vector"
      }]
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
      lineup: [
        { name: "DJ Spinall", avatar: taylorSwiftImage },
        { name: "DJ Neptune", avatar: kendrickImage },
        { name: "Teni", avatar: lilYatchyImage },
      ]
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
      // no lineup for a match
    },
    {
      slug: "comedy",
      image: comedyImage,
      date: "SAT 28",
      price: "₦5,000",
      title: "Comedy: I Go Dye",
      location: "Convocation Hall",
      time: "8pm",
      category: "Concert",
      lineup: [
        { name: "I Go Dye", avatar: taylorSwiftImage },
        { name: "AY Comedian", avatar: kendrickImage },
        { name: "Bovi", avatar: lilYatchyImage },
        { name: "Basketmouth", avatar: undefined },
      ]
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
      lineup: [
        { name: "DJ Lyta", avatar: taylorSwiftImage },
      ]
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
      lineup: [
        { name: "Segun Tech", avatar: undefined },
        { name: "Ada Codes", avatar: undefined },
        { name: "BuildCo", avatar: undefined },
      ]
    },
    // ── New entries so they also show up in the "Upcoming Events" grid,
    // not just the featured row ──
    // {
    //   slug: "queen-birthday",
    //   image: BirthdayImage,
    //   date: "SAT 28",
    //   price: "₦6,000",
    //   title: "Queen Tima's Birthday Party",
    //   location: "The Lounge, GRA",
    //   time: "6pm",
    //   category: "Nightlife",
    //   lineup: [
    //     { name: "DJ Cuppy", avatar: taylorSwiftImage },
    //     { name: "Surprise guest", avatar: kendrickImage },
    //   ]
    // },
    // {
    //   slug: "paintball-party",
    //   image: ShineImage,
    //   date: "MON 30",
    //   price: "₦4,000",
    //   title: "Paintball Party",
    //   location: "Adventure Park, Malete",
    //   time: "8pm",
    //   category: "Sports",
    //   // no lineup for a paintball session
    // },
  ]

  return (
    <section className="flex flex-col gap-3">

      <h1 className="text-content-muted font-mono text-[10px] lg:text-[12px] lg:tracking-[3px] flex items-center justify-start">
        EVENTS <LuDot /> ILORIN <LuDot /> THIS WEEK
      </h1>

      <div className="space-y-1">
        <h2 className="text-3xl text-left lg:text-left font-black tracking-tight md:text-4xl lg:text-5xl font-display text-content leading-none">
          What&apos;s on{" "}
          <span className="text-ink bg-lime px-1 py-1 inline-block transform-rotate-1">
            this week.
          </span>
        </h2>
      </div>

      {/* FEATURED ROW — horizontal scroll of poster cards, tix.africa style.
          Each card is a tall self-contained poster: full-bleed image, a
          "HIGHLIGHTED EVENT" eyebrow, title, and a date/time line — all
          stacked at the bottom of the image rather than split into a
          separate info panel below it. */}
      <main className="mt-1">
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1 snap-x snap-mandatory justify-center">
          {featuredEvents.map((ev) => (
            <Link
              key={ev.slug}
              href={`/events/${ev.slug}`}
              className="group relative flex-1 min-w-[260px] h-[420px] rounded-2xl overflow-hidden border border-line/10 shadow-card snap-start"
            >
              <Image
                src={ev.image}
                alt={ev.title}
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradient so white text stays legible over any part of the photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-1.5">
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/70">
                  {ev.badge}
                </span>
                <h3 className="font-display text-3xl font-bold text-white leading-snug">
                  {ev.title}
                </h3>
                <p className="flex items-center gap-1 text-sm text-white/80">
                  <GoDotFill className="text-lime animate-pulse" size={10} />
                  {ev.when}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* UPCOMING HEADER */}
      <div className="flex justify-between items-center mt-3">
        <h3 className="flex items-center font-mono text-[10px] lg:text-xs tracking-widest uppercase text-content-muted">
          UPCOMING <LuDot /> EVENTS
        </h3>
        <p className="text-xs flex items-center text-content-muted">
          Sort: nearest <ArrowDown strokeWidth={2} height={12} width={15} />
        </p>
      </div>

      <EventCLients events={events} />

    </section>
  );
}