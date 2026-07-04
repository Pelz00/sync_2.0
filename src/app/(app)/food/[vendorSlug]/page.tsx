import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import VendorClient from '@/components/food-comps/VendorClient'
import { getVendorBySlug } from '@/lib/vendor'

interface Props {
  params: Promise<{ vendorSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vendorSlug } = await params
  const vendor = getVendorBySlug(vendorSlug)
  return { title: vendor?.vendorName ?? 'Vendor' }
}

export default async function Page({ params }: Props) {
  const { vendorSlug } = await params
  const vendor = getVendorBySlug(vendorSlug)

  if (!vendor) notFound()

  return (
    <section className="flex flex-col gap-3">
      <VendorClient
        vendorName={vendor.vendorName}
        tagline={vendor.tagline}
        location={vendor.location}
        rating={vendor.rating}
        reviews={vendor.reviews}
        deliveryTime={vendor.deliveryTime}
        deliveryFee={vendor.deliveryFee}
        time={vendor.time}          // ← add this
        heroImage={vendor.heroImage}
        menu={vendor.menu}
        storeInfo={vendor.storeInfo}
      />
    </section>
  )
}