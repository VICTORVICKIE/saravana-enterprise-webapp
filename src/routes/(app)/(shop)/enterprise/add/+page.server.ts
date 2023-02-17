import { fail, redirect, type Action, type Actions } from '@sveltejs/kit'

const add_product: Action = async ({ request }) => {
	const form_data: FormData = await request.formData()
	const { brand, name, category, price, image_url } = Object.fromEntries(form_data) as Record<
		string,
		string
	>

	const product = await prisma.product.findUnique({
		where: { name }
	})

	if (product) {
		return fail(400, { product: true })
	}

	await prisma.product.create({
		data: {
			name,
			brand,
			category,
			price: parseFloat(price),
			image_url,
			search_terms: `${name} ${brand} ${category}`
		}
	})

	throw redirect(303, '/enterprise/add')
}

export const actions: Actions = { add_product }
