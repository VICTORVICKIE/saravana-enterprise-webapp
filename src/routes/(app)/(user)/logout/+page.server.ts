import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	throw redirect(302, '/')
}

export const actions: Actions = {
	async default({ cookies }) {
		const session = cookies.get('session')
		if (!session) {
			throw redirect(302, '/login')
		}

		await prisma.session.delete({ where: { id: session } })

		cookies.delete('session', {
			path: '/'
		})

		throw redirect(302, '/login')
	}
}
