"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { TbCurrencyNaira } from "react-icons/tb"

export interface CheckoutCartItem {
    id: string
    name: string
    description?: string
    image?: string
    price: number
    qty: number
}

interface OrderItemsProps {
    vendorName: string
    items: CheckoutCartItem[]
}

export default function OrderItems({
    vendorName,
    items,
}: OrderItemsProps) {
    const [expanded, setExpanded] = useState(true)

    const totalProducts = items.reduce((sum, item) => sum + item.qty, 0)

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    )

    return (
        <div className="rounded-xl border border-line/10 bg-panel shadow-card overflow-hidden">

            {/* Header */}
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
            >
                <div>
                    <h2 className="text-2xl font-bold text-content">
                        Your order
                    </h2>

                    <p className="text-sm text-content-muted mt-1">
                        {totalProducts} product
                        {totalProducts !== 1 && "s"} from{" "}
                        <span className="font-semibold text-content">
                            {vendorName}
                        </span>
                    </p>
                </div>

                {expanded ? (
                    <ChevronUp size={22} />
                ) : (
                    <ChevronDown size={22} />
                )}
            </button>

            {/* Expanded content */}
            {expanded && (
                <>
                    <div className="border-t border-line/10">

                        {items.length === 0 ? (
                            <div className="p-5 text-sm text-content-muted">
                                Your cart is empty.
                            </div>
                        ) : (
                            <div className="divide-y divide-line/10">

                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-4"
                                    >
                                        <div>
                                            <p className="font-medium text-content">
                                                {item.name}
                                            </p>

                                            <p className="text-xs text-content-muted mt-1">
                                                Qty {item.qty}
                                            </p>
                                        </div>

                                        <p className="font-semibold flex items-center text-content">
                                            <TbCurrencyNaira />
                                            {(item.price * item.qty).toLocaleString()}
                                        </p>
                                    </div>
                                ))}

                            </div>
                        )}

                    </div>

                    {items.length > 0 && (
                        <div className="border-t border-line/10 bg-content-muted/5 px-5 py-4 flex items-center justify-between">

                            <span className="font-semibold text-content">
                                Subtotal
                            </span>

                            <span className="font-bold flex items-center text-content">
                                <TbCurrencyNaira />
                                {subtotal.toLocaleString()}
                            </span>

                        </div>
                    )}
                </>
            )}
        </div>
    )
}