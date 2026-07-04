import type { ReactNode } from "react"
import { FavoritesProvider } from "@/app/(app)/food/favorites-context"
import { CartProvider } from "@/app/(app)/food/cart-context"

export default function FoodLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <FavoritesProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </FavoritesProvider>
    )
}