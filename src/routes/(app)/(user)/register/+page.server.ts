import { Roles } from '$lib/constants'
import { prisma } from '$lib/server/prisma'
import { hash } from '$lib/validate'
import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user.role !== Roles[0]) {
        throw redirect(302, '/products')
    }
}

const register: Action = async ({ request }) => {
    const form_data: FormData = await request.formData()
    const { name, phone, address, pin, confirm } = Object.fromEntries(form_data) as Record<
        string,
        string
    >

    if (
        typeof name !== 'string' ||
        typeof phone !== 'string' ||
        typeof address !== 'string' ||
        typeof pin !== 'string' ||
        typeof confirm !== 'string' ||
        !name ||
        !phone ||
        !address ||
        !pin ||
        !confirm ||
        pin !== confirm
    ) {
        return fail(400, { invalid: true })
    }

    const existing_user = await prisma.user.findUnique({
        where: { phone }
    })

    if (existing_user) {
        return fail(400, { user: true })
    }
    await prisma.user.create({
        data: {
            name,
            phone,
            address,
            hashed_password: await hash(pin)
        }
    })

    throw redirect(303, '/login')
}

export const actions: Actions = { register }
