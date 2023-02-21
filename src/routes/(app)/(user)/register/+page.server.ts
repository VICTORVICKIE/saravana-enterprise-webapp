import { Roles } from '$lib/constants'
import { prisma } from '$lib/server/prisma'
import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user.phone) {
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

	let existing_user = await prisma.user.findUnique({
		where: { phone }
	})

	if (existing_user) {
		return fail(400, { user: true })
	}
	await prisma.user.create({
		data: {
			name,
			phone,
			address,
			hashed_password: await bcrypt.hash(pin, 10),
			role: 'USER',
			preference: { create: { discount: 0 } }
		}
	})

	throw redirect(303, '/login')
}

export const actions: Actions = { register }
