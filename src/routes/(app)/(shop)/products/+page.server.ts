import type { PageServerLoad } from "./$types"


export const load: PageServerLoad = async () => {
    const getProducts = async () => {
        const res = await fetch("https://dummyjson.com/products?limit=50")
        const data = await res.json()
        return data.products
    }

    return {
        products: getProducts(),
    }
}