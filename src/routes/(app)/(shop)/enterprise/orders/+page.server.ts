import { SECRET_INTERNAL_API_KEY } from '$env/static/private'
import type { Order } from '$lib/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const get_orders = async () => {
		const res = await fetch('/api/orders', {
			headers: {
				Authorization: `Bearer ${SECRET_INTERNAL_API_KEY}`
			}
		})
		const data: Order[] = await res.json()

		data.forEach((order) => {
			order.ordered_at = new Date(order.ordered_at).toLocaleString()
			order.updated_at = new Date(order.updated_at).toLocaleString()
		})

		return data.reverse()
	}

	return { orders: get_orders() }
}
