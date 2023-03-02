<script lang="ts">
	import 'iconify-icon'
	import '../app.css'

	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import Alert from '$lib/components/Alert.svelte'
	import { messaging } from '$lib/firebase'
	import { alert } from '$lib/stores/observer'
	import { onMessage } from 'firebase/messaging'
	import { onMount } from 'svelte'
	import { pwaInfo } from 'virtual:pwa-info'

	//@ts-ignore
	let build_date = __DATE__

	if (browser) {
		const channel = new BroadcastChannel('notification-click')
		onMessage(messaging, (payload) => {
			$alert = {
				action: false,
				message: payload.notification?.body as string,
				show: true,
				status: 'success'
			}
		})

		channel.addEventListener('message', function (event) {
			goto(event.data)
		})
	}

	console.info(build_date)
	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register')
			registerSW({
				immediate: true
			})
		}
	})

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<div class="relative">
	{#if $alert.show}
		<Alert content="Test" />
	{/if}
	<slot />
</div>
