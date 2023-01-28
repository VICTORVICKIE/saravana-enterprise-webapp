<script lang="ts">
	import { numeric } from '$lib/validate/Numeric'

	export let quantity = 1
</script>

<div class="flex flex-row h-10 w-fit rounded-md">
	<button
		data-action="decrement"
		class=" h-full w-8 rounded-l-md cursor-pointer outline-none"
		disabled={quantity <= 1}
		on:click={() => quantity--}
	>
		<span class="m-auto text-2xl font-thin">−</span>
	</button>
	<input
		type="text"
		inputmode="numeric"
		pattern="\d*"
		class="input input-bordered text-center h-full w-16"
		name="custom-input-number"
		value={quantity}
		on:keypress={numeric}
	/>
	<button
		data-action="increment"
		class=" h-full w-8 rounded-r-md cursor-pointer"
		on:click={() => quantity++}
	>
		<span class="m-auto text-2xl font-thin">+</span>
	</button>
</div>
