<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import Alert from '$lib/components/Alert.svelte'
	import ListCard from '$lib/components/ListCard.svelte'
	import ProductCard from '$lib/components/ProductCard.svelte'
	import { list_items, search_term, state_list, total } from '$lib/stores/observer'
	import { create_search_store, search_handler } from '$lib/stores/search'
	import type { Product } from '$lib/types'
	import { onDestroy } from 'svelte'
	import type { PageData } from './$types'

	export let data: PageData
	let placing_order: boolean = false

	const place_order: SubmitFunction = async () => {
		placing_order = true

		return async ({ update }) => {
			$list_items = []
			$total = 0
			placing_order = false
			await update()
		}
	}
	const search_products: Product[] = data.products.map((product: Product) => ({
		...product,
		search_terms: `${product.name} ${product.brand} ${product.category}`
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
		<!-- Product -->

		<!-- grid-cols-fit is a custom extension applied in tailwind.config.cjs -->
		<div class="grid grid-cols-fit gap-2 bg-base-200">
			{#each $search_store.filtered as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-4" class="drawer-overlay" />

		<div class="menu w-96 bg-base-100">
			<Alert content="List" />
			<ul class="h-[74vh] divide-y divide-neutral overflow-auto p-4">
				{#each $list_items as item}
					<li><ListCard {item} /></li>
				{/each}
			</ul>
			<div class="sticky bottom-0 w-full border border-neutral-focus bg-base-100 p-4">
				<div class="flex justify-between">
					<p>Total</p>
					<p>₹{$total}</p>
				</div>
				<form method="POST" action="?/order" use:enhance={place_order}>
					<input type="hidden" name="items" value={JSON.stringify($list_items)} />
					<input type="hidden" name="total" value={JSON.stringify($total)} />

					<button class="btn mt-4 w-full" disabled={placing_order}>
						{#if placing_order}
							<iconify-icon icon="eos-icons:loading" width="24" height="24" />
						{/if}
						Order</button
					>
				</form>
			</div>
		</div>
	</div>
</div>
