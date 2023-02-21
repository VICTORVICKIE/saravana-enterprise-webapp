<script lang="ts">
	import ShopCard from '$lib/components/ShopCard.svelte'
	import type { User } from '$lib/types'
	import type { PageData } from './$types'

	export let data: PageData
	let users: User[] = data.users
</script>

<div class="flex overflow-x-auto">
	<table class="mx-auto table w-11/12">
		<!-- head -->
		<thead>
			<tr>
				<th>Name</th>
				<th>Phone</th>
				<th>Address</th>
				<th>Discount</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<ShopCard {user} />
			{/each}
		</tbody>
	</table>
</div>
