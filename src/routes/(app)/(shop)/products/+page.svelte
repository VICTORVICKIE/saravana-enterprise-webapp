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
	const search_store = create_search_store(data.products as Product[])
	const unsubscribe = search_store.subscribe((model) => search_handler(model))
	onDestroy(() => {
		unsubscribe()
	})

	search_term.subscribe((value) => {
		$search_store.search = value
	})
</script>

<div class="grid grid-cols-fit gap-2 bg-base-200">
	{#each $search_store.filtered as product}
		<ProductCard {product} />
	{/each}
</div>
