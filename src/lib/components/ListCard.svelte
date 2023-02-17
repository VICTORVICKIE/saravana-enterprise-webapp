<script lang="ts">
	import { list_items, total } from '$lib/stores/observer'
	import type { Item } from '$lib/types'
	import QuantityCounter from './QuantityCounter.svelte'

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

<div class="hover:cursor-default hover:bg-transparent">
	<div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-focus">
		<img
			src={item.product.image_url}
			alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
			class="h-full w-full object-cover object-center"
		/>
	</div>

	<div class="ml-4 flex flex-1 flex-col">
		<div>
			<div class="flex justify-between text-base font-medium">
				<h3>{item.product.name}</h3>
				<p class="ml-4">₹{item.subtotal}</p>
			</div>
		</div>
		<div class="mt-4 flex flex-1 items-end justify-between text-sm">
			<QuantityCounter bind:quantity={item.quantity} />

			<div class="flex">
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
</div>
