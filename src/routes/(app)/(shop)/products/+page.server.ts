import { SECRET_INTERNAL_API_KEY } from '$env/static/private'
import { States } from '$lib/constants'
import type { Item, Product } from '$lib/types'
import { redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const get_products = async () => {
		const res = await fetch('/api/products', {
			headers: {
				Authorization: `Bearer ${SECRET_INTERNAL_API_KEY}`
			}
		})
		const data: Product[] = await res.json()

		return data
	}

	return { products: get_products() }
}

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
