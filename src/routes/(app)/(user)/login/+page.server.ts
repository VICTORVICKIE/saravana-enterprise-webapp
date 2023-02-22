import { Roles } from '$lib/constants'
import { prisma } from '$lib/server/prisma'
import { compare } from '$lib/validate'
import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user.role !== Roles[0]) {
		throw redirect(302, '/products')
	}
}

const login: Action = async ({ cookies, request }) => {
	const form_data: FormData = await request.formData()
	const { phone, pin } = Object.fromEntries(form_data) as Record<string, string>

	if (typeof phone !== 'string' || typeof pin !== 'string' || !phone || !pin) {
		throw fail(400, {
			error: true,
			message: 'Invalid Credentials',
			phone
		})
	}

	const user = await prisma.user.findUnique({ where: { phone } })

	if (!user) {
		return fail(400, { credentials: true })
	}

	const valid_password = await compare(pin, user.hashed_password)

	if (!valid_password) {
		return fail(400, { credentials: true })
	}

	let session_exists = cookies.get('session')

	if (session_exists) {
		await prisma.session.delete({ where: { id: session_exists } })
	}

	const session = await prisma.session.create({
		data: { expires: 60 * 60 * 24 * 30 * 12, user: { connect: { id: user.id } } }
	})
	cookies.set('session', session.id, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30 * 12
	})

	throw redirect(302, '/products')
}

export const actions: Actions = { login }
