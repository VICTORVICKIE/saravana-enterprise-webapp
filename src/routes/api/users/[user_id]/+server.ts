import { prisma } from '$lib/server/prisma'
import { hash } from '$lib/validate'
import { json, type RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ params, request, locals, cookies }) => {
	const user_data = await request.json()

	const referer = request.headers.get('referer')

	if (
		typeof params.user_id === 'string' &&
		params.user_id === locals.user.id &&
		referer &&
		referer.includes('profile')
	) {
		if ('pin' in user_data) {
			await prisma.user.update({
				data: { hashed_password: await hash(user_data.pin) },
				where: { phone: locals.user.phone }
			})
			await prisma.session.deleteMany({ where: { user_id: locals.user.id } })

			const session = await prisma.session.create({
				data: { expires: 60 * 60 * 24 * 30 * 12, user: { connect: { id: locals.user.id } } }
			})
			cookies.set('session', session.id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30 * 12
			})
		} else {
			await prisma.user.update({ data: user_data, where: { phone: locals.user.phone } })
		}
	}
	return json({ Test: 'Test' })
}
