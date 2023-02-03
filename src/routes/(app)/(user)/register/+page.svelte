<script lang="ts">
	import { enhance } from '$app/forms'
	import Alert from '$lib/components/Alert.svelte'
	import { numeric } from '$lib/validate/Numeric'
	import type { ActionData } from './$types'

	let state = {
		pin: false,
		confirm: false
	}

	export let form: ActionData
</script>

<div class="flex flex-1 justify-center overflow-hidden bg-base-200">
	<div class="my-auto flex-row-reverse">
		<div class="w-full bg-base-100 p-12">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<form method="POST" action="?/register" use:enhance>
				<div class="grid grid-cols-1">
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

					<!-- Phone -->
					<label class="label">
						<span class="label-text">Phone Number</span>
					</label>
					<input
						name="phone"
						type="text"
						inputmode="numeric"
						on:keypress={numeric}
						placeholder="10 - Digits"
						class="input-bordered input focus:outline-none"
					/>
					<label class="label justify-end">
						<span class="label-text-alt">Alt label</span>
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

					<!-- Pin -->
					<label class="label">
						<span class="label-text">Passcode</span>
					</label>
					<div class="input-group">
						<input
							name="pin"
							type={state.pin ? 'text' : 'password'}
							inputmode="numeric"
							on:keypress={numeric}
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

					<!-- Confirm Pin -->
					<label class="label">
						<span class="label-text">Confirm Passcode</span>
					</label>
					<div class="input-group">
						<input
							name="confirm_pin"
							inputmode="numeric"
							on:keypress={numeric}
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
