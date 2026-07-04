"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface CheckoutHeaderProps {
    title?: string
    subtitle?: string
}

export default function CheckoutHeader({
    title = "Checkout",
    subtitle = "Review your order before placing it.",
}: CheckoutHeaderProps) {
    const router = useRouter()

    return (
        <div className="flex flex-col gap-3">
            {/* Back button */}
            <button
                onClick={() => router.back()}
                className="w-11 h-11 rounded-full border border-line/10 bg-panel hover:bg-content-muted/5 transition flex items-center justify-center cursor-pointer"
            >
                <ArrowLeft size={20} />
            </button>

            {/* Heading */}
            <div>
                <h1 className="text-3xl font-black text-content">
                    {title}
                </h1>

                <p className="mt-1 text-sm text-content-muted">
                    {subtitle}
                </p>
            </div>
        </div>
    )
}