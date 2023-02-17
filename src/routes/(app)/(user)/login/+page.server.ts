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

const login: Action = async ({ locals, request }) => {
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

	const key = await auth.validateKeyPassword('phone', phone, pin)
	const session = await auth.createSession(key.userId)
	locals.setSession(session)

	throw redirect(302, '/products')
}

export const actions: Actions = { login }
