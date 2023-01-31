import { prisma } from '$lib/server/prisma'
import type { Actions } from '@sveltejs/kit'
import { fail } from '@sveltejs/kit'

export const actions: Actions = {
	register: async ({ request }) => {
		const form_data: FormData = await request.formData()
		const { name, phone, address, pin, confirm_pin } = Object.fromEntries(form_data) as {
			name: string
			phone: string
			address: string
			pin: string
			confirm_pin: string
		}

		try {
			await prisma.user.create({
				data: {
					phone,
					name,
					pin,
					address
				}
			})
		} catch (error) {
			console.error(error)
			return fail(500, { message: "Could not register user" })
		}

		return {
			status: 201
		}
	}
}
