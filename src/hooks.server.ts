import { pwa_themes } from '$lib/constants'
import { auth } from '$lib/server/lucia'
import { handleHooks } from '@lucia-auth/sveltekit'
import { redirect, type Handle } from '@sveltejs/kit'
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

export const handle: Handle = sequence(handleHooks(auth), enterprise, theme)
