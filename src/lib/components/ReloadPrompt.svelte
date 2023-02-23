<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte'
	const { needRefresh, updateServiceWorker, offlineReady } = useRegisterSW({
		onRegistered(r) {
			// uncomment following code if you want check for updates
			// r && setInterval(() => {
			//    console.log('Checking for sw update')
			//    r.update()
			// }, 20000 /* 20s for testing purposes */)
			console.log(`SW Registered: ${r}`)
		},
		onRegisterError(error) {
			console.log('SW registration error', error)
		}
	})
	const close = () => {
		offlineReady.set(false)
		needRefresh.set(false)
	}
	const update = () => {
		updateServiceWorker(true)
	}
	$: toast = $offlineReady || $needRefresh
</script>

{#if toast}
	<div class="alert shadow-lg">
		<div>
			{#if $offlineReady}
				<span> App ready to work offline </span>
			{:else}
				<span> New content available, click on reload button to update. </span>
			{/if}
		</div>
		<div class="flex-none">
			{#if $needRefresh}
				<button class="btn-primary btn-sm btn" on:click={update}> Reload </button>
			{/if}
			<button class="btn-ghost btn-sm btn" on:click={close}> Close </button>
		</div>
	</div>
{/if}
