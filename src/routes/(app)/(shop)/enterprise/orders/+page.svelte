<script lang="ts">
	import { page } from '$app/stores'
	import OrderCard from '$lib/components/OrderCard.svelte'
	import type { Order } from '$lib/types'
	import type { PageData } from './$types'

	export let data: PageData
	let orders: Order[] = data.orders
</script>

<div class="flex overflow-x-auto">
	<table class="mx-auto table w-11/12">
		<!-- head -->
		<thead>
			<tr>
				<th>Id</th>
				<th>Shop</th>
				<th>Total</th>
				<th>Status</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each orders as order}
				<OrderCard {order} />
			{/each}
		</tbody>
	</table>
</div>
