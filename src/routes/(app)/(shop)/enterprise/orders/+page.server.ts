import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const get_orders = async () => {
		const res = await fetch('/api/orders')
		const data = await res.json()

		return data.reverse()
	}

	return { orders: get_orders() }
}
