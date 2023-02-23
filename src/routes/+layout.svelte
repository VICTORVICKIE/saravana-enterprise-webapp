<script lang="ts">
	import 'iconify-icon'
	import '../app.css'

	import { onMount, type ComponentType } from 'svelte'
	import { pwaInfo } from 'virtual:pwa-info'

	//@ts-ignore
	let build_date = __DATE__

	let ReloadPrompt: ComponentType
	onMount(async () => {
		pwaInfo && (ReloadPrompt = (await import('$lib/components/ReloadPrompt.svelte')).default)
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
{#if ReloadPrompt}
	<svelte:component this={ReloadPrompt} />
{/if}
