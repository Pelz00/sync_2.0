import type { Metadata } from 'next'
import FoodPageClient from '@/components/food-comps/FoodPageClient'

export const metadata: Metadata = { title: 'Food' }

export default function Page() {
  return <FoodPageClient />
}