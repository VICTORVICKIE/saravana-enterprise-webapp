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
                        address: true
                    }
                },
                items: { select: { product: true, quantity: true } }
            }
        })
    }
    return json(orders)
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
