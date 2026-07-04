import type { StaticImageData } from 'next/image'
import type { StoreInfo } from '@/components/food-comps/StoreInfoModal'

import JollofOne from '@/assets/images/Food-Pics/Jollof/JollofOne.webp'
import JollofTwo from '@/assets/images/Food-Pics/Jollof/JollofTwo.webp'
import SwallowOne from '@/assets/images/Food-Pics/Swallow/SwallowOne.webp'
import SwallowTwo from '@/assets/images/Food-Pics/Swallow/SwallowTwo.webp'
import BurgerOne from '@/assets/images/Food-Pics/Burgers/BurgerImageOne.webp'
import BurgerTwo from '@/assets/images/Food-Pics/Burgers/BurgerImageTwo.webp'
import BurgerThree from '@/assets/images/Food-Pics/Burgers/FastFoodTwo.avif'
import PizzaOne from '@/assets/images/Food-Pics/pizza/FastFoodOne.avif'
import PizzaTwo from '@/assets/images/Food-Pics/pizza/PizzaImageOne.webp'
import PizzaThree from '@/assets/images/Food-Pics/pizza/PizzaImageTwo.webp'
import PastaOne from '@/assets/images/Food-Pics/Pasta/pastaImageOne.webp'
import PastaTwo from '@/assets/images/Food-Pics/Pasta/pastaImageTwo.webp'
import PastaThree from '@/assets/images/Food-Pics/Pasta/pastaImageThree.webp'
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
import HSEGourmet from '@/assets/images/HSE GOURMENT.webp'

export interface MenuItemData {
    id: string
    name: string
    description: string
    price: number
    image: StaticImageData | string
}

export interface MenuSectionData {
    title: string
    items: MenuItemData[]
}

export interface VendorData {
    slug: string
    vendorName: string
    tagline: string
    location: string
    rating: number
    reviews: number
    deliveryTime: string
    deliveryFee: string
    time: string           // ← add this
    heroImage: StaticImageData | string
    menu: MenuSectionData[]
    storeInfo: StoreInfo
}
const defaultStoreInfo = (name: string, address: string): StoreInfo => ({
    description: `${name} — serving fresh, quality food on campus.`,
    address,
    openingHours: [
        { day: 'Monday', hours: '8:00am – 9:00pm' },
        { day: 'Tuesday', hours: '8:00am – 9:00pm' },
        { day: 'Wednesday', hours: '8:00am – 9:00pm' },
        { day: 'Thursday', hours: '8:00am – 9:00pm' },
        { day: 'Friday', hours: '8:00am – 10:00pm' },
        { day: 'Saturday', hours: '9:00am – 10:00pm' },
        { day: 'Sunday', hours: '10:00am – 8:00pm' },
    ],
    phone: '+234 800 000 0000',
    email: 'hello@sync.campus',
    instagram: '@sync_campus',
    minOrder: 500,
    hygieneRating: 4,
})

export const vendors: VendorData[] = [
    // ── Featured carousel vendors ─────────────────────────────────────────
    {
        slug: 'mama-put-tanke',
        vendorName: 'Mama Put Tanke',
        tagline: 'Jollof rice · Amala · Asun',
        location: 'Tanke Crescent',
        rating: 4.8,
        reviews: 312,
        deliveryTime: '20–35 min',
        deliveryFee: 'Free Delivery',
        heroImage: PremiumOne,
        time: '7am – 10pm',
        menu: [
            {
                title: 'Top Sellers',
                items: [
                    { id: 'mp1', name: 'Jollof Rice', description: 'Party-style jollof with assorted', price: 1500, image: JollofOne },
                    { id: 'mp2', name: 'Amala + Ewedu', description: 'Classic Ilorin amala with ewedu soup', price: 1200, image: SwallowOne },
                    { id: 'mp3', name: 'Asun', description: 'Spicy goat meat, perfectly peppered', price: 1800, image: HSEGourmet },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Mama Put Tanke', 'Tanke Crescent, Ilorin'),
    },
    {
        slug: 'arena',
        vendorName: 'Arena',
        tagline: 'Rice · Beans · The good stuff',
        location: 'Tanke Lodge',
        rating: 4.5,
        reviews: 198,
        deliveryTime: '25–40 min',
        deliveryFee: '₦300',
        heroImage: PremiumTwo,
        time: '8am – 11pm',
        menu: [
            {
                title: 'Rice & Beans',
                items: [
                    { id: 'ar1', name: 'Jollof Combo', description: 'Jollof rice + protein of choice', price: 1800, image: JollofTwo },
                    { id: 'ar2', name: 'Beans & Plantain', description: 'Ewa riro with fried plantain', price: 1000, image: HSEGourmet },
                    { id: 'ar3', name: 'Chinese Fried Rice', description: 'Stir-fried rice with vegetables', price: 2000, image: JollofOne },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Arena', 'Tanke Lodge, Ilorin'),
    },
    {
        slug: 'amala-joint',
        vendorName: 'Amala Joint',
        tagline: 'Amala · Iyan · Eba done right',
        location: 'Caffeine Co.',
        rating: 4.6,
        reviews: 241,
        deliveryTime: '20–35 min',
        deliveryFee: '₦300',
        heroImage: PremiumThree,
        time: '9am – 9pm',
        menu: [
            {
                title: 'Swallow',
                items: [
                    { id: 'aj1', name: 'Amala + Gbegiri', description: 'Amala with gbegiri and ewedu', price: 1300, image: SwallowOne },
                    { id: 'aj2', name: 'Iyan + Egusi', description: 'Pounded yam with rich egusi soup', price: 1500, image: SwallowTwo },
                    { id: 'aj3', name: 'Eba + Okra', description: 'Eba with fresh okra soup', price: 1200, image: HSEGourmet },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Amala Joint', 'Caffeine Co., GRA, Ilorin'),
    },

    // ── Food grid vendors ─────────────────────────────────────────────────
    {
        slug: 'mama-puta-tanke',
        vendorName: 'Mama Put Tanke',
        tagline: 'Jollof · Coconut rice',
        location: 'Tanke Crescent',
        rating: 4.8,
        reviews: 312,
        deliveryTime: '20–35 min',
        deliveryFee: 'Free Delivery',
        heroImage: JollofOne,  // ← same as food card
        time: '7am – 2pm',
        menu: [
            {
                title: 'Top Sellers',
                items: [
                    { id: 'ts1', name: 'Jollof Combo', description: 'Party jollof with plantain and chicken, salad and soft drinks included', price: 4500, image: JollofOne },
                    { id: 'ts2', name: 'Coconut Rice', description: 'Fragrant coconut rice with fried chicken', price: 3000, image: JollofTwo },
                    { id: 'ts3', name: 'Fried Rice + Chicken', description: 'Nigerian fried rice, mixed vegetables, full chicken piece', price: 4000, image: HSEGourmet },
                ],
            },
            {
                title: 'Drinks',
                items: [
                    { id: 'dr1', name: 'Chapman', description: 'Chilled house blend chapman', price: 900, image: DrinkOne },
                    { id: 'dr2', name: 'Zobo', description: 'Hibiscus and ginger, cold', price: 400, image: DrinkTwo },
                ],
            },
        ],
        storeInfo: {
            description: 'A beloved campus canteen serving hearty Nigerian meals since 2015.',
            address: '14 Tanke Crescent, Behind Tanke Lodge, Ilorin',
            openingHours: [
                { day: 'Monday', hours: '7:00am – 10:00pm' },
                { day: 'Tuesday', hours: '7:00am – 10:00pm' },
                { day: 'Wednesday', hours: '7:00am – 10:00pm' },
                { day: 'Thursday', hours: '7:00am – 10:00pm' },
                { day: 'Friday', hours: '7:00am – 11:00pm' },
                { day: 'Saturday', hours: '8:00am – 11:00pm' },
                { day: 'Sunday', hours: '9:00am – 8:00pm' },
            ],
            phone: '+234 801 234 5678',
            email: 'mamaputa@sync.campus',
            instagram: '@mamaputa_tanke',
            minOrder: 1000,
            hygieneRating: 4,
        },
    },
    {
        slug: 'spit-africana',
        vendorName: 'Spit Africana',
        tagline: 'Iyan · Eba',
        location: 'Caffeine Co.',
        rating: 4.3,
        reviews: 120,
        deliveryTime: '15–25 min',
        deliveryFee: 'Free Delivery',
        heroImage: SwallowOne,  // ← same as food card
        time: '7am – 2pm',
        menu: [
            {
                title: 'Swallow',
                items: [
                    { id: 'sa1', name: 'Iyan + Egusi', description: 'Pounded yam with rich egusi soup', price: 1800, image: SwallowOne },
                    { id: 'sa2', name: 'Eba + Okra', description: 'Eba with okra and assorted meat', price: 1500, image: SwallowTwo },
                    { id: 'sa3', name: 'Amala + Ewedu', description: 'Classic amala with ewedu soup', price: 1400, image: HSEGourmet },
                ],
            },
            {
                title: 'Proteins',
                items: [
                    { id: 'sa4', name: 'Assorted Beef', description: 'Mixed cuts, well seasoned', price: 800, image: HSEGourmet },
                    { id: 'sa5', name: 'Chicken', description: 'Full piece, grilled or stewed', price: 1200, image: HSEGourmet },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Spit Africana', 'Caffeine Co., University Road, Ilorin'),
    },
    {
        slug: 'iya-afusa',
        vendorName: 'Iya Afusa',
        tagline: 'Amala · Ewa Agoyin',
        location: 'Basin Area',
        rating: 4.7,
        reviews: 248,
        deliveryTime: '30–45 min',
        deliveryFee: '₦300',
        heroImage: SwallowTwo,  // ← same as food card
        time: '8am – 11pm',
        menu: [
            {
                title: 'Swallow',
                items: [
                    { id: 'ia1', name: 'Amala + Ewa Agoyin', description: 'Classic amala with spicy ewa agoyin sauce', price: 1200, image: SwallowTwo },
                    { id: 'ia2', name: 'Amala + Gbegiri', description: 'Amala with smooth gbegiri soup', price: 1100, image: SwallowOne },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Iya Afusa', 'Basin Area, Ilorin'),
    },
    {
        slug: 'Burger King',
        vendorName: 'Burger King',
        tagline: 'Loaded Fries · Burgers · Chips',
        location: 'Caffeine Co.',
        rating: 4.6,
        reviews: 241,
        deliveryTime: '20–30 min',
        deliveryFee: 'Free Delivery',
        heroImage: BurgerOne,  // ← same as food card
        time: '8am – 8pm',
        menu: [
            {
                title: 'Burgers',
                items: [
                    { id: 'bk1', name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, special sauce', price: 3500, image: BurgerOne },
                    { id: 'bk2', name: 'Chicken Burger', description: 'Crispy chicken, coleslaw, mayo', price: 3000, image: BurgerTwo },
                    { id: 'bk3', name: 'Double Stack', description: 'Two patties, cheese, bacon', price: 4500, image: BurgerThree },
                ],
            },
            {
                title: 'Sides',
                items: [
                    { id: 'bk4', name: 'Loaded Fries', description: 'Crispy fries with cheese and jalapeños', price: 1500, image: BurgerThree },
                    { id: 'bk5', name: 'Onion Rings', description: 'Crispy battered onion rings', price: 1000, image: HSEGourmet },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Burger King', 'Caffeine Co., Ilorin'),
    },
    {
        slug: 'Fast joint',
        vendorName: 'Fast Joint',
        tagline: 'Loaded Fries · Burgers · Chips',
        location: 'Tarmac',
        rating: 4.6,
        reviews: 241,
        deliveryTime: '20–30 min',
        deliveryFee: 'Free Delivery',
        heroImage: BurgerTwo,  // ← same as food card
        time: '8am – 8pm',
        menu: [
            {
                title: 'Burgers',
                items: [
                    { id: 'fj1', name: 'BBQ Burger', description: 'Smoky BBQ beef burger with pickles', price: 3200, image: BurgerTwo },
                    { id: 'fj2', name: 'Spicy Chicken Burger', description: 'Spicy crispy chicken with hot sauce', price: 2800, image: BurgerOne },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Fast Joint', 'Tarmac, Ilorin'),
    },
    {
        slug: 'Shaqs Place',
        vendorName: 'Shaqs Place',
        tagline: 'Burgers · Chicken bread',
        location: 'Tanke Junction',
        rating: 3.8,
        reviews: 78,
        deliveryTime: '25–40 min',
        deliveryFee: '₦300',
        heroImage: BurgerThree,  // ← same as food card
        time: '9am – 9pm',
        menu: [
            {
                title: 'Mains',
                items: [
                    { id: 'sp1', name: 'Chicken Bread', description: 'Soft bread stuffed with spiced chicken', price: 2000, image: BurgerThree },
                    { id: 'sp2', name: 'Smash Burger', description: 'Thin smashed patty, American style', price: 2500, image: BurgerOne },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Shaqs Place', 'Tanke Junction, Ilorin'),
    },
    {
        slug: 'krafties-kitchen',
        vendorName: 'Krafties Kitchen',
        tagline: 'Pizza · Shawarma · Pasta',
        location: 'Safari',
        rating: 3.8,
        reviews: 78,
        deliveryTime: '25–40 min',
        deliveryFee: '₦300',
        heroImage: PizzaOne,  // ← same as food card
        time: '7am – 10pm',
        menu: [
            {
                title: 'Pizza',
                items: [
                    { id: 'kk1', name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, basil', price: 4500, image: PizzaOne },
                    { id: 'kk2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni and cheese', price: 5000, image: PizzaTwo },
                    { id: 'kk3', name: 'BBQ Chicken Pizza', description: 'BBQ sauce, chicken, onions', price: 5500, image: PizzaThree },
                ],
            },
            {
                title: 'Pasta',
                items: [
                    { id: 'kk4', name: 'Spaghetti Bolognese', description: 'Classic meat sauce over spaghetti', price: 3000, image: PastaOne },
                    { id: 'kk5', name: 'Penne Arrabiata', description: 'Spicy tomato sauce, penne pasta', price: 2800, image: PastaTwo },
                    { id: 'kk6', name: 'Pasta Primavera', description: 'Mixed vegetables in light cream sauce', price: 2500, image: PastaThree },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Krafties Kitchen', 'Safari, Ilorin'),
    },
    {
        slug: 'chop-life',
        vendorName: 'Chewy Chops',
        tagline: 'Spicy puff puff · Mini chops',
        location: 'GRA',
        rating: 4.5,
        reviews: 290,
        deliveryTime: '20–35 min',
        deliveryFee: 'Free Delivery',
        heroImage: SmallChopsOne,  // ← same as food card
        time: '7am – 2pm',
        menu: [
            {
                title: 'Small Chops',
                items: [
                    { id: 'cc1', name: 'Spicy Puff Puff', description: 'Fluffy, spicy, perfectly fried', price: 800, image: SmallChopsOne },
                    { id: 'cc2', name: 'Mini Spring Rolls', description: 'Crispy rolls with veggie filling', price: 1200, image: SmallChopsTwo },
                    { id: 'cc3', name: 'Small Chops Platter', description: 'Mix of puff puff, samosa, spring rolls', price: 3000, image: SmallChopsOne },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Chewy Chops', 'GRA, Ilorin'),
    },
    {
        slug: 'small-chops-palace',
        vendorName: 'Chops Express',
        tagline: 'Samosa · Stick-meat',
        location: 'Tanke',
        rating: 4.0,
        reviews: 143,
        deliveryTime: '30–45 min',
        deliveryFee: '₦300',
        heroImage: SmallChopsTwo,  // ← same as food card
        time: '8am – 11pm',
        menu: [
            {
                title: 'Small Chops',
                items: [
                    { id: 'ce1', name: 'Samosa', description: 'Crispy triangular pastry with spiced filling', price: 500, image: SmallChopsTwo },
                    { id: 'ce2', name: 'Stick Meat', description: 'Peppered suya-style stick meat', price: 700, image: SmallChopsOne },
                    { id: 'ce3', name: 'Express Platter', description: 'Samosa, stick meat and puff puff combo', price: 2500, image: SmallChopsTwo },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Chops Express', 'Tanke, Ilorin'),
    },
    {
        slug: 'tasty-munch-drinks',
        vendorName: 'Cha Cha Exotics',
        tagline: 'Hawaiian Special · Fruit juice',
        location: 'Caffeine Co.',
        rating: 4.3,
        reviews: 101,
        deliveryTime: '15–25 min',
        deliveryFee: 'Free Delivery',
        heroImage: DrinkOne,  // ← same as food card
        time: '9am – 9pm',
        menu: [
            {
                title: 'Drinks',
                items: [
                    { id: 'cx1', name: 'Hawaiian Special', description: 'Tropical fruit blend, chilled', price: 1200, image: DrinkOne },
                    { id: 'cx2', name: 'Fresh Fruit Juice', description: 'Seasonal fruits, freshly blended', price: 800, image: DrinkTwo },
                    { id: 'cx3', name: 'Chapman', description: 'Classic Nigerian chapman', price: 900, image: DrinkOne },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Cha Cha Exotics', 'Caffeine Co., Ilorin'),
    },
    {
        slug: 'tasty-munch-drinks-2',
        vendorName: 'Choco Factory',
        tagline: 'Chocolate tea · Vanilla drink',
        location: 'Caffeine Co.',
        rating: 4.1,
        reviews: 205,
        deliveryTime: '20–30 min',
        deliveryFee: '₦300',
        heroImage: DrinkTwo,  // ← same as food card
        time: '7am – 10pm',
        menu: [
            {
                title: 'Hot Drinks',
                items: [
                    { id: 'cf1', name: 'Chocolate Tea', description: 'Rich hot chocolate with milk', price: 1000, image: DrinkTwo },
                    { id: 'cf2', name: 'Vanilla Latte', description: 'Espresso with vanilla and steamed milk', price: 1200, image: DrinkOne },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Choco Factory', 'Caffeine Co., Ilorin'),
    },
    {
        slug: 'tasty-munch-breakfast',
        vendorName: 'Breakfast Corner',
        tagline: 'Waffles · Pancakes',
        location: 'Caffeine Co.',
        rating: 4.8,
        reviews: 450,
        deliveryTime: '20–35 min',
        deliveryFee: 'Free Delivery',
        heroImage: BreakFastOne,  // ← same as food card
        time: '8am – 11pm',
        menu: [
            {
                title: 'Breakfast',
                items: [
                    { id: 'bc1', name: 'Waffles + Syrup', description: 'Crispy waffles with maple syrup', price: 2500, image: BreakFastOne },
                    { id: 'bc2', name: 'Pancake Stack', description: 'Fluffy pancakes with butter and syrup', price: 2000, image: BreakFastTwo },
                    { id: 'bc3', name: 'Full Breakfast', description: 'Eggs, toast, sausage and beans', price: 3500, image: BreakFastOne },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Breakfast Corner', 'Caffeine Co., Ilorin'),
    },
    {
        slug: 'tasty-munch-breakfast-2',
        vendorName: 'Cafe de Elyon',
        tagline: 'Bacon n Eggs · Sandwich',
        location: 'Caffeine Co.',
        rating: 4.6,
        reviews: 320,
        deliveryTime: '25–40 min',
        deliveryFee: '₦300',
        heroImage: BreakFastTwo,  // ← same as food card
        time: '8am – 11pm',
        menu: [
            {
                title: 'Breakfast',
                items: [
                    { id: 'de1', name: 'Bacon & Eggs', description: 'Crispy bacon with scrambled eggs on toast', price: 2800, image: BreakFastTwo },
                    { id: 'de2', name: 'Club Sandwich', description: 'Triple-decker with chicken, bacon, lettuce', price: 3000, image: BreakFastOne },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Cafe de Elyon', 'Caffeine Co., Ilorin'),
    },
    {
        slug: 'tasty-munch-desert',
        vendorName: 'Goochi Bakery',
        tagline: 'Cup Cakes · Sponge Cake',
        location: 'Caffeine Co.',
        rating: 4.3,
        reviews: 282,
        deliveryTime: '20–30 min',
        deliveryFee: '₦300',
        heroImage: DesertOne,  // ← same as food card
        time: '8am – 8pm',
        menu: [
            {
                title: 'Cakes & Desserts',
                items: [
                    { id: 'gb1', name: 'Cupcake Box (6)', description: 'Assorted frosted cupcakes', price: 3000, image: DesertOne },
                    { id: 'gb2', name: 'Sponge Cake Slice', description: 'Soft vanilla sponge with cream', price: 1500, image: DesertTwo },
                    { id: 'gb3', name: 'Chocolate Cake', description: 'Rich dark chocolate layer cake', price: 2000, image: DesertOne },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Goochi Bakery', 'Caffeine Co., Ilorin'),
    },
    {
        slug: 'tasty-munch-desert-2',
        vendorName: 'Snack Labs',
        tagline: 'Donut · Choco buns',
        location: 'Caffeine Co.',
        rating: 4.0,
        reviews: 56,
        deliveryTime: '15–25 min',
        deliveryFee: 'Free Delivery',
        heroImage: DesertTwo,  // ← same as food card
        time: '8am – 11pm',
        menu: [
            {
                title: 'Snacks',
                items: [
                    { id: 'sl1', name: 'Glazed Donut', description: 'Classic glazed ring donut', price: 700, image: DesertTwo },
                    { id: 'sl2', name: 'Choco Bun', description: 'Soft bun filled with chocolate cream', price: 800, image: DesertOne },
                    { id: 'sl3', name: 'Donut Box (4)', description: 'Four assorted donuts', price: 2500, image: DesertTwo },
                ],
            },
        ],
        storeInfo: defaultStoreInfo('Snack Labs', 'Caffeine Co., Ilorin'),
    },
]

export function getVendorBySlug(slug: string): VendorData | null {
    return vendors.find(v => v.slug === slug) ?? null
}