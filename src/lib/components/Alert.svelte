<script lang="ts">
	import { AlertStates } from '$lib/constants'
	import { alert } from '$lib/stores/observer'
	import { onMount } from 'svelte'
	import { scale } from 'svelte/transition'

	onMount(async () => {
		setTimeout(async () => {
			$alert = {
				status: '',
				message: '',
				duration: 0,
				show: false,
				action: false
			}
		}, $alert.duration)
	})

	const alert_state = AlertStates.get($alert.status)
</script>

<div
	transition:scale
	class="alert absolute left-[calc(50%_-_9rem)] top-28 z-50 w-72 justify-between border border-neutral shadow-lg shadow-neutral"
>
	<div>
		<iconify-icon icon={alert_state?.icon} class={alert_state?.color} width="24" height="24" />
		<span>{$alert.message}</span>
	</div>
	{#if $alert.action}
		<div class="flex-none">
			<button on:click={$alert.options?.fxn} class="btn-sm btn">{$alert.options?.text}</button>
		</div>
	{/if}
</div>
