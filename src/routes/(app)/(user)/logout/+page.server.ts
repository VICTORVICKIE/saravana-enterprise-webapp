import { Roles } from '$lib/constants'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

// export const load: PageServerLoad = async () => {
// 	throw redirect(302, '/')
// }

export const actions: Actions = {
	async default({ cookies, locals }) {
		if (locals.user.role === Roles[0]) {
			throw redirect(302, '/login')
		}

		const session = cookies.get('session')
		console.log(session)
		await prisma.session.delete({ where: { id: session } })
		console.log("after")
		cookies.delete('session', {
			path: '/'
		})

		throw redirect(302, '/login')
	}
}
