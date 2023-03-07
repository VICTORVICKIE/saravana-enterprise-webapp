<script lang="ts">
    import QuantityCounter from '$lib/components/QuantityCounter.svelte'
    import { list_items, total } from '$lib/stores/observer'
    import type { Item } from '$lib/types'

    export let item: Item

    // Updating Total cost and subtotal when quantity is changed
    $: {
        for (let list_item of $list_items) {
            if (list_item.product.id === item.product.id) {
                list_item.subtotal = item.product.price * item.quantity
            }
        }
        $total = $list_items.reduce((sum, item) => sum + item.subtotal, 0)
    }
</script>

<div class="relative flex w-full justify-between hover:cursor-default hover:bg-transparent">
    <div class="flex flex-col items-center gap-2 md:flex-row">
        <div
            class=" h-24 w-24  flex-shrink-0 overflow-hidden rounded-md border border-neutral-focus"
        >
            <img
                src={item.product.image_url}
                alt={item.product.name}
                class="h-full w-full object-cover object-center"
            />
        </div>

        <div class="text-base font-medium">
            <h3>{item.product.name}</h3>
        </div>
    </div>
    <div class="flex items-center justify-evenly gap-2 text-sm">
        <QuantityCounter bind:quantity={item.quantity} />
        <div class="text-md self-center font-bold">₹{item.subtotal}</div>
        <!-- negative because of padding -->
        <div class="absolute -top-4 -right-4">
            <button
                type="button"
                on:click={() => {
                    $list_items = [...$list_items.filter((i) => i !== item)]
                    $total = $list_items.reduce((sum, item) => sum + item.subtotal, 0)
                }}
            >
                <iconify-icon icon="ph:trash-duotone" width="24" height="24" style="color: red;" />
            </button>
        </div>
    </div>
</div>
