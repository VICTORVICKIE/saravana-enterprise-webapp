import type { Action, Actions } from '@sveltejs/kit'

const feature: Action = async ({ cookies, request }) => {
    const form_data: FormData = await request.formData()
    console.log(form_data)
}

export const actions: Actions = { feature }
