import { json, type RequestHandler } from '@sveltejs/kit'

import { prisma } from '$lib/server/prisma'

export const GET: RequestHandler = async () => {

    const users = await prisma.user.findMany()
    return json(users)
}
