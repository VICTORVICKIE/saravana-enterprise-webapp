import { json, type RequestHandler } from '@sveltejs/kit'

import { prisma } from '$lib/server/prisma'

// Shops
export const GET: RequestHandler = async () => {
	const users = await prisma.user.findMany({
		where: { role: 'USER' }
	})
	return json(users)
}
