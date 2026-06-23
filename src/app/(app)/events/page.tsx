import Link from "next/link";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { ArrowDown } from 'lucide-react';
import { TbCurrencyNaira } from "react-icons/tb";
import { MoveRight } from 'lucide-react';
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

export const metadata: Metadata = { title: 'Events' };

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
      going: 42,
      category: "Campus"
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
      category: "Campus"
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
      category: "Campus"
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
      category: "Nightlife"
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
      category: "Sports"
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
      category: "Concert"
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
      category: "Nightlife"
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
      category: "Campus"
    }
  ]

  return (
    <section className="flex flex-col gap-3">

      <h1 className="text-content-muted font-mono text-[10px] lg:text-[12px] lg:tracking-[3px] flex items-center justify-start">
        EVENTS <LuDot /> ILORIN <LuDot /> THIS WEEK
      </h1>

      <div className="space-y-1">
        <h2 className="text-3xl text-center lg:text-left font-black tracking-tight md:text-4xl lg:text-5xl font-display text-content leading-none">
          What&apos;s on
          <span className="text-ink bg-lime px-4 py-1 inline-block transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(197,255,74,1)] dark:shadow-[4px_4px_0px_0px_rgba(168,219,60,1)]">
            this week.
          </span>
        </h2>
      </div>

      {/* FEATURED EVENT */}
      <main className="mt-2">
        <h1 className="text-3xl text-center lg:text-left lg:text-5xl mt-1 font-medium font-display text-content">
          Featured <span className="text-accent-fg font-display">Event</span>
        </h1>

        <div className="relative mt-3 overflow-hidden rounded-2xl border border-line/10 bg-panel shadow-card">
          {/* Image fills the top on mobile, right 55% on desktop */}
          <div className="relative h-56 w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[55%]">
            <Image
              src={partyEvent}
              alt="party event"
              fill
              className="object-cover"
            />
            {/* Fade so the image blends into the panel instead of a hard edge */}
            <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent lg:bg-gradient-to-r lg:from-panel lg:via-panel/10 lg:to-transparent" />
          </div>

          {/* Text content */}
          <div className="relative flex flex-col gap-3 p-5 lg:w-[55%] lg:p-8">
            <div className="flex items-center gap-1 rounded-full w-fit px-3 py-1 bg-lime text-xs font-semibold text-ink">
              <GoDotFill className="animate-pulse" size={10} />
              Tonight
              <LuDot />
              8:00pm
            </div>

            <h2 className="font-display text-2xl font-semibold leading-tight text-content lg:text-4xl">
              Fresher&apos;s Night &apos;26{' '}
              <span className="text-lime-deep dark:text-lime italic">— Phyno live</span>
            </h2>

            <p className="flex items-center text-sm text-content-muted lg:text-base">
              UNILORIN Sports Hall <LuDot /> 3 min from Tanke <LuDot /> doors 7pm
            </p>

            <div className="flex gap-2">
              <div className="rounded-full border border-line/15 px-3 py-1 text-xs text-content lg:text-sm">Concert</div>
              <div className="rounded-full border border-line/15 px-3 py-1 text-xs text-content lg:text-sm">18+</div>
            </div>

            <div className="mt-2 flex items-end justify-between">
              <div className="flex flex-col">
                <p className="text-sm text-content-muted">From</p>
                <h1 className="flex items-center text-xl font-bold text-content lg:text-2xl">
                  <TbCurrencyNaira className="text-lg lg:text-2xl" /> 3,500
                </h1>
              </div>
              <Link
                href="/events/freshers-night-phyno-live"
                className="flex items-center gap-2 rounded-xl bg-lime px-4 py-2 text-sm font-bold text-ink shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 lg:text-base"
              >
                Get ticket <MoveRight strokeWidth={3} width={14} height={20} />
              </Link>
            </div>
          </div>
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