<script lang="ts">
    import ShopCard from '$lib/components/ShopCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<div class="flex overflow-x-auto">
    <table class="mx-auto table w-11/12">
        <!-- head -->
        <thead>
            <tr>
                <th>Shop</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody>
            {#each data.users as user}
                <ShopCard {user} />
            {/each}
        </tbody>
    </table>
</div>
