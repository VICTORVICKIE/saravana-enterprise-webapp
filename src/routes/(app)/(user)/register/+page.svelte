<script lang="ts">
	import { enhance } from '$app/forms'
	import Alert from '$lib/components/Alert.svelte'
	import { input_validation } from '$lib/validate'
	import type { ActionData } from './$types'

	let state = {
		pin: false,
		confirm: false
	}

	export let form: ActionData
</script>

<div class="flex flex-1 justify-center bg-base-200">
	<div class="my-auto flex-row-reverse">
		<div class="w-full bg-base-100 p-12">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<form method="POST" action="?/register" use:enhance>
				<div class="grid grid-cols-1">
					<h1 class="mb-4 text-center text-2xl">Register</h1>
					<!-- Name -->
					<label class="label">
						<span class="label-text">Name</span>
					</label>
					<input
						name="name"
						type="text"
						placeholder="Name"
						class="input-bordered input focus:outline-none"
					/>
					<label class="label hidden justify-end">
						<span class="label-text-alt">Alt label</span>
					</label>

					<!-- Phone -->
					<label class="label">
						<span class="label-text">Phone Number</span>
					</label>
					<input
						name="phone"
						type="text"
						inputmode="numeric"
						on:keypress={input_validation}
						placeholder="10 - Digits"
						class="peer input-bordered input focus:outline-none"
					/>
					<!-- peer-data-[*error] is used to monitor if its present and show the error, nice little hack using custom validation and tailwind -->
					<label class="label hidden justify-end peer-data-[phone-error]:flex">
						<span class="label-text-alt">Minimum 10 digits</span>
					</label>

					<!-- Address -->
					<label class="label">
						<span class="label-text">Address</span>
					</label>
					<textarea
						name="address"
						class="textarea-bordered textarea resize-none focus:outline-none"
						placeholder="Address"
					/>
					<label class="label hidden justify-end ">
						<span class="label-text-alt">Alt label</span>
					</label>
					<!-- Pin -->
					<label class="label">
						<span class="label-text">Passcode</span>
					</label>
					<div class="input-group">
						<input
							name="pin"
							type={state.pin ? 'text' : 'password'}
							inputmode="numeric"
							on:keypress={input_validation}
							placeholder="xxxx"
							class="input-bordered input focus:outline-none"
						/>
						<button
							type="button"
							class="btn-square btn flex-shrink"
							on:click={() => (state.pin = !state.pin)}
						>
							<iconify-icon icon="mdi:eye" width="24" height="24" />
						</button>
					</div>
					<label class="label hidden justify-end peer-data-[pin-error]:flex">
						<span class="label-text-alt">Minimum 4 digits</span>
					</label>

					<!-- Confirm Pin -->
					<label class="label">
						<span class="label-text">Confirm Passcode</span>
					</label>
					<div class="input-group">
						<input
							name="confirm_pin"
							inputmode="numeric"
							on:keypress={input_validation}
							type={state.confirm ? 'text' : 'password'}
							placeholder="xxxx"
							class="input-bordered input focus:outline-none"
						/>
						<button
							type="button"
							class="btn-square btn"
							on:click={() => (state.confirm = !state.confirm)}
						>
							<iconify-icon icon="mdi:eye" width="24" height="24" />
						</button>
					</div>
					<label class="label hidden justify-end peer-data-[confirm_pin-error]:flex">
						<span class="label-text-alt">Minimum 4 digits</span>
					</label>

					<button type="submit" class="btn-primary btn my-4">Register</button>
					{#if form?.phone}
						<Alert content="User Already Exists" />
					{/if}
					{#if form?.invalid}
						<Alert content="Invalid" />
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>
