import { prisma } from '$lib/server/prisma'
import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user.role !== 'GUEST') {
		throw redirect(302, '/products')
	}
}

const login: Action = async ({ cookies, request }) => {
	const form_data: FormData = await request.formData()
	const { phone, pin } = Object.fromEntries(form_data) as {
		phone: string
		pin: string
	}

	if (typeof phone !== 'string' || typeof pin !== 'string' || !phone || !pin) {
		return fail(400, { invalid: true })
	}

	const user = await prisma.user.findUnique({ where: { phone } })

	if (!user) {
		return fail(400, { credentials: true })
	}

	const user_pin = await bcrypt.compare(pin, user.pin)

	if (!user_pin) {
		return fail(400, { credentials: true })
	}

	// generate new auth token every time they login
	const user_auth = await prisma.user.update({
		where: { phone: user.phone },
		data: { auth: crypto.randomUUID() }
	})

	cookies.set('session', user_auth.auth, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	})

	throw redirect(302, '/products')
}

export const actions: Actions = { login }
