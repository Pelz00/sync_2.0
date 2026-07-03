"use client"

import Image from "next/image"
import { TbCurrencyNaira } from "react-icons/tb"

export interface CheckoutItem {
    id: string
    name: string
    image: string
    qty: number
    price: number
}

interface CheckoutSummaryProps {
    vendorName: string

    items: CheckoutItem[]

    deliveryFee: number
    packagingFee: number
    serviceFee: number

    onPlaceOrder?: () => void
}

export default function CheckoutSummary({
    vendorName,
    items,
    deliveryFee,
    packagingFee,
    serviceFee,
    onPlaceOrder,
}: CheckoutSummaryProps) {

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    )

    const total =
        subtotal +
        deliveryFee +
        packagingFee +
        serviceFee

    return (
        <aside
            className="
                lg:sticky
                lg:top-24

                rounded-xl
                border
                border-line/10
                bg-panel
                shadow-card
                overflow-hidden
            "
        >

            {/* Header */}

            <div className="px-5 py-4 border-b border-line/10">

                <h2 className="font-bold text-content">
                    Your order
                </h2>

                <p className="text-sm text-content-muted mt-1">
                    {vendorName}
                </p>

            </div>

            {/* Items */}

            <div className="p-5 space-y-4">

                {items.map(item => (

                    <div
                        key={item.id}
                        className="flex gap-3"
                    >

                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">

                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />

                        </div>

                        <div className="flex-1 min-w-0">

                            <h3 className="font-medium text-sm text-content truncate">
                                {item.name}
                            </h3>

                            <p className="text-xs text-content-muted mt-1">
                                Qty {item.qty}
                            </p>

                        </div>

                        <div className="font-bold text-sm flex items-center">

                            <TbCurrencyNaira />

                            {(item.qty * item.price).toLocaleString()}

                        </div>

                    </div>

                ))}

            </div>

            {/* Breakdown */}

            <div className="border-t border-line/10 p-5 space-y-2">

                <div className="flex justify-between text-sm">

                    <span className="text-content-muted">
                        Subtotal
                    </span>

                    <span className="flex items-center">

                        <TbCurrencyNaira />

                        {subtotal.toLocaleString()}

                    </span>

                </div>

                <div className="flex justify-between text-sm">

                    <span className="text-content-muted">
                        Delivery
                    </span>

                    <span className="flex items-center">

                        <TbCurrencyNaira />

                        {deliveryFee.toLocaleString()}

                    </span>

                </div>

                <div className="flex justify-between text-sm">

                    <span className="text-content-muted">
                        Packaging
                    </span>

                    <span className="flex items-center">

                        <TbCurrencyNaira />

                        {packagingFee.toLocaleString()}

                    </span>

                </div>

                <div className="flex justify-between text-sm">

                    <span className="text-content-muted">
                        Service fee
                    </span>

                    <span className="flex items-center">

                        <TbCurrencyNaira />

                        {serviceFee.toLocaleString()}

                    </span>

                </div>

            </div>

            {/* Total */}

            <div className="border-t border-line/10 px-5 py-4 flex items-center justify-between">

                <span className="font-bold text-content">
                    Total
                </span>

                <span className="text-2xl font-black flex items-center">

                    <TbCurrencyNaira />

                    {total.toLocaleString()}

                </span>

            </div>

            {/* CTA */}

            <div className="p-5 pt-0">

                <button
                    onClick={onPlaceOrder}
                    className="
                        w-full
                        rounded-xl
                        bg-lime
                        text-ink
                        py-4

                        font-bold

                        border-0
                        border-black

                        shadow-[2px_2px_0_black]
                        
                        transition
                        cursor-pointer
                    "
                >
                    Place Order
                </button>

            </div>

        </aside>
    )
}