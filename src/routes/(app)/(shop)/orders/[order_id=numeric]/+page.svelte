<script lang="ts">
	import { browser } from '$app/environment'
	import { invalidate, invalidateAll } from '$app/navigation'
	import { PUBLIC_INTERNAL_API_KEY } from '$env/static/public'
	import ItemCard from '$lib/components/ItemCard.svelte'
	import OrderStatusToggleButton from '$lib/components/OrderStatusToggleButton.svelte'
	import type { Item } from '$lib/types'
	import type { PageData } from './$types'

	export let data: PageData

	let color: string = ''
	let text: string = data.order.state

	let disabled = {
		discount: false
	}

	$: {
		disabled.discount = text.toLowerCase() !== 'ordered'
		if (browser) invalidateAll()
	}
	$: disabled = disabled

	let state = {
		discount: false
	}
	let items: Item[] = data.order.items.map(
		(item: any) =>
			({
				product: item.product,
				subtotal: item.product.price * item.quantity,
				quantity: item.quantity
			} as Item)
	)

	async function set_discount(event: Event) {
		const target = (event.target as HTMLLabelElement).htmlFor
		const input = document.querySelector(`[name="${target}"]`) as HTMLInputElement

		if (input.value) {
			if (state.discount) {
				input.value = '0'
			}
			const res = await fetch(`/api/orders/${data.order.id}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${PUBLIC_INTERNAL_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ [target]: input.value })
			})
		}
		state.discount = !state.discount
		invalidateAll()
	}
</script>

<div class="grid grid-flow-row">
	<div class="flex justify-between p-8 md:px-24">
		<div class="flex flex-col">
			<h1>Shop: {data.order.user.name}</h1>
			<h1>Phone: {data.order.user.phone}</h1>
		</div>
		<div class="flex flex-col">
			<div class="badge-{color} badge badge-sm w-20 gap-2">{text}</div>
			<div class="mx-auto">
				<OrderStatusToggleButton bind:color bind:text order={data.order} />
			</div>
		</div>
	</div>

	<div class="h-[74vh] overflow-auto">
		<table class="mx-auto table w-11/12">
			<!-- head -->
			<thead class="sticky top-0 border-b">
				<tr>
					<th>Name</th>
					<th class="text-center">Price</th>
					<th class="text-center">Qty</th>
					<th class="text-center">Subtotal</th>
				</tr>
			</thead>
			<tbody>
				{#each items as item}
					<ItemCard {item} />
				{/each}
			</tbody>
		</table>
	</div>

	<div class="sticky bottom-6 flex justify-between border border-neutral bg-base-100 p-6">
		<div class="form-control items-center justify-start sm:flex-row">
			<div class="w-full">Discount ₹</div>
			<label class="input-group">
				<input
					name="discount"
					type="text"
					disabled={disabled.discount}
					class="input-bordered input input-xs mt-2 w-24 align-middle sm:ml-2 sm:mt-0"
					placeholder={data.order.discount !== '0' ? '0' : ''}
					value={data.order.discount === '0' ? '' : data.order.discount}
				/>
				<div class="ml-3 flex items-center">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<label
						for="discount"
						on:click={set_discount}
						class="{state.discount ? '' : 'swap-active'} swap-rotate swap"
					>
						<iconify-icon
							class="swap-on pointer-events-none"
							icon="ph:check-duotone"
							width="24"
							height="24"
						/>
						<iconify-icon
							class="swap-off pointer-events-none"
							icon="ph:x-duotone"
							width="24"
							height="24"
						/>
					</label>
				</div>
			</label>
		</div>
		<div class="flex flex-col items-center">
			<h1>Sub Total: {data.order.total}</h1>
			<h1>Total: {data.order.total - data.order.discount}</h1>
		</div>
	</div>
</div>
