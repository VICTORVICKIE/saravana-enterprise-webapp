<script lang="ts">
	import type { Product } from '$lib/types/Product'
	import QuantityCounter from './QuantityCounter.svelte'
	export let product: Product

	let quantity: number = 1
	$: price = product.price * quantity
</script>

<div
	class="card mx-auto mt-12 w-80 bg-base-100 shadow-sm shadow-neutral transition-all hover:scale-[101%] hover:shadow-md hover:shadow-neutral-focus"
>
	<div class="card-title mx-8 my-4 justify-between">
		<h2>{product.title}</h2>
		<div class="badge">{product.category}</div>
	</div>
	<!-- Need to work on image here later -->
	<figure class="px-8">
		<img src={product.thumbnail} alt="Shoes" class="h-40 rounded-md" />
	</figure>
	<div class="card-body gap-4">
		<div class="card-actions items-center justify-between">
			<div class="flex">
				<iconify-icon class="my-auto" icon="ph:currency-inr-bold" />{price}
			</div>
			<QuantityCounter bind:quantity />
		</div>
		<div class="card-actions">
			<button class="btn-primary btn flex-1 rounded-md">Add to List</button>
		</div>
	</div>
</div>
