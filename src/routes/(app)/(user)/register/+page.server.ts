import { Roles } from '$lib/constants'
import { auth } from '$lib/server/lucia'
import { prisma } from '$lib/server/prisma'
import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate()
	if (session) {
		throw redirect(302, '/products')
	}
}

const register: Action = async ({ request }) => {
	const form_data: FormData = await request.formData()
	const { name, phone, address, pin, confirm } = Object.fromEntries(form_data) as Record<
		string,
		string
	>

	if (
		typeof name !== 'string' ||
		typeof phone !== 'string' ||
		typeof address !== 'string' ||
		typeof pin !== 'string' ||
		typeof confirm !== 'string' ||
		!name ||
		!phone ||
		!address ||
		!pin ||
		!confirm ||
		pin !== confirm
	) {
		return fail(400, { invalid: true })
	}

	const user = await prisma.user.findUnique({
		where: { phone }
	})

	if (user) {
		return fail(400, { user: true })
	}

	await auth.createUser({
		key: {
			providerId: 'phone',
			providerUserId: phone,
			password: pin
		},
		attributes: {
			name,
			phone,
			address,
			role: Roles[1]
		}
	})

	throw redirect(303, '/login')
}

export const actions: Actions = { register }
