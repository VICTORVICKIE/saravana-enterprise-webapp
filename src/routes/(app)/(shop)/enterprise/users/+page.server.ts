import { SECRET_INTERNAL_API_KEY } from '$env/static/private'
import type { User } from '$lib/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const get_users = async () => {
		const res = await fetch('/api/users', {
			headers: {
				Authorization: `Bearer ${SECRET_INTERNAL_API_KEY}`
			}
		})
		const data: User[] = await res.json()
		return data
	}

	return { users: get_users() }
}
