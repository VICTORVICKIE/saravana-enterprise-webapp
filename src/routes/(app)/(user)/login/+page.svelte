<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms'
	import Alert from '$lib/components/Alert.svelte'
	import { input_validation } from '$lib/validate'
	import type { ActionData } from './$types'

	let state = { show_pin: false }

	export const form_validation: SubmitFunction = async ({ form, data }) => {
		console.log(data)
		return async ({ result, update }) => {
			if (result.type === 'success') {
				form.reset()
			}
			if (result.type === 'failure') {
				await applyAction(result)
			}
			await update()
		}
	}

	export let form: ActionData
</script>

<div class="flex flex-1 justify-center bg-base-200">
	<div class="my-auto flex-row-reverse">
		<div class="w-full bg-base-100 p-12">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<form method="POST" action="?/login" use:enhance>
				<div class="grid grid-cols-1 gap-1">
					<h1 class="mb-4 text-center text-2xl">Login</h1>
					<label class="label">
						<span class="label-text">Phone Number</span>
					</label>

					<input
						name="phone"
						type="text"
						inputmode="numeric"
						on:keypress={input_validation}
						placeholder="10 - Digits"
						class="input-bordered input focus:outline-none"
					/>
					<label class="label">
						<span class="label-text">Passcode</span>
					</label>
					<div class="input-group">
						<input
							name="pin"
							type={state.show_pin ? 'text' : 'password'}
							inputmode="numeric"
							on:keypress={input_validation}
							placeholder="xxxx"
							class="input-bordered input focus:outline-none"
						/>
						<button
							type="button"
							class="btn-square btn"
							on:click={() => (state.show_pin = !state.show_pin)}
						>
							<iconify-icon icon="mdi:eye" width="24" height="24" />
						</button>
					</div>

					<button type="submit" class="btn-primary btn my-4">Login</button>
					{#if form?.credentials}
						<Alert content="Invalid Credentials" />
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>
