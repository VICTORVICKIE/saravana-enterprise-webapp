<script lang="ts">
	import 'iconify-icon'
	import '../app.css'

	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import Alert from '$lib/components/Alert.svelte'
	import { messaging } from '$lib/firebase'
	import { alert } from '$lib/stores/observer'
	import type { Notify } from '$lib/types'
	import { onMessage } from 'firebase/messaging'
	import { onMount } from 'svelte'
	import { pwaInfo } from 'virtual:pwa-info'

	//@ts-ignore
	let build_date = __DATE__

	if (browser) {
		const channel = new BroadcastChannel('notification-click')

		// Foreground Notification
		onMessage(messaging, (payload) => {
			console.log(payload)
			$alert = {
				action: true,
				duration: 2000,
				message: payload.notification?.body as string,
				show: true,
				status: 'success',

				options: {
					url: payload.data?.url as string,
					text: 'Go',
					fxn: function () {
						goto($alert.options?.url as string)
					}
				}
			}
		})

		// Background Notification
		channel.addEventListener('message', function (event) {
			console.log(event.data)
			goto(event.data)
		})
	}

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register')

			console.info(build_date)

			registerSW({
				immediate: true
			})
		}
	})

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''

	// async function test() {
	// 	$alert = {
	// 		message: 'payload.notification?.body as string',
	// 		show: true,
	// 		status: 'success',
	// 		duration: 2500,
	// 		action: true,
	// 		options: {
	// 			url: '/orders',
	// 			text: 'Go',
	// 			fxn: async function () {
	// 				goto($alert.options?.url as string)
	// 			}
	// 		}
	// 	}
	// }
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<div class="relative">
	<!-- <input type="checkbox" checked={$alert.show} on:change={test} /> -->
	{#if $alert.show}
		<Alert />
	{/if}
	<slot />
</div>
