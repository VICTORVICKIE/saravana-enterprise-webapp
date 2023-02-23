<script lang="ts">
	import 'iconify-icon'
	import '../app.css'

	import { onMount, type ComponentType } from 'svelte'
	import { pwaInfo } from 'virtual:pwa-info'

	//@ts-ignore
	let build_date = __DATE__

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register')
			registerSW({
				immediate: true,
				onRegistered(r) {
					// uncomment following code if you want check for updates
					r &&
						setInterval(() => {
							console.log('Checking for sw update')
							r.update()
						}, 20000 /* 20s for testing purposes */)
					console.log(`SW Registered: ${r}`)
				},
				onRegisterError(error) {
					console.log('SW registration error', error)
				}
			})
		}
	})

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<slot />

<div class="toast">
	<div class="alert alert-info">
		<div>
			<span>{build_date}</span>
		</div>
	</div>
</div>
