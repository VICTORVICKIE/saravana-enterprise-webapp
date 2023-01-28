<script lang="ts">
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte'
	import type { Product } from '$lib/types/Product'
	import QuantityCounter from './QuantityCounter.svelte'
	export let product: Product

	let quantity: number = 1
	$: price = product.price * quantity
</script>

<div
	class="card mx-auto mt-12 w-80 bg-base-100 shadow-sm shadow-[#808080] transition-all hover:scale-[101%] hover:shadow-md hover:shadow-zinc-800 "
>
	<div class="mx-8 justify-between card-title my-4">
		<h2>{product.title}</h2>
		<div class="badge">{product.category}</div>
	</div>
	<figure class="px-8">
		<img src={product.image} alt="Shoes" class="rounded-md" />
	</figure>
	<div class="card-body gap-4">
		<div class="card-actions items-center justify-between">
			<div class="flex">
				<iconify-icon class="my-auto" icon="ph:currency-inr-bold" />{price}
			</div>
			<QuantityCounter bind:quantity />
		</div>
		<div class="card-actions">
			<button class="btn flex-1 rounded-md btn-primary">Add to List</button>
			<ThemeToggleButton />
		</div>
	</div>
</div>
