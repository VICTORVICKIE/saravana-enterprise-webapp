<script lang="ts">
	import { enhance } from '$app/forms'
	import { PUBLIC_INTERNAL_API_KEY } from '$env/static/public'
	import { input_validation, paste_validation } from '$lib/validate'
	import type { PageData } from './$types'

	export let data: PageData
	const { user } = data
	let state = {
		pin: false
	}

	let disabled = {
		name: true,
		phone: true,
		address: true,
		pin: true
	} as Record<string, boolean>

	async function edit(e: Event) {
		const target = (e.target as HTMLLabelElement).htmlFor
		disabled[target] = !disabled[target]

		if (disabled[target]) {
			const target_value = (document.querySelector(`[name="${target}"]`) as HTMLInputElement).value

			if (target_value !== user[target]) {
				const res = await fetch(`/api/users/${user.id}`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${PUBLIC_INTERNAL_API_KEY}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ [target]: target_value })
				})
			}
		}
	}
</script>

<div class="flex flex-1 justify-center bg-base-200">
	<div class="my-auto flex-row-reverse">
		<div class="bg-base-100 py-12 pl-12 pr-8">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="grid grid-cols-[1fr_min-content] items-center">
				<h1 class="mb-4 text-center text-2xl">Profile</h1>

				<!-- Name -->
				<label class="label col-span-2">
					<span class="label-text">Name</span>
				</label>

				<input
					name="name"
					type="text"
					value={data.user.name}
					disabled={disabled.name}
					class="input-bordered input focus:outline-none"
				/>

				<label class="label hidden justify-end">
					<span class="label-text-alt">Alt label</span>
				</label>

				<div class="ml-3 -mt-1 flex">
					<label
						for="name"
						on:click={edit}
						class="{disabled.name ? '' : 'swap-active'} swap-rotate swap"
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
				</div>

				<!-- Phone -->
				<label class="label col-span-2">
					<span class="label-text">Phone Number</span>
				</label>

				<div class="indicator ">
					<label class="input-group">
						<span class="p-2">+91</span>
						<input
							id="phone"
							name="phone"
							type="text"
							inputmode="numeric"
							on:keypress={input_validation}
							on:keyup={input_validation}
							on:paste|preventDefault={paste_validation}
							value={data.user.phone}
							disabled={disabled.phone}
							class="peer input-bordered input focus:outline-none"
						/>
						<span
							class="badge indicator-item hidden translate-x-0 peer-data-[phone-error]:inline-flex"
							>Required</span
						>
					</label>
				</div>
				<div class="ml-3 -mt-1 flex">
					<label
						for="phone"
						on:click={edit}
						class="{disabled.phone ? '' : 'swap-active'} swap-rotate swap"
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
				</div>

				<!-- peer-data-[*error]:inline-flex hidden is used to monitor if its present and show the error, nice little hack using custom validation and tailwind -->

				<!-- Address -->
				<label class="label col-span-2">
					<span class="label-text">Address</span>
				</label>
				<textarea
					name="address"
					class="textarea-bordered textarea resize-none focus:outline-none"
					value={data.user.address}
					disabled={disabled.address}
				/>
				<label class="label hidden justify-end ">
					<span class="label-text-alt">Alt label</span>
				</label>
				<div class="ml-3 -mt-1 flex">
					<label
						for="address"
						on:click={edit}
						class="{disabled.address ? '' : 'swap-active'} swap-rotate swap"
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
				</div>

				<!-- Pin -->
				<label class="label col-span-2">
					<span class="label-text">Passcode</span>
				</label>
				<div class="indicator ">
					<div class="input-group">
						<input
							name="pin"
							type={state.pin ? 'text' : 'password'}
							inputmode="numeric"
							on:keypress={input_validation}
							on:keyup={input_validation}
							on:paste|preventDefault={paste_validation}
							placeholder="xxxx"
							disabled={disabled.pin}
							class="peer input-bordered input focus:outline-none"
						/>
						<span
							class="badge indicator-item pointer-events-none hidden translate-x-0 peer-data-[pin-error]:inline-flex"
							>Required</span
						>
						<button
							type="button"
							class="btn-square btn flex-shrink"
							on:click={() => (state.pin = !state.pin)}
						>
							<iconify-icon
								icon="ph:{state.pin ? 'eye-slash-duotone' : 'eye-duotone'}"
								width="24"
								height="24"
							/>
						</button>
					</div>
				</div>
				<div class="ml-3 -mt-1 flex">
					<label
						for="pin"
						on:click={edit}
						class="{disabled.pin ? '' : 'swap-active'} swap-rotate swap"
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
				</div>
			</div>
		</div>
	</div>
</div>
