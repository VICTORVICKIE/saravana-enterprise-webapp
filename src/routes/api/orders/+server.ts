import { States } from '$lib/constants'
import { prisma } from '$lib/server/prisma'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ locals }) => {
    const orders = await prisma.order.findMany({
        include: {
            user: {
                select: {
                    phone: true,
                    name: true,
                    address: true,
                    role: true
                }
            }
        },
        where: { ...(locals.user.role === 'USER' ? { user_id: locals.user.id } : {}) }
    })
    return json(orders)
}

export const POST: RequestHandler = async ({ request }) => {
    const order_data = await request.json()

    const order_state = States[order_data.value]

    await prisma.order.update({ where: { id: order_data.order_id }, data: { state: order_state } })

    return json({ Test: 'Test' })
}
