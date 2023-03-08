<script lang="ts">
    import { browser } from '$app/environment'
    import { PUBLIC_FIREBASE_VAPID_ID } from '$env/static/public'
    import { AUTH_HEADERS } from '$lib/constants'
    import { messaging } from '$lib/firebase'
    import type { User } from '$lib/types'
    import { getToken } from 'firebase/messaging'

    export let user: User
    // variables globally modified in this script
    let permission = false
    let wants_notify: boolean
    let notify_token: string | null | undefined

    if (browser) {
        wants_notify = (user.notify as boolean) && Notification.permission === 'granted'
        notify_token = user.notify_token
    }

    async function update_notify_config(notify: boolean, notify_token?: string | null) {
        const res = await fetch(`/api/users/${user.id}`, {
            method: 'POST',
            ...AUTH_HEADERS,
            body: JSON.stringify({ notify, notify_token })
        })
    }

    async function generate_token() {
        try {
            permission = true
            const token = await getToken(messaging, { vapidKey: PUBLIC_FIREBASE_VAPID_ID })
            if (token) {
                wants_notify = true
                return token
            } else {
                wants_notify = false
            }
        } catch (error) {
            wants_notify = false
            console.error(error)
        }
    }

    async function handle_default_permission() {
        permission = false

        if (wants_notify) {
            const permission_status = await Notification.requestPermission()
            if (permission_status == 'granted') {
                if (notify_token) {
                    await update_notify_config(wants_notify)
                } else {
                    notify_token = await generate_token()
                    await update_notify_config(wants_notify, notify_token)
                }
            } else {
                wants_notify = false
                console.log('warn about denial and change in db to false')
                await update_notify_config(wants_notify)
            }
        } else {
            await update_notify_config(wants_notify)
        }
    }

    async function set_notification() {
        const permission_status = Notification.permission

        switch (permission_status) {
            case 'default':
                await handle_default_permission()
                break
            case 'granted':
                permission = true
                if (wants_notify) {
                    if (!user.notify_token) {
                        notify_token = await generate_token()
                    }
                    await update_notify_config(wants_notify, notify_token)
                    console.log('check in db if no token, generate else change in db to true')
                } else {
                    console.log('warn about denial and change in db to false')
                    await update_notify_config(wants_notify, notify_token)
                }
                break
            case 'denied':
                permission = wants_notify = false
                await update_notify_config(wants_notify)
                break
        }
    }
</script>

<input
    type="checkbox"
    class:toggle-success={wants_notify}
    class="toggle"
    bind:checked={wants_notify}
    on:change={set_notification}
/>
