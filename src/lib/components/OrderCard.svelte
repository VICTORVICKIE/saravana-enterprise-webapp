<script lang="ts">
	import { goto } from '$app/navigation'
	import { PUBLIC_INTERNAL_API_KEY } from '$env/static/public'
	import { StateColors, States, type State } from '$lib/constants'
	import type { Order } from '$lib/types'

	export let order: Order

	export let value: number = States.indexOf(order.state as State)

	const submit_state = async () => {
		const res = await fetch('/api/orders', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${PUBLIC_INTERNAL_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}
	const goto_order = () => goto(`/enterprise/orders/${order.id}`)

	$: text = States[value]
	$: color = StateColors[value]

	let order_id: number = order.id
	$: data = { order_id, value }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<tr class="hover hover:cursor-pointer">
	<td on:click={goto_order}>{order.id}</td>
	<td on:click={goto_order}>{order.user.name}</td>
	<td on:click={goto_order}>₹{order.total}</td>
	<td on:click={goto_order}><div class="badge-{color} badge badge-sm w-20 gap-2">{text}</div></td>
	{#if order.user.role === 'ADMIN'}
		<td>
			<input
				on:change={submit_state}
				type="range"
				min="1"
				max="3"
				bind:value
				class="range range-xs align-middle range-{color} w-16"
				step="1"
			/>
		</td>
	{/if}
</tr>
