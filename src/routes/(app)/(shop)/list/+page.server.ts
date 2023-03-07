import { States } from '$lib/constants'
import { messaging } from '$lib/server/firebase'
import { prisma } from '$lib/server/prisma'
import type { Item } from '$lib/types'
import { redirect } from '@sveltejs/kit'
import type { Message } from 'firebase-admin/messaging'
import type { Action, Actions } from './$types'

const order: Action = async ({ request, locals }) => {
    const form_data: FormData = await request.formData()

    const items: Item[] = JSON.parse(form_data.get('items') as string)
    const total: number = parseFloat(form_data.get('total') as string)

    if (!locals.user.phone) {
        throw redirect(302, '/products')
    }

    // Populating Order Table
    const user_order = await prisma.order.create({
        data: {
            user: { connect: { id: locals.user.id } },
            total,
            state: States[2]
        },
        include: { user: { select: { address: true, phone: true, name: true, role: true } } }
    })

    // Populating Item Table
    for (const item of items) {
        await prisma.item.create({
            data: {
                order: { connect: { id: user_order.id } },
                product: { connect: { id: item.product.id } },
                quantity: item.quantity
            }
        })
    }

    const ADMINS = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: { phone: true, notify_token: true, notify: true }
    })

    for (const admin of ADMINS) {
        if (admin.notify && typeof admin.notify_token === 'string') {
            console.log(admin.notify_token)
            const body: Message = {
                token: admin.notify_token,
                webpush: {
                    fcmOptions: {
                        link: '/orders'
                    }
                },
                notification: {
                    title: 'New Order!',
                    body: `You have a new order worth ₹${user_order.total} from ${user_order.user.name}!`
                },
                data: {
                    url: '/orders',
                    time: user_order.ordered_at.toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata'
                    })
                }
            }
            await messaging.send(body)
            console.log('sent')
        }
    }
}

export const actions: Actions = { order }
