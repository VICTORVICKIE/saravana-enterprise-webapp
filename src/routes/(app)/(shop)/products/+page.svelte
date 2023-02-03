<script lang="ts">
	import ListCard from '$lib/components/ListCard.svelte'
	import ProductCard from '$lib/components/ProductCard.svelte'
	import { state_list } from '$lib/stores/observer'
	import { create_search_store, search_handler, search_term } from '$lib/stores/search'
	import type { Product } from '$lib/types/Product'
	import { onDestroy } from 'svelte'
	import type { PageData } from './$types'

	export let data: PageData

	const search_products: Product[] = data.products.map((product: Product) => ({
		...product,
		search_terms: `${product.title} ${product.brand} ${product.category}`
	}))
	const search_store = create_search_store(search_products)
	const unsubscribe = search_store.subscribe((model) => search_handler(model))
	onDestroy(() => {
		unsubscribe()
	})

	search_term.subscribe((value) => {
		$search_store.search = value
	})
</script>

<div class="drawer drawer-end">
	<input id="my-drawer-4" type="checkbox" class="drawer-toggle" bind:checked={$state_list} />
	<div class="drawer-content">
		<!-- Page content here -->

		<!-- grid-cols-fit is a custom extention applied in tailwind.config.cjs -->
		<div class="grid grid-cols-fit gap-2 bg-base-200">
			{#each $search_store.filtered as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-4" class="drawer-overlay" />
		<ul class="menu w-96 bg-base-100 p-4">
			<!-- Sidebar content here -->
			<li><ListCard /></li>
		</ul>
	</div>
</div>
