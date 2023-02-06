import { json, type RequestHandler } from '@sveltejs/kit'

import { prisma } from '$lib/server/prisma'

export const GET: RequestHandler = async (event) => {
	const products = await prisma.product.findMany()
	return json(products)
}
