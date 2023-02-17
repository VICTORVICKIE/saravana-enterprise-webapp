import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { session, user } = await locals.validateUser()
    // Revert this after development!
    if (!session || !user) {
        throw redirect(302, '/login')
    }

    return { user }

}