import { prisma } from '$lib/server/prisma'
import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { Action, Actions, PageServerLoad } from './$types'


enum Roles {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user.role !== 'GUEST') {
		throw redirect(302, '/products')
	}
}

const register: Action = async ({ request }) => {

	const form_data: FormData = await request.formData()
	const { name, phone, address, pin, confirm_pin } = Object.fromEntries(form_data) as {
		name: string
		phone: string
		address: string
		pin: string
		confirm_pin: string
	}

	if (typeof name !== 'string' ||
		typeof phone !== 'string' ||
		typeof address !== 'string' ||
		typeof pin !== 'string' ||
		typeof confirm_pin !== 'string' ||
		!name || !phone || !address || !pin || !confirm_pin || pin !== confirm_pin) {
		return fail(400, { invalid: true })
	}

	const user = await prisma.user.findUnique({
		where: { phone }
	})

	if (user) {
		return fail(400, { user: true })
	}

	await prisma.user.create({
		data: {
			phone,
			name,
			pin: await bcrypt.hash(pin, 10),
			auth: crypto.randomUUID(),
			address,
			role: { connect: { role: Roles.USER } }

		}
	})

	throw redirect(303, '/login')
}

export const actions: Actions = { register }
