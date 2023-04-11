import { json, type RequestHandler } from '@sveltejs/kit'

import { IncludeShop } from '$lib/constants'
import { prisma } from '$lib/server/prisma'
import type { Order } from '$lib/types'

export const GET: RequestHandler = async ({ params }) => {
    const order: Order = await prisma.order.findUnique({
        where: { id: parseInt(params.order_id as string) },
        include: {
            ...IncludeShop,
            items: { select: { product: true, quantity: true, subtotal: true } }
        }
    })
    return json(order)
}

export const POST: RequestHandler = async ({ params, request }) => {
    const order_data = await request.json()
    let order_id: number
    if (params.order_id) {
        order_id = parseInt(params.order_id)
        const discount = parseFloat(order_data.discount)
        await prisma.order.update({ data: { discount }, where: { id: order_id } })
    }

    return json({ test: 'test' })
}
