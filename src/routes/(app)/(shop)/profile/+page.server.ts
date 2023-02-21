import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user.phone) {
		throw redirect(302, '/login')
	}

	return { user: locals.user }
}
