import { AUTH_HEADERS } from '$lib/constants'
import type { Order } from '$lib/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, params }) => {
    const get_order = async (order_id: string) => {
        const res = await fetch(`/api/orders/${order_id}`, AUTH_HEADERS)
        const data = await res.json() as Order

        return data
    }

    return {
        order: get_order(params.order_id)
    }
}
