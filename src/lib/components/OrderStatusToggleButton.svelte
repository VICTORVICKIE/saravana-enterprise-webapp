<script lang="ts">
	import { PUBLIC_INTERNAL_API_KEY } from '$env/static/public'
	import { StateColors, States, type State } from '$lib/constants'
	import type { Order } from '$lib/types'

	export let order: Order

	export let color: string
	export let text: string

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

	$: text = States[value]
	$: color = StateColors[value]

	let order_id: number = order.id
	$: data = { order_id, value }
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
