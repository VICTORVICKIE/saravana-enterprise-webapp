import { Roles } from '$lib/constants'
import { prisma } from '$lib/server/prisma'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const actions: Actions = {
	async default({ cookies, locals }) {
		if (locals.user.role === Roles[0]) {
			throw redirect(302, '/login')
		}

		const session = cookies.get('session')
		await prisma.session.delete({ where: { id: session } })
		cookies.delete('session', {
			path: '/'
		})

		throw redirect(302, '/login')
	}
}
