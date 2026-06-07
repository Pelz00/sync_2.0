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

      <h1 className="text-muted font-mono text-[10px] lg:text-[12px] lg:tracking-[3px] flex items-center justify-start">
        EVENTS <LuDot /> ILORIN <LuDot /> THIS WEEK
      </h1>

      <div className="space-y-1">
        <h2 className="text-3xl text-center lg:text-left font-black tracking-tight md:text-4xl lg:text-5xl font-display text-neutral-900 leading-none">
          What&apos;s on
          <span className="text-[#C5FF4A] bg-black px-4 py-1 inline-block transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(197,255,74,1)]">
            this week.
          </span>
        </h2>
      </div>

      {/* FEATURED EVENT */}
      <main className="mt-2">
        <h1 className="text-3xl text-center lg:text-left lg:text-5xl mt-1 font-medium font-diplay">Featured <span className="text-[#8FCF04] font-display">Event</span></h1>
        <div className="flex flex-col lg:flex-row-reverse rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="relative w-full h-48 lg:w-[60%] lg:min-h-[400px]">
            <Image
              src={partyEvent}
              alt="party event"
              fill
              className="object-cover rounded-t-lg lg:rounded-tl-none lg:rounded-br-lg lg:rounded-tr-lg"
            />
          </div>

          <div className="w-full lg:w-[40%] lg:min-h-[400px] flex flex-col lg:justify-between lg:gap-2 p-3 lg:p-6 rounded-b-lg lg:rounded-l-lg text-white bg-black">
            <div className="flex items-center rounded-xl w-fit px-2 py-1 bg-[#C5FF4A] text-xs text-black">
              <GoDotFill className="animate-pulse" />
              <span className="ml-1">Tonight</span>
              <LuDot />
              8:00pm
            </div>

            <h2 className="font-mono w-full text-sm lg:text-[34px] lg:tracking-wider font-medium mt-2 lg:mt-0">
              Fresher&apos;s Night &apos;26{' '}
              <i className="text-[#C5FF4A]">— Phyno live</i>
            </h2>

            <p className="flex text-[10px] lg:text-[16px] items-center">
              UNILORIN Sports Hall <LuDot /> 3 min from Tanke <LuDot /> doors 7pm
            </p>

            <div className="flex gap-2 mt-1">
              <div className="border-1 rounded-xl px-2 py-[1px] text-xs lg:text-[16px] lg:px-3 lg:py-1 w-fit">Concert</div>
              <div className="border-1 rounded-xl px-2 py-[1px] text-xs lg:text-[16px] lg:px-3 lg:py-1 w-fit">18+</div>
            </div>

            <div className="mt-3 lg:mt-0 flex items-end justify-between">
              <div className="flex flex-col">
                <p className="text-sm opacity-70">From</p>
                <h1 className="font-bold text-lg lg:text-2xl flex items-center">
                  <TbCurrencyNaira className="text-xl lg:text-3xl" /> 3,500
                </h1>
              </div>
              <Link
                href="/events/freshers-night-phyno-live"
                className="flex gap-2 border-1 rounded-xl items-center text-xs lg:text-[20px] px-2 py-1 lg:px-3 lg:py-2 bg-[#C5FF4A] text-black font-bold font-mono cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Get ticket <MoveRight strokeWidth={3} width={12} height={20} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* UPCOMING HEADER */}
      <div className="flex justify-between items-center mt-3">
        <h3 className="flex items-center font-mono text-[10px] lg:text-xs tracking-widest uppercase text-muted">
          UPCOMING <LuDot /> EVENTS
        </h3>
        <p className="text-xs flex items-center text-muted">
          Sort: nearest <ArrowDown strokeWidth={2} height={12} width={15} />
        </p>
      </div>

      <EventCLients events={events} />


    </section>
  );
}