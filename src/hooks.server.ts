import { pwa_themes } from '$lib/constant/values';
import type { Handle } from '@sveltejs/kit';


export const handle: Handle = async ({ event, resolve }) => {
	const se_theme = event.cookies.get('se_theme') ?? "dark"

	const response = await resolve(event, {
		transformPageChunk: ({ html, done }) => {
			html = html.replace(`data-theme="dark"`, `data-theme="${se_theme}"`)
			html = html.replace(`content="#000000"`, `content="${pwa_themes[se_theme]}"`)

			if (done) return html;
		}
	})
	return response
}
