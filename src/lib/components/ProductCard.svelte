<script lang="ts">
    import { list_items, total } from '$lib/stores/observer'
    import type { Item, Product } from '$lib/types'
    import QuantityCounter from './QuantityCounter.svelte'

    // Item is a product with a quantity

    export let product: Product

    let quantity = 1

    function add_to_list(item: Item) {
        let item_exists = false

        for (let list_item of $list_items) {
            if (list_item.product.id == item.product.id) {
                list_item.quantity += item.quantity
                list_item.subtotal = item.product.price * list_item.quantity
                item_exists = true
            }
        }

        $list_items = item_exists ? [...$list_items] : [...$list_items, item]
        $total = $list_items.reduce((sum, item) => sum + item.subtotal, 0)
    }
</script>

<div
    class="card mx-auto mt-12 w-80 bg-base-100 shadow-sm shadow-neutral transition-all hover:scale-[101%] hover:shadow-md hover:shadow-neutral-focus"
>
    <div class="card-title mx-8 my-4 justify-between">
        <h2>{product.name}</h2>
        <div class="badge">{product.category}</div>
    </div>
    <!--TODO: Need to work on image here later -->
    <figure class="px-8">
        <img src={product.image_url} alt={product.name} class="h-40 rounded-md" />
    </figure>
    <div class="card-body gap-4">
        <div class="card-actions items-center justify-between">
            <div class="flex">
                <iconify-icon class="my-auto" icon="ph:currency-inr-bold" />{product.price}
            </div>
            <QuantityCounter bind:quantity />
        </div>
        <div class="card-actions">
            <button
                class="btn-primary btn flex-1 rounded-md"
                on:click={() => {
                    add_to_list({ product, subtotal: product.price, quantity })
                }}>Add to List</button
            >
        </div>
    </div>
</div>
