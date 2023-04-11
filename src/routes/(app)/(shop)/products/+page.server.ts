import { AUTH_HEADERS } from '$lib/constants'
import type { Product } from '$lib/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
    const get_products = async () => {
        const res = await fetch('/api/products', AUTH_HEADERS)

        return (await res.json()) as Product[]
    }

    return { products: get_products() }
}
