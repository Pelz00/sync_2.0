"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/app/(app)/food/cart-context"
import { saveDemoOrder } from "@/lib/demo-order"

import CheckoutHeader from "./components/checkoutHeader"
import OrderItems from "./components/OrderItems"
import DeliveryAddress, { type DeliveryAddressData } from "./components/DeliveryAddress"
import AllergyCard from "./components/AllergyCard"
import PaymentMethod, { type PaymentType } from "./components/PaymentMethod"
import CheckoutSummary, { type CheckoutItem } from "./components/CheckoutSummary"
import DeliveryOptions, { type DeliveryType } from "./components/DeliveryOptions"

const SYNC_FEE = 150
const DELIVERY_FEE = 300
const PACKAGING_FEE = 100

export default function CheckoutClient() {
    const router = useRouter()

    const { vendor, items, subtotal, clearCart } = useCart()

    const [addressData, setAddressData] = useState<DeliveryAddressData>({
        address: "",
        building: "",
        instructions: "",
        phone: "",
        sendToSomeoneElse: false,
        recipientName: "",
        recipientPhone: "",
    })
    const [allergies, setAllergies] = useState("")
    const [deliveryOption, setDeliveryOption] = useState<DeliveryType>("standard")
    const [payment, setPayment] = useState<PaymentType>("cash")
    const [loading, setLoading] = useState(false)

    const placingRef = useRef(false)

    const total = subtotal + DELIVERY_FEE + PACKAGING_FEE + SYNC_FEE

    const checkoutItems: CheckoutItem[] = items.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        qty: item.qty,
        price: item.price,
    }))

    async function placeOrder() {
        if (items.length === 0 || placingRef.current) return
        placingRef.current = true
        setLoading(true)


        await new Promise(resolve => setTimeout(resolve, 2000))

        const order = saveDemoOrder({
            vendorName: vendor?.name ?? "Unknown vendor",
            vendorLogo: typeof vendor?.image === "string"
                ? vendor.image
                : (vendor?.image as { src: string } | undefined)?.src ?? "",
            items: items.map(i => ({
                id: i.id,
                name: i.name,
                description: i.description ?? "",
                price: i.price,
                qty: i.qty,
                image: typeof i.image === "string" ? i.image : "",
            })),
            subtotal,
            deliveryFee: DELIVERY_FEE,
            packagingFee: PACKAGING_FEE,
            syncFee: SYNC_FEE,
            total,
            deliveryAddress: addressData.address || "Tanke Crescent, Behind Tanke Lodge, Ilorin",
            status: "preparing",
            etaMinutes: 25,
        })

        router.push(`/food/orders/${order.id}/track`)
        // clearCart()
        // no need to reset placingRef — we're navigating away
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

            <CheckoutHeader />

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">

                {/* ── LEFT COLUMN ── */}
                <div className="space-y-6">

                    <OrderItems
                        vendorName={vendor?.name ?? ""}
                        items={checkoutItems}
                    />

                    <AllergyCard
                        value={allergies}
                        onChange={setAllergies}
                    />

                    <DeliveryAddress
                        value={addressData}
                        onChange={setAddressData}
                    />

                    <DeliveryOptions
                        value={deliveryOption}
                        onChange={setDeliveryOption}
                    />

                    <PaymentMethod
                        value={payment}
                        onChange={setPayment}
                    />

                </div>

                {/* ── RIGHT COLUMN (desktop) ── */}
                <div className="hidden lg:block">
                    <CheckoutSummary
                        vendorName={vendor?.name ?? ""}
                        items={checkoutItems}
                        deliveryFee={DELIVERY_FEE}
                        packagingFee={PACKAGING_FEE}
                        serviceFee={SYNC_FEE}
                        loading={loading}
                        onPlaceOrder={placeOrder}
                    />
                </div>

            </div>

            {/* ── MOBILE sticky summary ── */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line/10 bg-panel/95 backdrop-blur">
                <div className="px-4 py-4">
                    <CheckoutSummary
                        vendorName={vendor?.name ?? ""}
                        items={checkoutItems}
                        deliveryFee={DELIVERY_FEE}
                        packagingFee={PACKAGING_FEE}
                        serviceFee={SYNC_FEE}
                        loading={loading}
                        onPlaceOrder={placeOrder}
                    />
                </div>
            </div>

        </div>
    )
}