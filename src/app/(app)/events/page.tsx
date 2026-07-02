import Link from "next/link";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { ArrowDown, MoveRight } from 'lucide-react';
import { TbCurrencyNaira } from "react-icons/tb";
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
        <h2 className="text-3xl text-left lg:text-left font-black tracking-tight md:text-4xl lg:text-5xl font-display text-content leading-none">
          What&apos;s on{" "}
          <span className="text-ink bg-lime px-1 py-1 inline-block transform-rotate-1">
            this week.
          </span>
        </h2>
      </div>

      {/* FEATURED EVENT SECTION (Mirrors Food Carousel Styling Exactly) */}
      <main className="mt-[2px]">
        {/* <h1 className="text-3xl text-center lg:text-left lg:text-5xl mt-1 font-medium font-display text-content">
          Featured <span className="text-accent-fg font-display">Event</span>
        </h1> */}

        <div className="relative mt-1 rounded-2xl overflow-hidden border border-white/10 bg-[#111111] shadow-[3px_3px_0px_0px_rgba(197,255,74,0.25)] touch-pan-y">

          {/* IMAGE TRACK */}
          <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
            <div className="flex h-full">
              <div className="relative min-w-full h-full flex-shrink-0">
                <Image
                  src={partyEvent}
                  alt="Featured event party"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-lime text-ink text-xs font-semibold px-3 py-1 rounded-full pointer-events-none">
              <GoDotFill className="animate-pulse" />
              Tonight
            </div>

            {/* Total Orders / Activity Counter */}
            <div className="absolute bottom-3 left-3 z-10 bg-black/80 text-white text-[11px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1.5 pointer-events-none">
              <GoDotFill className="text-lime animate-pulse" />
              Doors 7pm
            </div>
          </div>

          {/* INFO PANEL TRACK */}
          <div className="overflow-hidden">
            <div className="flex">
              <div className="min-w-full flex flex-col gap-3 px-4 py-4 sm:px-5 sm:py-5 text-white">

                <h2 className="font-mono text-base sm:text-xl font-medium leading-snug">
                  Fresher&apos;s Night &apos;26{" "}
                  <i className="text-lime not-italic">— Phyno live</i>
                </h2>

                <p className="flex items-center flex-wrap text-[11px] sm:text-sm text-white/60 gap-0.5">
                  UNILORIN Sports Hall
                  <LuDot />
                  3 min from Tanke
                  <LuDot />
                  8:00pm
                </p>

                <div className="flex gap-2 flex-wrap">
                  <span className="border border-white/25 rounded-full px-2.5 py-0.5 text-xs text-white/80">
                    Concert
                  </span>
                  <span className="border border-white/25 rounded-full px-2.5 py-0.5 text-xs text-white/80">
                    18+
                  </span>
                  <span className="border border-white/25 rounded-full px-2.5 py-0.5 text-xs text-white/80 flex items-center gap-1">
                    ★ 4.9 ({events[3].going} going)
                  </span>
                </div>

                <div className="flex items-end justify-between mt-1">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/50">From</span>
                    <span className="font-bold text-xl sm:text-2xl flex items-center">
                      <TbCurrencyNaira className="text-2xl sm:text-3xl" />
                      3,500
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/events/freshers-night-phyno-live"
                      className="flex items-center gap-2 bg-lime text-ink font-bold font-mono text-sm px-4 py-2 rounded-xl border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:opacity-90 transition"
                    >
                      Get ticket{" "}
                      <MoveRight strokeWidth={3} width={14} height={14} />
                    </Link>
                  </div>
                </div>

              </div>
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