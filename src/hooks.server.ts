import { PUBLIC_INTERNAL_API_KEY } from '$env/static/public'
import { pwa_themes } from '$lib/constants'
import { prisma } from '$lib/server/prisma'
import type { Handle, HandleServerError } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const user_auth: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session')
	let session_data
	if (session) {
		session_data = await prisma.session.findUnique({
			where: { id: session },
			select: { user: { select: { id: true, phone: true, role: true, address: true, name: true, notify: true, notify_token: true } } }
		})
	}

	if (!session_data) {
		event.locals.user = {
			role: 'GUEST'
		}
		return await resolve(event)
	}

	event.locals.user = session_data.user

	return await resolve(event)
}

const theme: Handle = async ({ event, resolve }) => {
	const se_theme = event.cookies.get('se_theme') ?? 'dark'

	const response = await resolve(event, {
		transformPageChunk: ({ html, done }) => {
			html = html.replace(`data-theme="dark"`, `data-theme="${se_theme}"`)
			html = html.replace(`content="#000000"`, `content="${pwa_themes[se_theme]}"`)

			if (done) return html
		}
	})
	return response
}

const enterprise: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/enterprise')) {
		if (!event.locals.user.phone || event.locals.user.role !== 'ADMIN') {
			throw redirect(303, '/products')
		}
	}
	return await resolve(event)
}

const api: Handle = async ({ event, resolve }) => {
	let request_auth = event.request.headers.get('authorization')
	if (event.url.pathname.startsWith('/api')) {
		if (!request_auth || request_auth !== `Bearer ${PUBLIC_INTERNAL_API_KEY}`) {
			throw redirect(303, '/products')
		}
	}
	return await resolve(event)
}

export const handleError = (({ error, event }) => {
	const errorId = crypto.randomUUID()
	console.log(error)
	return {
		message: 'Whoops!',
		errorId
	}
}) satisfies HandleServerError

export const handle: Handle = sequence(user_auth, api, enterprise, theme)
