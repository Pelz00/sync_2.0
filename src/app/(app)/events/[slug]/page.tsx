/**
 * ROUTE: /events/[slug]
 * ACCESS: authenticated student
 * PURPOSE: Event detail + ticket purchase. Cover image, when/where, organiser block, ticket tiers, Paystack inline checkout.
 * BUILT HERE: Hero, tier selector (<RadioGroup>), <QuantityStepper>, organiser <VerifiedBadge>.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import Link from "next/link";
import { LuDot } from "react-icons/lu"
import { TbCurrencyNaira } from "react-icons/tb";
import { CirclePlus } from 'lucide-react';
import { CircleMinus } from 'lucide-react';
import { MoveRight } from 'lucide-react';
import { GoDotFill } from "react-icons/go";
import { ArrowLeft } from 'lucide-react';
import Image from "next/image";
import partyImage from "@/assets/images/party.jpeg"

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Event detail' };

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/events/{slug}</p>

      <main>
        <Link href="/events" className="flex items-center border-1 w-fit px-1 py-[1px] rounded-lg bg-[#C5FF4A] text-sm cursor-pointer"><ArrowLeft strokeWidth={1} width={16} /> Events</Link>
        <div className='flex items-start gap-5 mt-5'>

          <div className='w-full lg:w-[70%]'>
            <div className="h-[300px] lg:h-[350px]">
              <Image src={partyImage} alt="" className="object-cover h-[100%] w-full rounded-lg" />
            </div>

            <div className="flex flex-col lg:block">
              <div className="mt-5 flex items-center gap-2">
                <div className="flex items-center lg:border-1 mt-0 lg:mt-0 rounded-xl w-fit px-2 py-[2px] lg:px-2 lg:py-[6px] bg-[#C5FF4A] text-[10px] order-2 lg:order-0"><GoDotFill /> Tonight <LuDot /> 8:00pm</div>
                <div className="border-1 rounded-xl px-2 py-[1px] text-[10px] lg:text-[16px] lg:px-3 lg:py-1 w-fit order-4 lg:order-0">Concert</div>
              </div>
              <h1 className="text-2xl mt-[6px] lg:mt-[10px] lg:text-[44px] lg:tracking-wider lg:h-fit lg:block">{slug}</h1>
              <div className="lg:block">
                <p className="flex text-[10px] lg:text-[16px] items-center w-full font-normal lg:font-normal lg:w-fit">UNILORIN Sports Hall <LuDot /> 3 min from Tanke <LuDot /> doors 7pm</p>
              </div>

              {/* About Section */}
              <div className="border-y-1 lg:border-y-2 lg:border-dashed mt-3 py-2 lg:block">
                <h1 className="font-bold">About</h1>
                <p className="lg:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis reprehenderit excepturi pariatur veniam enim vero illum exercitationem saepe vel, natus id quia voluptates hic? Facilis assumenda exercitationem veritatis beatae consequuntur fuga.</p>
              </div>

              {/* Celebrity Lineup */}
              <div className="mt-[2px] py-2 lg:py-3 border-b-1 lg:border-b-2 lg:border-dashed lg:block">
                <h1 className="font-bold">Line Up</h1>
                <div className="flex mt-2 flex-col lg:flex-row justify-between gap-2 lg:gap-0">
                  <div className="border-2 flex lg:flex-row w-full lg:w-[30%] rounded-lg p-2 items-center gap-2">
                    <div className="border-2 h-10 w-10 rounded-[50%]"></div>
                    <div>
                      <h1 className="font-bold">Phyno</h1>
                      <p className="text-sm">Headliner</p>
                    </div>
                  </div>

                  <div className="border-2 flex lg:flex-row w-full lg:w-[30%] rounded-lg p-2 items-center gap-2">
                    <div className="border-2 h-10 w-10 rounded-[50%]"></div>
                    <div>
                      <h1 className="font-bold">DJ Neptune</h1>
                      <p className="text-sm">Support</p>
                    </div>
                  </div>

                  <div className="border-2 flex lg:flex-row w-full lg:w-[30%] rounded-lg p-2 items-center gap-2">
                    <div className="border-2 h-10 w-10 rounded-[50%]"></div>
                    <div>
                      <h1 className="font-bold">Local opening</h1>
                      <p className="text-sm">Sync student</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>


          <div className='hidden border-1 w-[30%] px-4 py-3 rounded-lg lg:sticky lg:block'>
            <h1>PICK YOUR TICKET</h1>

            <div className="border-1 flex justify-between items-start p-3 mt-2 rounded-lg">
              <div>
                <h1 className="font-bold text-lg">Regular</h1>
                <p className="flex items-center text-xs">Standing <LuDot /> open floor</p>
              </div>
              <h1 className="font-black text-xl flex items-center gap-0"><TbCurrencyNaira className="font-black text-2xl" /> 3500</h1>
            </div>

            <div className="border-1 flex justify-between items-start p-3 mt-2 rounded-lg">
              <div>
                <h1 className="font-bold text-lg">VIP</h1>
                <p className="flex items-center text-xs">Reserved seats <LuDot /> meet & greet</p>
              </div>
              <h1 className="font-black text-xl flex items-center gap-0"><TbCurrencyNaira className="font-black text-2xl" /> 7500</h1>
            </div>

            <div className="border-1 flex justify-between items-start p-3 mt-2 rounded-lg">
              <div>
                <h1 className="font-bold text-lg">Table for 4</h1>
                <p className="flex items-center text-xs">Booth <LuDot /> drinks included</p>
              </div>
              <h1 className="font-black text-xl flex items-center gap-0"><TbCurrencyNaira className="font-black text-2xl" /> 25000</h1>
            </div>

            <div className="border-y-2 border-dashed flex justify-between items-center p-3 mt-3">
              <p>Quantity </p>
              <div className="flex items-center gap-2">
                <CircleMinus strokeWidth={1} />
                <span className="text-lg">2</span>
                <CirclePlus strokeWidth={1} />
              </div>
            </div>


            <div className="border-1 flex flex-col p-3 mt-2 rounded-lg">
              <div className="flex justify-between items-center w-full">
                <p className="font-medium text-sm">2 <span>x</span> ticket type</p>
                <h1 className="flex items-center gap-0 text-lg font-medium"><TbCurrencyNaira className="font-black text-2xl" /> xxxx</h1>
              </div>

              <div className="flex justify-between items-center w-full">
                <p className="font-medium text-sm">Sync Fee</p>
                <h1 className="flex items-center gap-0 text-lg font-medium"><TbCurrencyNaira className="font-medium text-xl" /> 500</h1>
              </div>


              <div className="flex justify-between items-center w-full">
                <p className="font-medium text-sm">Total</p>
                <h1 className="flex items-center gap-0 text-lg font-medium"><TbCurrencyNaira className="font-medium text-xl" /> xxxx</h1>
              </div>
            </div>

            <button className="border-1 flex items-center rounded-lg mt-3 w-full justify-center gap-2 bg-[#C5FF4A] py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer">Buy 2 tickets <MoveRight strokeWidth={1} width={15} /></button>
            <div className="flex justify-center items-center mt-3 text-xs">
              <input type="checkbox" name="" id="" defaultChecked />
              QR ticket lands in your Sync wallet
            </div>
          </div>

        </div>
      </main>
    </section>
  );
}