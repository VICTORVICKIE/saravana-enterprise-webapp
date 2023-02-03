<script lang="ts">
	import QuantityCounter from './QuantityCounter.svelte'

	let initial = 100
	let quantity: number = 1
	$: price = initial * quantity
</script>

<div class="hover:cursor-default hover:bg-transparent">
	<div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-focus">
		<img
			src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
			alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
			class="h-full w-full object-cover object-center"
		/>
	</div>

	<div class="ml-4 flex flex-1 flex-col">
		<div>
			<div class="flex justify-between text-base font-medium">
				<h3>
					<a href="#">Throwback Hip Bag</a>
				</h3>
				<p class="ml-4">₹{price}</p>
			</div>
		</div>
		<div class="mt-4 flex flex-1 items-end justify-between text-sm">
			<QuantityCounter bind:quantity />

			<div class="flex">
				<button type="button"
					><iconify-icon
						icon="ph:trash-duotone"
						width="24"
						height="24"
						style="color: red;"
					/></button
				>
			</div>
		</div>
	</div>
</div>
