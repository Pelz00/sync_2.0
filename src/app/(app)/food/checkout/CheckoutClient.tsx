"use client"

import { useState } from "react"

import CheckoutHeader from "./components/checkoutHeader"
import OrderItems from "./components/OrderItems"
import DeliveryAddress, { DeliveryAddressData, } from "./components/DeliveryAddress"
import AllergyCard from "./components/AllergyCard"
import PaymentMethod, { PaymentType, } from "./components/PaymentMethod"
import CheckoutSummary, { CheckoutItem, } from "./components/CheckoutSummary"
import DeliveryOptions, { DeliveryType, } from "./components/DeliveryOptions"
import { useCart } from "@/app/(app)/food/cart-context"
import { useRouter } from "next/navigation"
import { saveDemoOrder } from "@/lib/demo-order"

const DELIVERY_FEE = 300
const PACKAGING_FEE = 100
const SERVICE_FEE = 150


export default function CheckoutClient() {
    const router = useRouter()
    const [addressData, setAddressData] = useState<DeliveryAddressData>({
        address: "",
        building: "",
        instructions: "",
        phone: "",
        sendToSomeoneElse: false,
        recipientName: "",
        recipientPhone: "",
    })


    const [allergies, setAllergies] =
        useState("")

    const [deliveryOption, setDeliveryOption] =
        useState<DeliveryType>("standard")

    const [payment, setPayment] =
        useState<PaymentType>("cash")


    const {
        vendor,
        items,
        subtotal,
        clearCart,
    } = useCart()

    const checkoutItems: CheckoutItem[] = items.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        qty: item.qty,
        price: item.price,
    }))

    function placeOrder() {
        if (!vendor) return

        const order = saveDemoOrder({
            vendorName: vendor.name,
            vendorLogo: vendor.image ?? "",
            deliveryAddress:
                addressData.address || "Campus Delivery",
            status: "preparing",
            etaMinutes: 25,
        })

        // clearCart()

        router.push(`/food/orders/${order.id}/track`)
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

            <CheckoutHeader />

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">

                {/* LEFT COLUMN */}

                <div className="space-y-6">

                    <OrderItems
                        vendorName={vendor?.name ?? ""}
                        items={checkoutItems}
                    />

                    <AllergyCard
                        value={allergies}
                        onChange={setAllergies}
                    />

                    <DeliveryAddress value={addressData} onChange={setAddressData} />

                    <DeliveryOptions
                        value={deliveryOption}
                        onChange={setDeliveryOption}
                    />

                    <PaymentMethod
                        value={payment}
                        onChange={setPayment}
                    />

                </div>

                {/* RIGHT COLUMN */}

                <div className="hidden lg:block">

                    <CheckoutSummary
                        vendorName={vendor?.name ?? ""}
                        items={checkoutItems}
                        deliveryFee={DELIVERY_FEE}
                        packagingFee={PACKAGING_FEE}
                        serviceFee={SERVICE_FEE}
                        onPlaceOrder={placeOrder}
                    />

                </div>

            </div>

            {/* MOBILE STICKY SUMMARY */}

            <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line/10 bg-panel/95 backdrop-blur">

                <div className="px-4 py-4">

                    <CheckoutSummary
                        vendorName={vendor?.name ?? ""}
                        items={checkoutItems}
                        deliveryFee={DELIVERY_FEE}
                        packagingFee={PACKAGING_FEE}
                        serviceFee={SERVICE_FEE}
                        onPlaceOrder={placeOrder}
                    />

                </div>

            </div>

        </div>
    )
}