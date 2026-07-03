"use client"

import {
    createContext,
    useContext,
    useMemo,
    useState,
    ReactNode,
} from "react"

export interface CartItem {
    id: string
    name: string
    image: string
    price: number
    qty: number
}

export interface CartVendor {
    slug: string
    name: string
    image?: string
}

interface CartContextType {
    vendor: CartVendor | null
    items: CartItem[]

    addItem: (
        vendor: CartVendor,
        item: Omit<CartItem, "qty">
    ) => void

    removeItem: (id: string) => void

    increaseQty: (id: string) => void

    decreaseQty: (id: string) => void

    clearCart: () => void

    subtotal: number

    totalItems: number
}

const CartContext =
    createContext<CartContextType | null>(null)

export function CartProvider({
    children,
}: {
    children: ReactNode
}) {
    const [vendor, setVendor] =
        useState<CartVendor | null>(null)

    const [items, setItems] =
        useState<CartItem[]>([])

    function addItem(
        incomingVendor: CartVendor,
        item: Omit<CartItem, "qty">
    ) {
        setVendor(incomingVendor)

        setItems((prev) => {
            const existing = prev.find(
                (i) => i.id === item.id
            )

            if (existing) {
                return prev.map((i) =>
                    i.id === item.id
                        ? {
                            ...i,
                            qty: i.qty + 1,
                        }
                        : i
                )
            }

            return [
                ...prev,
                {
                    ...item,
                    qty: 1,
                },
            ]
        })
    }

    function removeItem(id: string) {
        setItems((prev) =>
            prev.filter((i) => i.id !== id)
        )
    }

    function increaseQty(id: string) {
        setItems((prev) =>
            prev.map((i) =>
                i.id === id
                    ? {
                        ...i,
                        qty: i.qty + 1,
                    }
                    : i
            )
        )
    }

    function decreaseQty(id: string) {
        setItems((prev) =>
            prev
                .map((i) =>
                    i.id === id
                        ? {
                            ...i,
                            qty: i.qty - 1,
                        }
                        : i
                )
                .filter((i) => i.qty > 0)
        )
    }

    function clearCart() {
        setItems([])
        setVendor(null)
    }

    const subtotal = useMemo(
        () =>
            items.reduce(
                (sum, item) =>
                    sum + item.price * item.qty,
                0
            ),
        [items]
    )

    const totalItems = useMemo(
        () =>
            items.reduce(
                (sum, item) => sum + item.qty,
                0
            ),
        [items]
    )

    return (
        <CartContext.Provider
            value={{
                vendor,
                items,
                addItem,
                removeItem,
                increaseQty,
                decreaseQty,
                clearCart,
                subtotal,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        )
    }

    return context
}