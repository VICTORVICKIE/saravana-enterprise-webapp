import { States } from '$lib/constants'
import { prisma } from '$lib/server/prisma'
import type { Item } from '$lib/types'
import { redirect } from '@sveltejs/kit'
import type { Action, Actions } from './$types'

const order: Action = async ({ request, locals }) => {
    const form_data: FormData = await request.formData()

    const items: Item[] = JSON.parse(form_data.get('items') as string)
    const total: number = parseFloat(form_data.get('total') as string)

    if (!locals.user.phone) {
        throw redirect(302, '/products')
    }

    // Populating Order Table
    let user_order = await prisma.order.create({
        data: {
            user: { connect: { id: locals.user.id } },
            total,
            state: States[2]
        }
    })

    // Populating Item Table
    for (let item of items) {
        await prisma.item.create({
            data: {
                order: { connect: { id: user_order.id } },
                product: { connect: { id: item.product.id } },
                quantity: item.quantity
            }
        })
    }
}

export const actions: Actions = { order }
