import { prisma } from '$lib/server/prisma'
import type { Product } from '$lib/types'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
    const products: Product[] = await prisma.product.findMany()

    return json(products)
}
