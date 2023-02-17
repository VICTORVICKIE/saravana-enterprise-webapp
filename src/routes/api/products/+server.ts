import { prisma } from '$lib/server/prisma'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	const products = await prisma.product.findMany()
	return json(products)
}
