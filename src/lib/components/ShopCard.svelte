<script lang="ts">
	import type { User } from '$lib/types'

	export let user: User
	let disabled = true

	async function set_discount(e: Event) {
		const target = (e.target as HTMLLabelElement).htmlFor
		disabled = !disabled

		if (disabled) {
			const target_value = parseFloat(
				(document.querySelector(`[name="${target}"]`) as HTMLInputElement).value
			)

			if (target_value !== user.preference?.discount) {
				console.log(target_value)
				// const res = await fetch(`/api/users/${user.userId}`, {
				// 	method: 'POST',
				// 	headers: {
				// 		Authorization: `Bearer ${PUBLIC_INTERNAL_API_KEY}`,
				// 		'Content-Type': 'application/json'
				// 	},
				// 	body: JSON.stringify({ [target]: target_value })
				// })
			}
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<tr>
	<td>{user.name}</td>
	<td>{user.phone}</td>
	<td>{user.address}</td>
	<td
		><div class="form-control">
			<div class="input-group">
				<input
					name="discount"
					type="text"
					value={user.preference?.discount}
					{disabled}
					class="input-bordered input focus:outline-none"
				/>
				<button class="btn-square btn">
					<label
						on:click={set_discount}
						for="discount"
						class="swap swap-rotate {disabled ? '' : 'swap-active'}"
					>
						<iconify-icon
							class="swap-on pointer-events-none"
							icon="ph:check-duotone"
							width="24"
							height="24"
						/>
						<iconify-icon
							class="swap-off pointer-events-none"
							icon="ph:pencil-simple-duotone"
							width="24"
							height="24"
						/>
					</label>
				</button>
			</div>
		</div></td
	>
</tr>
