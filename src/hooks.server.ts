import { pwa_themes } from '$lib/constant/values'
import { prisma } from '$lib/server/prisma'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'


const user_auth: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session')

	if (!session) {
		event.locals.user = {
			role: "GUEST"
		}
		return await resolve(event)
	}

	const user = await prisma.user.findUnique({
		where: { auth: session },
		select: { phone: true, role: true, }
	})

	if (user) {
		event.locals.user = {
			phone: user.phone,
			role: user.role.role
		}
	}
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


export const handle: Handle = sequence(user_auth, theme)
