export interface DemoOrder {
    id: string
    vendorName: string
    vendorLogo: string
    deliveryAddress: string
    status: "preparing" | "picked_up" | "on_the_way" | "delivered"
    etaMinutes: number
    createdAt: number
}

export function saveDemoOrder(order: Omit<DemoOrder, "id" | "createdAt">): DemoOrder {
    const full: DemoOrder = {
        ...order,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
    }
    const existing = getAllDemoOrders()
    localStorage.setItem("demo_orders", JSON.stringify([full, ...existing]))
    return full
}

export function getAllDemoOrders(): DemoOrder[] {
    if (typeof window === "undefined") return []
    try {
        return JSON.parse(localStorage.getItem("demo_orders") ?? "[]")
    } catch { return [] }
}

// Keep getDemoOrders as alias so ActiveOrders.tsx doesn't break
export const getDemoOrders = getAllDemoOrders

export function getDemoOrder(id: string): DemoOrder | null {
    return getAllDemoOrders().find(o => o.id === id) ?? null
}

export function updateDemoOrderStatus(id: string, status: DemoOrder["status"], etaMinutes: number) {
    const orders = getAllDemoOrders()
    const updated = orders.map(o => o.id === id ? { ...o, status, etaMinutes } : o)
    localStorage.setItem("demo_orders", JSON.stringify(updated))
}