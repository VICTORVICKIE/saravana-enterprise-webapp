import { json, type RequestHandler } from '@sveltejs/kit'

import { prisma } from '$lib/server/prisma'

export const GET: RequestHandler = async ({ params }) => {
	let order_id: number
	let orders
	if (params.order_id) {
		order_id = parseInt(params.order_id)
		orders = await prisma.order.findUnique({
			where: { id: order_id },
			include: {
				user: {
					select: {
						phone: true,
						name: true,
						address: true,
						preference: { select: { nickname: true, discount: true } }
					}
				},
				items: { select: { product: true, quantity: true } }
			}
		})
	}

	return json(orders)
}
