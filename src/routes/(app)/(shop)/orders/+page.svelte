<script lang="ts">
    import { invalidateAll } from '$app/navigation'
    import OrderCard from '$lib/components/OrderCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>

{#if data.orders}
    <div class="flex overflow-x-auto">
        <table class="mx-auto table w-11/12">
            <!-- head -->
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Shop</th>
                    <th>Total</th>
                    <th>Status</th>
                    {#if data.user.role === 'ADMIN'}
                        <th />
                    {/if}
                </tr>
            </thead>
            <tbody>
                {#each data.orders as order}
                    <OrderCard {order} />
                {/each}
            </tbody>
        </table>
    </div>
{:else}
    <div class="flex flex-1">
        <div class="m-auto flex flex-col items-center">
            <button on:click={() => invalidateAll()} class="btn-ghost btn bg-transparent">
                <iconify-icon width="36" icon="ph:arrow-clockwise-duotone" />
            </button>
            <h1 class="text-2xl font-bold">Refresh</h1>
            <h1 class="font-bold">Error loading data</h1>
        </div>
    </div>
{/if}
