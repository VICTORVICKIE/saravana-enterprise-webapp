import { SECRET_INTERNAL_API_KEY } from '$env/static/private'
import { pwa_themes } from '$lib/constants'
import { auth } from '$lib/server/lucia'
import { handleHooks } from '@lucia-auth/sveltekit'
import { error, redirect, type Handle, type HandleFetch, type HandleServerError } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

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
	let { user, session } = await event.locals.validateUser()
	if (event.url.pathname.startsWith('/enterprise')) {
		if (!session || user?.role !== 'ADMIN') {
			throw redirect(303, '/products')
		}
	}
	return await resolve(event)
}

const api: Handle = async ({ event, resolve }) => {
	let request_auth = event.request.headers.get('authorization')
	// if (event.url.pathname.startsWith('/api')) {
	// 	if (!request_auth || (request_auth !== `Bearer ${SECRET_INTERNAL_API_KEY}`)) {
	// 		throw redirect(303, '/products')
	// 	}
	// }
	return await resolve(event)
}

export const handle: Handle = sequence(handleHooks(auth), api, enterprise, theme)
