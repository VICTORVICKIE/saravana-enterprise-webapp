<script lang="ts">
	import 'iconify-icon'
	import '../app.css'

	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import { pwaInfo } from 'virtual:pwa-info'
	import { registerSW } from 'virtual:pwa-register'

	onMount(async () => {
		if (browser) {
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

<slot />
