<script lang="ts">
	import { PUBLIC_FIREBASE_VAPID_ID } from '$env/static/public'
	import { messaging } from '$lib/firebase'
	import { getToken } from 'firebase/messaging'

	let permission = false
	let wants_notify = false
	let notify_token: string

	async function generate_token() {
		try {
			permission = true
			const token = await getToken(messaging, { vapidKey: PUBLIC_FIREBASE_VAPID_ID })
			if (token) {
				console.log('Token & change in db -> true')
				notify_token = token
				console.log(notify_token)
				wants_notify = true
			} else {
				wants_notify = false
				console.log('something went wrong')
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
				await generate_token()
			} else {
				wants_notify = false
				console.log('warn about denial and change in db to false')
			}
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
					console.log('check in db if no token, generate else change in db to true')
				} else {
					console.log('warn about denial and change in db to false')
				}
				break
			case 'denied':
				permission = wants_notify = false
				console.log('Manually change permission and toggle again')
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
