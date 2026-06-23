/**
 * FavoritesContext - shares saved/favorited food items between FoodCards
 * (where the heart icon lives) and the /food/favorites ("Saved") page.
 *
 * Persists to localStorage so favorites survive a page refresh. Components
 * read the context when present and fall back to local state when it isn't -
 * see `useOptionalFavorites`, mirroring the LocationContext pattern.
 */
'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'
import type { StaticImageData } from 'next/image'

export interface FavoriteFood {
    slug: string
    image: StaticImageData | string
    name: string
    tags: string[]
    rating: string
    reviewCount?: number
    location: string
    time: string
    category?: string
    isFree?: boolean
    deliveryTime?: string
    discount?: string
    status?: 'open' | 'closed' | 'delivery-only'
}

interface FavoritesValue {
    favorites: FavoriteFood[]
    isFavorite: (slug: string) => boolean
    toggleFavorite: (food: FavoriteFood) => boolean // returns the new state (true = added)
    removeFavorite: (slug: string) => void
}

const STORAGE_KEY = 'sync:food:favorites'

const FavoritesContext = createContext<FavoritesValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteFood[]>([])
    const [hydrated, setHydrated] = useState(false)

    // Load from localStorage once on mount (client-only)
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (raw) setFavorites(JSON.parse(raw))
        } catch {
            // ignore corrupt storage
        } finally {
            setHydrated(true)
        }
    }, [])

    // Persist whenever favorites change, after initial hydration
    useEffect(() => {
        if (!hydrated) return
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
        } catch {
            // ignore write failures (e.g. storage full/disabled)
        }
    }, [favorites, hydrated])

    function isFavorite(slug: string) {
        return favorites.some((f) => f.slug === slug)
    }

    function toggleFavorite(food: FavoriteFood) {
        const alreadySaved = isFavorite(food.slug)
        setFavorites((prev) =>
            alreadySaved
                ? prev.filter((f) => f.slug !== food.slug)
                : [...prev, food],
        )
        return !alreadySaved
    }

    function removeFavorite(slug: string) {
        setFavorites((prev) => prev.filter((f) => f.slug !== slug))
    }

    return (
        <FavoritesContext.Provider
            value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}

/** Returns the context if a provider is mounted, else null. */
export function useOptionalFavorites() {
    return useContext(FavoritesContext)
}

/**
 * Throws if used outside a provider - use this on pages (like /food/favorites)
 * that require the context to exist, rather than degrading gracefully.
 */
export function useFavorites() {
    const ctx = useContext(FavoritesContext)
    if (!ctx) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return ctx
}