'use client'

import { useState, useEffect } from 'react'
import FoodLanding from './FoodLanding'
import FoodMain from './FoodMain'

export default function FoodPageClient() {
    const [showLanding, setShowLanding] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const isDesktop = window.matchMedia('(min-width: 768px)').matches
        const seen = sessionStorage.getItem('food_landing_seen')

        if (seen || isDesktop) setShowLanding(false)
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (showLanding) {
        return (
            <FoodLanding
                onExplore={() => {
                    sessionStorage.setItem('food_landing_seen', '1')
                    setShowLanding(false)
                }}
            />
        )
    }

    return <FoodMain />
}