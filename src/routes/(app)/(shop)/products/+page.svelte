<script lang="ts">
    import ProductCard from '$lib/components/ProductCard.svelte'
    import { search_term } from '$lib/stores/observer'
    import { create_search_store, search_handler } from '$lib/stores/search'
    import type { Product } from '$lib/types'
    import { onDestroy } from 'svelte'
    import type { PageData } from './$types'

    export let data: PageData

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
