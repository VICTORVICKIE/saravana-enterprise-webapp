<script lang="ts">
	import 'iconify-icon'
	import '../app.css'

	import { onMount, type ComponentType } from 'svelte'
	import { pwaInfo } from 'virtual:pwa-info'

	//@ts-ignore
	let build_date = __DATE__

	console.log(build_date)
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

<slot />
