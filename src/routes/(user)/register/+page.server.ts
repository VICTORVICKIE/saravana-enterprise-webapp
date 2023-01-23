import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    register: async ({ request }) => {
        const form_data = await request.formData()
        console.log(JSON.stringify(Object.fromEntries(form_data)))
        // const result = await fetch('http://127.0.0.1:8000/users', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "username": "Svelte",
        //         "phone": "98754321",
        //         "address": "string ,test, comma",
        //         "pin": "1234"
        //     })
        // })
        // const data = await result.json()
        // console.log(data)
    }
}
