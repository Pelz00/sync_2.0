/**
 * ROUTE: /food
 * ACCESS: authenticated student
 * PURPOSE: Food vendor directory. Filters: cuisine, delivery vs pickup, rating.
 * Each card opens that vendor's menu.
 */
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LuDot } from 'react-icons/lu'
import { TbCurrencyNaira } from 'react-icons/tb'
import { MoveRight } from 'lucide-react'
import { GoDotFill } from 'react-icons/go'

import foodImageOne from '@/assets/images/food-one.avif'
import foodImageTwo from '@/assets/images/rice.jpg'
import foodImageThree from '@/assets/images/jollof rice.jpg'
import foodImageFive from '@/assets/images/food-image-5.webp'
import foodImageSix from '@/assets/images/food-image-4.avif'
import foodImageSeven from '@/assets/images/food-image-3.webp'
import fastFoodImageOne from '@/assets/images/fastfood-image-1.avif'
import fastFoodImageTwo from '@/assets/images/fastfood-image-2.avif'
import fastFoodImageThree from '@/assets/images/fastfood-image-3.avif'
import fastFoodImageFour from '@/assets/images/fastfood-image-4.avif'
import smallChopsImage from '@/assets/images/small-chops-1.avif'
import smallChopsImageTwo from '@/assets/images/small-chops-2.webp'

import FoodSection from '@/components/food-comps/food-section'

export const metadata: Metadata = { title: 'Food' }

const featuredFood = {
  slug: 'mama-put-tanke',
  name: 'Mama Put Tanke',
  tagline: 'Jollof rice, amala & Asun',
  location: 'Tanke Crescent',
  distance: '2 min from Tanke lodge',
  opens: '7:00am – 10pm',
  rating: 4.8,
  orders: 312,
  tags: ['Jollof', 'Local'],
  fromPrice: 800,
  badge: 'Trending Now',
}

const food = [
  {
    slug: 'mama-puta-tanke',
    image: foodImageOne,
    name: 'Mama Puta Tanke',
    tags: ['Jollof', 'Coconut rice'] as string[],
    rating: '4.8',
    location: 'Tanke Crescent',
    time: '7am – 10pm',
    category: 'Rice',
  },
  {
    slug: 'arena',
    image: foodImageTwo,
    name: 'Arena',
    tags: ['Rice', 'Beans'] as string[],
    rating: '4.5',
    location: 'Tanke Lodge',
    time: '9am – 9pm',
    category: 'Rice',
  },
  {
    slug: 'spit-africana',
    image: foodImageThree,
    name: 'Spit Africana',
    tags: ['Toast bread', 'Island Sandwich'] as string[],
    rating: '4.3',
    location: 'Caffeine Co.',
    time: '7am – 2pm',
    category: 'Breakfast',
  },
  {
    slug: 'iya-afusa',
    image: foodImageSix,
    name: 'Iya Afusa',
    tags: ['Ofada rice', 'Ewa Agoyin'] as string[],
    rating: '4.7',
    location: 'Basin Area',
    time: '8am – 8pm',
    category: 'Swallow',
  },
  {
    slug: 'amala-joint',
    image: foodImageFive,
    name: 'Amala Joint',
    tags: ['Amala', 'Iyan', 'Eba'] as string[],
    rating: '4.6',
    location: 'Caffeine Co.',
    time: '8am – 11pm',
    category: 'Swallow',
  },
  {
    slug: 'krafties-kitchen',
    image: fastFoodImageOne,
    name: 'Krafties Kitchen',
    tags: ['Chicken and Chips', 'Burgers'] as string[],
    rating: '4.4',
    location: 'Tanke Junction',
    time: '10am – 10pm',
    category: 'Fast Food',
  },
  {
    slug: 'chop-life',
    image: fastFoodImageTwo,
    name: 'Chop Life',
    tags: ['pizza', 'Shawarma', 'Loaded Fries'] as string[],
    rating: '4.5',
    location: 'GRA',
    time: '11am – 11pm',
    category: 'Fast Food',
  },
  {
    slug: 'small-chops-palace',
    image: smallChopsImage,
    name: 'Small Chops Palace',
    tags: ['Donut', 'Puff Puff'] as string[],
    rating: '4.6',
    location: 'Tanke',
    time: '12pm – 9pm',
    category: 'Small Chops',
  },
  {
    slug: 'tasty-munch',
    image: smallChopsImageTwo,
    name: 'Tasty Munch',
    tags: ['Tortia Chips', 'Samosa'] as string[],
    rating: '4.3',
    location: 'Caffeine Co.',
    time: '10am – 8pm',
    category: 'Small Chops',
  }
]

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/food</p>

      <h1 className="font-display text-section text-content">
        What are you <span className="text-[#4A8500]">Chopping</span> tonight?
      </h1>

      {/* Featured food card */}
      <main className="mt-2">
        <h1 className="text-3xl text-center lg:text-left lg:text-5xl mt-1 font-medium font-display">
          Trending <span className="text-[#4A8500] font-display">Food</span>
        </h1>

        <div className="flex flex-col lg:flex-row-reverse rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">

          {/* Image */}
          <div className="relative w-full h-48 lg:w-[60%] lg:min-h-[400px]">
            <Image
              src={foodImageSeven}
              alt={featuredFood.name}
              fill
              className="object-cover rounded-t-lg lg:rounded-tl-none lg:rounded-br-lg lg:rounded-tr-lg"
            />
            <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] lg:text-xs font-mono px-2 py-1 rounded-lg flex items-center gap-1">
              <GoDotFill className="text-[#C5FF4A] animate-pulse" />
              {featuredFood.orders}+ orders today
            </div>
          </div>

          {/* Info panel */}
          <div className="w-full lg:w-[40%] lg:min-h-[400px] flex flex-col lg:justify-between lg:gap-2 p-3 lg:p-6 rounded-r-0 lg:rounded-l-lg text-white bg-black">

            <div className="flex items-center rounded-xl w-fit px-2 py-1 bg-[#C5FF4A] text-xs text-black">
              <GoDotFill className="animate-pulse" />
              <span className="ml-1">{featuredFood.badge}</span>
              <LuDot />
              Open now
            </div>

            <h2 className="font-mono w-full text-sm lg:text-[34px] lg:tracking-wider font-medium mt-2 lg:mt-0">
              {featuredFood.name}{' '}
              <i className="text-[#C5FF4A]">— {featuredFood.tagline}</i>
            </h2>

            <p className="flex text-[10px] lg:text-[16px] items-center flex-wrap">
              {featuredFood.location}
              <LuDot />
              {featuredFood.distance}
              <LuDot />
              {featuredFood.opens}
            </p>

            <div className="flex gap-2 mt-1">
              {featuredFood.tags.map((tag) => (
                <div key={tag} className="border-1 rounded-xl px-2 py-[1px] text-xs lg:text-[16px] lg:px-3 lg:py-1 w-fit">
                  {tag}
                </div>
              ))}
              <div className="border-1 rounded-xl px-2 py-[1px] text-xs lg:text-[16px] lg:px-3 lg:py-1 w-fit flex items-center gap-1">
                ★ {featuredFood.rating}
              </div>
            </div>

            <div className="mt-3 lg:mt-0 flex items-end justify-between">
              <div className="flex flex-col">
                <p className="text-sm opacity-70">From</p>
                <h1 className="font-bold text-lg lg:text-2xl flex items-center">
                  <TbCurrencyNaira className="text-xl lg:text-3xl" />
                  {featuredFood.fromPrice.toLocaleString()}
                </h1>
              </div>
              <Link
                href={`/food/${featuredFood.slug}`}
                className="flex gap-2 border-1 rounded-xl items-center text-xs lg:text-[20px] px-2 py-1 lg:px-3 lg:py-2 bg-[#C5FF4A] text-black font-bold font-mono cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Order now <MoveRight strokeWidth={3} width={12} height={20} />
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Filterable food grid */}
      <FoodSection food={food} />

    </section>
  )
}