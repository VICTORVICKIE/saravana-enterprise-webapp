import { AUTH_HEADERS } from '$lib/constants'
import type { Order } from '$lib/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
    const get_orders = async () => {
        const res = await fetch('/api/orders', AUTH_HEADERS)
        const data = await res.json() as Order[]

        if (data) {
            for (const order of data) {
                order.ordered_at = new Date(order.ordered_at).toLocaleString()
                order.updated_at = new Date(order.updated_at).toLocaleString()
            }
        }
        return data.reverse()
    }

    return { orders: get_orders() }
}
