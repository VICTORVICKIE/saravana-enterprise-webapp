import { json, type RequestHandler } from '@sveltejs/kit'

import { SelectShop } from '$lib/constants'
import { prisma } from '$lib/server/prisma'
import type { Shop } from '$lib/types'

// Shops
export const GET: RequestHandler = async () => {
    const shops: Shop[] = await prisma.user.findMany({
        where: { role: 'USER' },
        select: SelectShop,
    })

    return json(shops)
}
