'use client'

import type { Metadata } from 'next'
import { Heart } from 'lucide-react'
import FoodCards from '@/components/food-comps/food-card'
import { useFavorites } from '@/app/(app)/food/favorites-context'

export default function FavoritesPage() {
    const { favorites } = useFavorites()

    return (
        <section className="flex flex-col gap-3 pb-24">
            <h1 className="text-center text-2xl font-display text-content">Saved</h1>

            {favorites.length === 0 ? (
                <div className="mt-2 flex flex-col items-center gap-3 rounded-2xl border border-line/10 bg-panel px-6 py-10 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-content-muted/10">
                        <Heart className="h-6 w-6 text-content" strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="font-display text-base font-semibold text-content">
                            No favourites yet
                        </p>
                        <p className="mt-1 text-sm text-content-muted">
                            Tap the heart on any meal to save it here
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-xs text-content-muted">
                        {favorites.length} saved meal{favorites.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mt-1">
                        {favorites.map((item) => (
                            <FoodCards key={item.slug} {...item} />
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}