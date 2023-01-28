<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte'
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

<!-- grid-cols-fit is a custom extention applied in tailwind.config.cjs -->
<div class="grid grid-cols-fit gap-2 bg-base-200">
	{#each $search_store.filtered as product}
		<ProductCard {product} />
	{/each}
</div>
