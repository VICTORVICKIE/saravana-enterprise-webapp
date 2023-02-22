import { SECRET_INTERNAL_API_KEY } from '$env/static/private'
import { OrderKeys, type Order } from '$lib/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const get_orders = async () => {
		const res = await fetch('/api/orders', {
			headers: {
				Authorization: `Bearer ${SECRET_INTERNAL_API_KEY}`
			}
		})
		const data = await res.json()

		if (data) {
			for (const order of data) {
				if (order && typeof order === 'object' && OrderKeys.every((key) => key in order)) {
					order.id = parseInt(order.id)
					order.total = parseFloat(order.total)
					order.ordered_at = new Date(order.ordered_at).toLocaleString()
					order.updated_at = new Date(order.updated_at).toLocaleString()
				}
			}
		}
		return data.reverse() as Order[]
	}

	return { orders: get_orders() }
}
