<script lang="ts">
    import { enhance, type SubmitFunction } from '$app/forms'
    import ListCard from '$lib/components/ListCard.svelte'
    import { list_items, total } from '$lib/stores/observer'

    let placing_order = false

    const place_order: SubmitFunction = async ({ data }) => {
        placing_order = true
        console.log(data)
        data.append('items', JSON.stringify($list_items))
        data.append('total', JSON.stringify($total))

        return async ({ update }) => {
            $list_items = []
            $total = 0
            placing_order = false
            await update()
        }
    }
</script>

{#if $list_items.length}
    <div class="relative flex flex-1 items-center justify-center bg-base-200">
        <div class="card  max-h-[80vh] w-11/12 overflow-y-scroll bg-base-100 shadow-xl">
            <div class="flex flex-col gap-8 p-8">
                {#each $list_items as item, n}
                    <ListCard {item} />
                    {#if n + 1 !== $list_items.length}
                        <div class="divider m-1" />
                    {/if}
                {/each}
            </div>
            <div
                class="sticky bottom-0 flex items-center justify-between border border-neutral bg-base-100 py-4 px-6"
            >
                <div class="text-lg font-bold">Total: ₹{$total}</div>
                <form action="?/order" method="post" use:enhance={place_order}>
                    <button class="btn"> Order </button>
                </form>
            </div>
        </div>
    </div>
{:else}
    <div class="my-auto grid gap-4 text-center">
        <h1 class="text-3xl">Your List is empty</h1>
        <a class="link-info link" href="/products"><h2>continue shopping</h2></a>
    </div>
{/if}
