import { Roles } from '$lib/constants'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user.role !== Roles[0]) {
        throw redirect(302, '/products')
    }
}
