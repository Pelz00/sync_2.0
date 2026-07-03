// lib/demo-order.ts
export interface DemoOrder {
    id: string
    vendorName: string
    vendorLogo: string
    deliveryAddress: string
    status: "preparing" | "rider_assigned" | "en_route" | "arriving" | "delivered"
    etaMinutes: number
    createdAt: number
}

export function saveDemoOrder(order: Omit<DemoOrder, "id" | "createdAt">): DemoOrder {
    const full: DemoOrder = {
        ...order,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
    }
    const existing = getDemoOrders()
    localStorage.setItem("demo_orders", JSON.stringify([full, ...existing]))
    return full
}

export function getDemoOrders(): DemoOrder[] {
    if (typeof window === "undefined") return []
    try {
        return JSON.parse(localStorage.getItem("demo_orders") ?? "[]")
    } catch { return [] }
}

export function getDemoOrder(id: string): DemoOrder | null {
    return getDemoOrders().find(o => o.id === id) ?? null
}

export function updateDemoOrderStatus(id: string, status: DemoOrder["status"], etaMinutes: number) {
    const orders = getDemoOrders()
    const updated = orders.map(o => o.id === id ? { ...o, status, etaMinutes } : o)
    localStorage.setItem("demo_orders", JSON.stringify(updated))
}