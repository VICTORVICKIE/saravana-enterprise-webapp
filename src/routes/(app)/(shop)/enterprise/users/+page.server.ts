import { PUBLIC_INTERNAL_API_KEY } from '$env/static/public'
import type { User } from '$lib/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
    const get_users = async () => {
        const res = await fetch('/api/users', {
            headers: {
                Authorization: `Bearer ${PUBLIC_INTERNAL_API_KEY}`
            }
        })
        const data = await res.json()

        return data as User[]
    }

    return { users: get_users() }
}
