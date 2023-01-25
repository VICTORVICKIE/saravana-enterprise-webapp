import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const se_theme = event.cookies.get('se_theme')

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace(`data-theme=""`, `data-theme="${se_theme}"`)
	})
	return response
}
