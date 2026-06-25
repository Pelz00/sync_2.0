import Link from "next/link"
import { ArrowLeft, Clock3 } from "lucide-react"

const orders = [
    {
        id: "1",
        vendor: "Chicken Republic",
        items: ["Refuel Max x2", "Coke x1"],
        total: 12000,
        date: "23 Jun 2026",
        status: "Delivered",
    },
    {
        id: "2",
        vendor: "KFC",
        items: ["Bucket Meal x1"],
        total: 8500,
        date: "21 Jun 2026",
        status: "Delivered",
    },
]

export default function OrderHistoryPage() {
    return (
        <section className="pb-24 flex flex-col gap-4">

            <div className="flex items-center gap-3">
                <Link
                    href="/food/orders"
                    className="w-10 h-10 rounded-full border border-line/10 flex items-center justify-center"
                >
                    <ArrowLeft size={18} />
                </Link>

                <h1 className="text-2xl font-display font-bold text-content">
                    Order History
                </h1>
            </div>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-line/10 bg-panel px-6 py-12 text-center">
                    <Clock3 className="h-8 w-8 text-content-muted" />
                    <h2 className="font-semibold text-content">
                        No previous orders
                    </h2>
                    <p className="text-sm text-content-muted">
                        Orders you've completed will appear here.
                    </p>
                </div>
            ) : (
                orders.map(order => (
                    <div
                        key={order.id}
                        className="rounded-2xl border border-line/10 bg-panel p-4 flex flex-col gap-3"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-content">
                                {order.vendor}
                            </h2>

                            <span className="text-xs bg-lime/15 text-lime px-2 py-1 rounded-full">
                                {order.status}
                            </span>
                        </div>

                        <div className="text-sm text-content-muted">
                            {order.items.map(item => (
                                <p key={item}>{item}</p>
                            ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-line/10 pt-3">
                            <span className="text-sm text-content-muted">
                                {order.date}
                            </span>

                            <span className="font-bold text-content">
                                ₦{order.total.toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </section>
    )
}