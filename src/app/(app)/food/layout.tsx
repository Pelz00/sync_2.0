import type { ReactNode } from 'react'
import { FavoritesProvider } from '@/app/(app)/food/favorites-context'

export default function FoodLayout({ children }: { children: ReactNode }) {
    return <FavoritesProvider>{children}</FavoritesProvider>
}