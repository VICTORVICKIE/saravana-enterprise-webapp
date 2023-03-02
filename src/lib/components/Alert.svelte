<script lang="ts">
	import { alert } from '$lib/stores/observer'
	import { scale } from 'svelte/transition'

	export let content: string

	console.log(content)
</script>

<div
	transition:scale
	class="alert absolute left-[calc(50%_-_8rem)] top-28 z-50 w-64 justify-center border border-neutral shadow-lg shadow-neutral"
>
	<div>
		<iconify-icon icon="ph:warning-duotone" class="text-warning" width="24" height="24" />
		<span>{$alert.message}</span>
	</div>
</div>
