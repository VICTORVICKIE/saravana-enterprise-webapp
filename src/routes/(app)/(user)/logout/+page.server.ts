import { auth } from '$lib/server/lucia'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	throw redirect(302, '/')
}

export const actions: Actions = {
	async default({ locals }) {
		const session = await locals.validate()
		if (!session) {
			throw redirect(302, '/')
		}

		await auth.invalidateSession(session.sessionId)
		locals.setSession(null)

		throw redirect(302, '/login')
	}
}
