<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte'
	import type { Product } from '$lib/types/Product'
	export let product: Product = {
		title: 'iPhone 9',
		image: 'https://i.dummyjson.com/data/products/1/1.jpg',
		description: 'An apple mobile which is nothing like apple',
		brand: 'Apple',
		price: 100.0,
		category: 'smartphones',
		search_terms: 'iPhone 9 Apple smartphones'
	}
</script>

<div class="bg-base-200 grid">
	<ProductCard {product} />
</div>
