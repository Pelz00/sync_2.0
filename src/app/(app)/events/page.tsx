/**
 * ROUTE: /events
 * ACCESS: authenticated student
 * PURPOSE: Events listing - concerts, parties, campus events. Date filter, category chips, grid of cards.
 * BUILT HERE: Date filter, <Chip> categories, event card grid, <Pagination>.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
// "use client"
import Link from "next/link";
import Image from "next/image";
import partyImage from "@/assets/images/party.jpeg"
import { GoDotFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import EventCards from "@/components/event-comps/event-card";
import { ArrowDown } from 'lucide-react';
import { TbCurrencyNaira } from "react-icons/tb";
import { MoveRight } from 'lucide-react';
import EventCLients from "@/components/event-comps/EventsClient";
import type { Metadata } from 'next';
import { slug } from "@/lib/validations";

export const metadata: Metadata = { title: 'Events' };

export default function Page() {
  const events = [
    {
      slug: "open-mic-night",
      image: partyImage,
      date: "TUE 28",
      price: "#1,000",
      title: "Open mic night",
      location: "Caffeine Co.",
      time: "6pm",
      going: 42
    },
    {
      slug: "tech-meetup",
      image: partyImage,
      date: "WED 28",
      price: "Free",
      title: "Tech meetup: AI",
      location: "UNILORIN ICT",
      time: "4pm",
      going: 42
    },
    {
      slug: "book-club",
      image: partyImage,
      date: "THU 28",
      price: "#500",
      title: "Book club: Achebe",
      location: "The Cube",
      time: "6pm",
      going: 42
    },
    {
      slug: "afro-house-pool",
      image: partyImage,
      date: "FRI 28",
      price: "#2,500",
      title: "Afro House Pool Party",
      location: "Crystal Park",
      time: "6pm",
      going: 42
    },
    {
      slug: "kwasu-unilorin",
      image: partyImage,
      date: "SAT 28",
      price: "Free",
      title: "KWASU vs UNILORIN",
      location: "Sports complex",
      time: "2pm",
      going: 42
    }, {
      slug: "comedy",
      image: partyImage,
      date: "SAT 28",
      price: "#5,000",
      title: "Comedy: I Go Dye",
      location: "Convocation Hall",
      time: "8pm",
      going: 42
    },
    {
      slug: "sunday-brunch-vibes",
      image: partyImage,
      date: "SUN 28",
      price: "#3,000",
      title: "Sunday brunch and vibes",
      location: "Flower garden",
      time: "1am",
      going: 42
    },
    {
      slug: "hackathon-kickoff",
      image: partyImage,
      date: "MON 28",
      price: "Free",
      title: "Hackathon kickoff",
      location: "Skyview Hall",
      time: "10am",
      going: 42
    }
  ]

  const eventData = events.map((event, index) => {
    return (
      <EventCards
        key={index}
        {...event}
      />
    )
  })

  return (
    <section className="flex flex-col gap-3">
      {/* Come back later to use the dot icon */}
      <h1 className="text-muted font-mono text-[10px] lg:text-[12px] lg:tracking-[3px] flex items-center justify-start">
        EVENTS <LuDot /> ILORIN <LuDot /> THIS WEEK
      </h1>


      <div className='flex flex-col lg:flex lg:flex-row lg:justify-between lg:items-center'>
        <h2 className="text-2xl font-bold lg:text-section lg:text-ink lg:font-display">
          What&apos;s on, <span className="text-lime-deep">this week.</span>
        </h2>

        <div className=' mt-2 lg:mt-0 flex items-center justify-center lg:justify-normal lg:flex lg:flex-row lg:block gap-1 lg:gap-2'>
          {/* <div className='border-1 rounded-lg px-1 py-0 lg:px-3 lg:py-1 cursor-pointer text-xs lg:text-sm bg-[black] text-[white] font-bold'>All</div>
          <div className='border-1 rounded-lg px-1 py-0 lg:px-3 lg:py-1 cursor-pointer text-xs lg:text-sm'>Concert</div>
          <div className='border-1 rounded-lg px-1 py-0 lg:px-3 lg:py-1 cursor-pointer text-xs lg:text-sm'>Campus</div>
          <div className='border-1 rounded-lg px-1 py-0 lg:px-3 lg:py-1 cursor-pointer text-xs lg:text-sm'>Sports</div>
          <div className='border-1 rounded-lg px-1 py-0 lg:px-3 lg:py-1 cursor-pointer text-xs lg:text-sm'>Nightlife</div>
          <div className='border-1 rounded-lg px-1 py-0 lg:px-3 lg:py-1 cursor-pointer text-xs lg:text-sm'>Free</div> */}
          <EventCLients />
        </div>
      </div>

      <main className="mt-2">
        {/* <h1 className="text-4xl">Main <i>Event</i></h1> */}
        <div className="flex flex-col lg:flex-row rounded-lg lg:rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:p-0">
          <div className="relative w-full h-48 lg:h-auto lg:w-[61%] lg:min-h-[220px]">
            <Image
              src={partyImage}
              alt="party event"
              fill
              className="object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"
            />
          </div>
          <div className="w-full lg:w-[40%] flex flex-col lg:gap-2 p-3 lg:p-4 border-l-1 rounded-bl-lg lg:rounded-bl-none lg:border-1 lg:rounded-r-lg lg:border-l-0">
            <div className="flex items-center lg:border-1 mt-2 rounded-xl w-fit px-1 py-0 lg:px-2 lg:py-1 bg-[#C5FF4A] text-xs order-2 lg:order-0 hidden"><GoDotFill /> Tonight <LuDot /> 8:00pm</div>
            <h2 className="w-full text-sm block lg:tracking-wider font-medium lg:font-normal lg:text-[25px] order-1 lg:order-0">Fresher's Night '26 — Phyno live</h2>
            <p className="flex text-[10px] lg:text-[12px] items-center w-full font-bold lg:font-normal lg:w-fit order-3 lg:order-0">UNILORIN Sports Hall <LuDot /> 3 min from Tanke <LuDot /> doors 7pm</p>
            <div className="border-1 rounded-xl px-2 py-[1px] text-xs lg:text-[16px] lg:px-3 lg:py-1 w-fit order-4 lg:order-0">Concert</div>

            <div className="mt-3 lg:pt-1 lg:mt-4 lg:border-t-2 lg:border-dashed flex items-end justify-between order-5 lg:order-0">
              <div className="">
                <div className="flex flex-col items-start justify-between">
                  <p>From</p>
                  <h1 className="font-bold text-lg lg:text-2xl flex items-center gap-0"><TbCurrencyNaira className="font-bold text-xl lg:text-3xl" /> 3500</h1>
                </div>
              </div>
              <Link className="flex gap-2 border-1 rounded-xl items-center text-xs lg:text-[18px] px-1 py-[1px] lg:px-2 lg:py-1 bg-[#C5FF4A] cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" href="/events/freshers-night-phyno-live">
                Get ticket  <MoveRight strokeWidth={1} width={15} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <main className="mt-5">
        <div className="flex justify-between">
          <h3 className="flex items-center text-xs">UPCOMING <LuDot /> EVENTS</h3>
          <p className="text-xs flex items-center">Sort:nearest <ArrowDown strokeWidth={2} height={12} width={15} /></p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4 mt-2">
          {eventData}
        </div>
      </main>
    </section>
  );
}
