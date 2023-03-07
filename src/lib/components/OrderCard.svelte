<script lang="ts">
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import OrderStatusToggleButton from '$lib/components/OrderStatusToggleButton.svelte'
    import type { Order } from '$lib/types'

    export let order: Order

    let text: string
    let color: string

    const goto_order = () => goto(`/orders/${order.id}`)
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<tr class="hover hover:cursor-pointer">
    <td on:click={goto_order}>{order.id}</td>
    <td on:click={goto_order}>{order.user.name}</td>
    <td on:click={goto_order}>₹{order.total}</td>
    <td on:click={goto_order}><div class="badge-{color} badge badge-sm w-20 gap-2">{text}</div></td>
    {#if $page.data.user.role === 'ADMIN'}
        <td>
            <OrderStatusToggleButton bind:color bind:text {order} />
        </td>
    {/if}
</tr>
