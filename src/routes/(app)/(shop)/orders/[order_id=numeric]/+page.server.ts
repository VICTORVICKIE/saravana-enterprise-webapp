import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, params }) => {
	const get_order = async (order_id: string) => {
		const res = await fetch(`/api/orders/${order_id}`)
		const data = await res.json()
		return data
	}

	return {
		order: get_order(params.order_id)
	}
}
