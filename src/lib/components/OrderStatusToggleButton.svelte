<script lang="ts">
    import { AUTH_HEADERS, OrderStates, OrderStatesColor } from '$lib/constants'
    import type { Order, State } from '$lib/types'

    export let order: Order

    export let color: string
    export let state: string
    
    let order_id: number = order.id
    let value: number = OrderStates.indexOf(order.state as State)

    const submit_state = async () => {
        const res = await fetch('/api/orders', {
            method: 'POST',
            ...AUTH_HEADERS,
            body: JSON.stringify(data)
        })
    }

    $: state = OrderStates[value]
    $: color = OrderStatesColor.get(state) as string
    
    $: data = { order_id, state }
</script>

<td>
    <input
        on:change={submit_state}
        type="range"
        min="1"
        max="3"
        bind:value
        class="range range-xs align-middle range-{color} w-12"
        step="1"
    />
</td>
