import { AUTH_HEADERS } from '$lib/constants'
import type { Shop } from '$lib/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
    const get_shops = async () => {
        const res = await fetch('/api/users', AUTH_HEADERS)

        return await res.json() as Shop[]
    }

    return { shops: get_shops() }
}
