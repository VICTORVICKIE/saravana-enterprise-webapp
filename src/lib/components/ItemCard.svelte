<script lang="ts">
	import type { Item } from '$lib/types'

	export let item: Item
</script>

<tr class="hover h-28 hover:cursor-pointer">
	<td>
		<img src={item.product.image_url} alt={item.product.name} class="inline h-24 w-24" />
		{item.product.name}
	</td>
	<td class="text-center">₹{item.product.price}</td>
	<td class="text-center">x {item.quantity}</td>
	<td class="text-center">₹{item.subtotal}</td>
</tr>
