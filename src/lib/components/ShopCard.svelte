<script lang="ts">
	import { PUBLIC_INTERNAL_API_KEY } from '$env/static/public'
	import type { User } from '$lib/types'

	export let user: User
	let disabled = {
		discount: true,
		nickname: true
	} as Record<string, boolean>

	async function set_discount(e: Event) {
		const target = (e.target as HTMLLabelElement).htmlFor
		disabled[target] = !disabled[target]

		if (disabled[target]) {
			const target_value = parseFloat(
				(document.querySelector(`[name="${target}"]`) as HTMLInputElement).value
			)

			if (target_value !== user.preference?.discount) {
				const res = await fetch(`/api/users/${user.id}`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${PUBLIC_INTERNAL_API_KEY}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ phone: user.phone, preference: { [target]: target_value } })
				})
			}
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<tr>
	<td
		><input
			name="discount"
			type="text"
			value={user.preference?.discount}
			class="input input-ghost input-sm w-16"
			disabled
		/>
		<br /><span class="text-xs">{user.phone}</span></td
	>
	<td>{user.address}</td>

	<td
		><div class="form-control">
			<div class="input-group-sm input-group">
				<input
					name="discount"
					type="text"
					value={user.preference?.discount}
					disabled={disabled.discount}
					class="input-bordered input input-sm w-16 focus:outline-none"
				/>
				<button class="btn-square btn-sm btn">
					<label
						on:click={set_discount}
						for="discount"
						class="swap-rotate swap h-full w-full {disabled.discount ? '' : 'swap-active'}"
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
