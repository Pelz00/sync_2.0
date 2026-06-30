import Image from 'next/image'
import type { Metadata } from 'next'
import MainImage from '@/assets/images/Above lifestyle.webp'
import SecondImage from '@/assets/images/HSE GOURMENT.webp'
import VendorClient from '@/components/food-comps/VendorClient'

export const metadata: Metadata = { title: 'Vendor' }

const menu = [
  {
    title: "Top Sellers",
    items: [
      { id: "ts1", name: "Jollof Combo", description: "Party jollof with plantain and chicken, salad and soft drinks included", price: 4500, image: SecondImage },
      { id: "ts2", name: "Amala Special", description: "Amala with ewedu, gbegiri, assorted beef and ponmo", price: 3500, image: SecondImage },
      { id: "ts3", name: "Fried Rice + Chicken", description: "Nigerian fried rice, mixed vegetables, full chicken piece", price: 4000, image: SecondImage },
    ]
  },
  {
    title: "Combo Meals",
    items: [
      { id: "cm1", name: "Family Combo", description: "Feeds 4 — jollof, fried rice, chicken, drinks", price: 14000, image: SecondImage },
      { id: "cm2", name: "Student Deal", description: "Jollof or white rice + protein + drink", price: 2500, image: SecondImage },
    ]
  },
  {
    title: "Swallow",
    items: [
      { id: "sw1", name: "Amala + Ewedu + Gbegiri", description: "Classic Ilorin combo with beef and ponmo", price: 1500, image: SecondImage },
      { id: "sw2", name: "Semo + Egusi", description: "Smooth semo with rich egusi and assorted", price: 1600, image: SecondImage },
      { id: "sw3", name: "Pounded Yam + Oha Soup", description: "Smooth pounded yam with oha leaf soup", price: 1800, image: SecondImage },
    ]
  },
  {
    title: "Drinks",
    items: [
      { id: "dr1", name: "Chapman, large", description: "House blend, chilled", price: 900, image: SecondImage },
      { id: "dr2", name: "Zobo, 50cl", description: "Hibiscus, ginger, cold", price: 400, image: SecondImage },
    ]
  },
]

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      {/* <p className="eyebrow text-accent-fg">/food/[vendorSlug]</p> */}
      <VendorClient
        vendorName="Mama Puta Tanke"
        tagline="Jollof · Amala · Local"
        location="Tanke Crescent"
        rating={4.8}
        reviews={212}
        deliveryTime="20–30 min"
        deliveryFee="Free Delivery"
        heroImage={MainImage}
        menu={menu}
        storeInfo={{
          description: "A beloved campus canteen serving hearty Nigerian meals since 2015. Known for the best Jollof on Tanke Crescent — fresh ingredients, generous portions, and no compromises.",
          address: "14 Tanke Crescent, Behind Tanke Lodge, Ilorin, Kwara State",
          openingHours: [
            { day: "Monday", hours: "7:00am – 10:00pm" },
            { day: "Tuesday", hours: "7:00am – 10:00pm" },
            { day: "Wednesday", hours: "7:00am – 10:00pm" },
            { day: "Thursday", hours: "7:00am – 10:00pm" },
            { day: "Friday", hours: "7:00am – 11:00pm" },
            { day: "Saturday", hours: "8:00am – 11:00pm" },
            { day: "Sunday", hours: "9:00am – 8:00pm" },
          ],
          phone: "+234 801 234 5678",
          email: "mamaputa@sync.campus",
          instagram: "@mamaputa_tanke",
          minOrder: 1000,
          hygieneRating: 4,
        }}
      />
    </section>
  )
}