import { PUBLIC_INTERNAL_API_KEY } from '$env/static/public'
import { ProductKeys } from '$lib/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
    const get_products = async () => {
        const res = await fetch('/api/products', {
            headers: {
                Authorization: `Bearer ${PUBLIC_INTERNAL_API_KEY}`
            }
        })
        const data = await res.json()

        if (data) {
            data.forEach((product: any) => {
                if (
                    product &&
                    typeof product === 'object' &&
                    ProductKeys.every((key) => key in product)
                ) {
                    product.id = parseInt(product.id)
                    product.price = parseFloat(product.price)
                }
            })
        }

        return data
    }

    return { products: get_products() }
}
