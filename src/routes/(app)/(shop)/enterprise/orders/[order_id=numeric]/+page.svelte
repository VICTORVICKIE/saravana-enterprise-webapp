<script lang="ts">
	import ItemCard from '$lib/components/ItemCard.svelte'
	import type { Item, Product } from '$lib/types'
	import type { PageData } from './$types'

	export let data: PageData
	let items: Item[] = data.order.items.map(
		(item: any) =>
			({
				...item.product,
				subtotal: item.product.price * item.quantity,
				quantity: item.quantity
			} as Item)
	)
</script>

<div class="grid grid-flow-row">
	<div class="flex justify-between p-8 md:px-24">
		<h1>Shop: {data.order.user.name}</h1>
		<h1>Phone: {data.order.user.phone}</h1>
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

	<div class="sticky bottom-0 flex justify-end border border-neutral bg-base-100 p-8 md:px-56">
		<h1>Total: {data.order.total}</h1>
	</div>
</div>
