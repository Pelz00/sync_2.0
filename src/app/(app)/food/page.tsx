import type { Metadata } from 'next'
import { LuDot } from 'react-icons/lu'
import { TbCurrencyNaira } from 'react-icons/tb'
import { MoveRight } from 'lucide-react'
import { GoDotFill } from 'react-icons/go'

import JollofOne from '@/assets/images/Food-Pics/Jollof/JollofOne.webp'
import JollofTwo from '@/assets/images/Food-Pics/Jollof/JollofTwo.webp'
import SwallowOne from '@/assets/images/Food-Pics/Swallow/SwallowOne.webp'
import SwallowTwo from '@/assets/images/Food-Pics/Swallow/SwallowTwo.webp'
import FastFoodOne from '@/assets/images/Food-Pics/Burgers and pizza/FastFoodTwo.avif'
import FastFoodTwo from '@/assets/images/Food-Pics/Burgers and pizza/FastFoodOne.avif'
import SmallChopsOne from '@/assets/images/Food-Pics/SmallChops/SmallChopOne.webp'
import SmallChopsTwo from '@/assets/images/Food-Pics/SmallChops/SmallChopTwo.webp'
import DrinkOne from '@/assets/images/Food-Pics/Drinks/DrinkOne.avif'
import DrinkTwo from '@/assets/images/Food-Pics/Drinks/DrinkTwo.avif'
import BreakFastOne from '@/assets/images/Food-Pics/BreakFast/BreakFastOne.webp'
import BreakFastTwo from '@/assets/images/Food-Pics/BreakFast/BreakFastTwo.webp'
import DesertOne from '@/assets/images/Food-Pics/Desert/DesertOne.webp'
import DesertTwo from '@/assets/images/Food-Pics/Desert/DesertFour.webp'
import PremiumOne from '@/assets/images/BBQ and cravings.webp'
import PremiumTwo from '@/assets/images/See lagos.webp'
import PremiumThree from '@/assets/images/Spicy corner.webp'
import FoodSection from '@/components/food-comps/food-section'
import FeaturedCarousel from '@/components/food-comps/food-carousel'

export const metadata: Metadata = { title: 'Food' }

const featuredItems = [
  {
    slug: 'mama-put-tanke',
    image: PremiumOne,
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
  },
  {
    slug: 'arena',
    image: PremiumTwo,
    name: 'Arena',
    tagline: 'Rice, beans & the good stuff',
    location: 'Tanke Lodge',
    distance: '5 min walk',
    opens: '9:00am – 9pm',
    rating: 4.5,
    orders: 198,
    tags: ['Rice', 'Beans'],
    fromPrice: 600,
    badge: 'Popular',
  },
  {
    slug: 'amala-joint',
    image: PremiumThree,
    name: 'Amala Joint',
    tagline: 'Amala, iyan & eba done right',
    location: 'Caffeine Co.',
    distance: '3 min from GRA',
    opens: '8:00am – 11pm',
    rating: 4.6,
    orders: 241,
    tags: ['Amala', 'Swallow'],
    fromPrice: 700,
    badge: 'Top Rated',
  },
]



const food = [
  {
    slug: 'mama-puta-tanke',
    image: JollofOne,
    name: 'Mama Puta Tanke',
    tags: ['Jollof', 'Coconut rice'] as string[],
    rating: '4.8',
    reviewCount: 312,
    location: 'Tanke Crescent',
    time: '7am – 10pm',
    category: 'Jollof',
    isFree: true,
    deliveryTime: '20–35 min',
    discount: '30% off',
    status: "open"
  },
  {
    slug: 'arena',
    image: JollofTwo,
    name: 'Arena',
    tags: ['Jollof combo', 'Chinese fried rice'] as string[],
    rating: '4.5',
    reviewCount: 198,
    location: 'Tanke Lodge',
    time: '9am – 9pm',
    category: 'Jollof',
    isFree: false,
    deliveryTime: '25–40 min',// no discount
    status: "closed"
  },
  {
    slug: 'spit-africana',
    image: SwallowOne,
    name: 'Spit Africana',
    tags: ['Iyan', 'Eba'] as string[],
    rating: '4.3',
    reviewCount: 120,
    location: 'Caffeine Co.',
    time: '7am – 2pm',
    category: 'Swallow',
    isFree: true,
    deliveryTime: '15–25 min',
    discount: '15% off',       // has promo
    status: "delivery-only"
  },
  {
    slug: 'iya-afusa',
    image: SwallowTwo,
    name: 'Iya Afusa',
    tags: ['Amala', 'Ewa Agoyin'] as string[],
    rating: '4.7',
    reviewCount: 248,
    location: 'Basin Area',
    time: '8am – 8pm',
    category: 'Swallow',
    isFree: false,
    deliveryTime: '30–45 min', // no discount
    status: "open"
  },
  {
    slug: 'amala-joint',
    image: FastFoodOne,
    name: 'Fast joint',
    tags: ['Loaded Fries', 'Burgers', 'Chips'] as string[],
    rating: '4.6',
    reviewCount: 241,
    location: 'Caffeine Co.',
    time: '8am – 11pm',
    category: 'Fast Food',
    isFree: true,
    deliveryTime: '20–30 min',
    discount: '20% off',       // has promo
    status: "closed"
  },
  {
    slug: 'krafties-kitchen',
    image: FastFoodTwo,
    name: 'Krafties Kitchen',
    tags: ['Pizza', 'Shawarma'] as string[],
    rating: '3.8',
    reviewCount: 78,
    location: 'Tanke Junction',
    time: '10am – 10pm',
    category: 'Fast Food',
    isFree: false,
    deliveryTime: '25–40 min', // no discount
    status: "delivery-only"
  },
  {
    slug: 'chop-life',
    image: SmallChopsOne,
    name: 'Chewy Chops',
    tags: ['Spicy puff puff', 'Mini chops'] as string[],
    rating: '4.5',
    reviewCount: 290,
    location: 'GRA',
    time: '11am – 11pm',
    category: 'Small Chops',
    isFree: true,
    deliveryTime: '20–35 min', // no discount
    status: "open"
  },
  {
    slug: 'small-chops-palace',
    image: SmallChopsTwo,
    name: 'Chops Express',
    tags: ['Samosa', 'Stick-meat'] as string[],
    rating: '4.0',
    reviewCount: 143,
    location: 'Tanke',
    time: '12pm – 9pm',
    category: 'Small Chops',
    isFree: false,
    deliveryTime: '30–45 min',
    discount: '10% off',       // has promo
    status: "closed"
  },
  {
    slug: 'tasty-munch-drinks',
    image: DrinkOne,
    name: 'Cha Cha Exotics',
    tags: ['Hawaian Special', 'Fruit juice'] as string[],
    rating: '4.3',
    reviewCount: 101,
    location: 'Caffeine Co.',
    time: '10am – 8pm',
    category: 'Drinks',
    isFree: true,
    deliveryTime: '15–25 min', // no discount
    status: "delivery-only"
  },
  {
    slug: 'tasty-munch-drinks-2',
    image: DrinkTwo,
    name: 'Choco Factory',
    tags: ['Chocolate tea', 'Vanilla drink'] as string[],
    rating: '4.1',
    reviewCount: 205,
    location: 'Caffeine Co.',
    time: '10am – 8pm',
    category: 'Drinks',
    isFree: false,
    deliveryTime: '20–30 min', // no discount
    status: "open"
  },
  {
    slug: 'tasty-munch-breakfast',
    image: BreakFastOne,
    name: 'Breakfask corner',
    tags: ['Waffles', 'Pancakes'] as string[],
    rating: '4.8',
    reviewCount: 450,
    location: 'Caffeine Co.',
    time: '10am – 8pm',
    category: 'Breakfast',
    isFree: true,
    deliveryTime: '20–35 min',
    discount: '25% off',       // morning promo
    status: "closed"
  },
  {
    slug: 'tasty-munch-breakfast-2',
    image: BreakFastTwo,
    name: 'Cafe de Elyon',
    tags: ['Bacon n Eggs', 'Sandwich'] as string[],
    rating: '4.6',
    reviewCount: 320,
    location: 'Caffeine Co.',
    time: '10am – 8pm',
    category: 'Breakfast',
    isFree: false,
    deliveryTime: '25–40 min', // no discount
    status: "delivery-only"
  },
  {
    slug: 'tasty-munch-desert',
    image: DesertOne,
    name: 'Goochi bakery',
    tags: ['Cup Cakes', 'Sponge Cake'] as string[],
    rating: '4.3',
    reviewCount: 282,
    location: 'Caffeine Co.',
    time: '10am – 8pm',
    category: 'Desert',
    isFree: false,
    deliveryTime: '20–30 min', // no discount
    status: "open"
  },
  {
    slug: 'tasty-munch-desert-2',
    image: DesertTwo,
    name: 'Snack Labs',
    tags: ['Donut', 'Choco buns'] as string[],
    rating: '4.0',
    reviewCount: 56,
    location: 'Caffeine Co.',
    time: '10am – 8pm',
    category: 'Desert',
    isFree: true,
    deliveryTime: '15–25 min',
    discount: '10% off',
    status: "closed"
  },
]

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/food</p>

      <h1 className="text-center text-3xl lg:text-left font-display lg:text-section text-content">
        What are you <span className="text-[#4A8500] dark:text-lime-deep"> <br className='lg:hidden' />Chopping</span> tonight?
      </h1>

      {/* Featured carousel */}
      <main className="mt-2">
        <FeaturedCarousel items={featuredItems} />
      </main>

      {/* Filterable food grid */}
      <FoodSection food={food} />
    </section>
  )
}