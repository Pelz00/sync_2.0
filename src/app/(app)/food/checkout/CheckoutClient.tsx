"use client"

import { useState } from "react"

import CheckoutHeader from "./components/checkoutHeader"
import OrderItems from "./components/OrderItems"
import DeliveryAddress, { DeliveryAddressData, } from "./components/DeliveryAddress"
import AllergyCard from "./components/AllergyCard"
import PaymentMethod, { PaymentType, } from "./components/PaymentMethod"
import CheckoutSummary, { CheckoutItem, } from "./components/CheckoutSummary"
import DeliveryOptions, { DeliveryType, } from "./components/DeliveryOptions"

const DELIVERY_FEE = 300
const PACKAGING_FEE = 100
const SERVICE_FEE = 150

const mockItems: CheckoutItem[] = [
    {
        id: "1",
        name: "Jollof Rice + Chicken",
        image: "/images/food/jollof.jpg",
        qty: 2,
        price: 2500,
    },
    {
        id: "2",
        name: "Beef Suya",
        image: "/images/food/suya.jpg",
        qty: 1,
        price: 1800,
    },
]

export default function CheckoutClient() {
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

    function placeOrder() {
        console.log({
            address: addressData,
            allergies,
            payment,
            items: mockItems,
        })
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

            <CheckoutHeader />

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">

                {/* LEFT COLUMN */}

                <div className="space-y-6">

                    <OrderItems
                        vendorName="Chicken Republic"
                        items={mockItems}
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
                        vendorName="Chicken Republic"
                        items={mockItems}
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
                        vendorName="Chicken Republic"
                        items={mockItems}
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