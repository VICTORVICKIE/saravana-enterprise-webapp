<script lang="ts">
	import { numeric } from '$lib/validate/Numeric'

	let state = {
		pin: false,
		confirm: false
	}
</script>

<div class="flex flex-1 justify-center overflow-hidden bg-base-200">
	<div class="my-auto flex-row-reverse">
		<div class="w-full bg-base-100 p-12">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<form method="POST" action="?/register">
				<div class="form-control ">
					<label class="label">
						<span class="label-text">Name</span>
					</label>

					<input
						name="name"
						type="text"
						placeholder="Name"
						class="input-bordered input focus:outline-none"
					/>
					<label class="label">
						<span class="label-text">Phone Number</span>
					</label>
					<input
						name="phone"
						type="text"
						inputmode="numeric"
						on:keypress={numeric}
						pattern="\d*"
						placeholder="10 - Digits"
						class="input-bordered input max-w-[95vw] focus:outline-none"
					/>
					<label class="label">
						<span class="label-text">Address</span>
					</label>
					<textarea
						name="address"
						class="textarea-bordered textarea resize-none focus:outline-none"
						placeholder="Address"
					/>
					<label class="label">
						<span class="label-text">Passcode</span>
					</label>
					<div class="input-group">
						<input
							name="pin"
							type={state.pin ? 'text' : 'password'}
							inputmode="numeric"
							on:keypress={numeric}
							pattern="\d*"
							placeholder="xxxx"
							class="input-bordered input max-w-[80vw] focus:outline-none"
						/>
						<button
							type="button"
							class="btn-square btn flex-shrink"
							on:click={() => (state.pin = !state.pin)}
						>
							<iconify-icon icon="mdi:eye" width="24" height="24" />
						</button>
					</div>
					<label class="label">
						<span class="label-text">Confirm Passcode</span>
					</label>
					<div class="input-group">
						<input
							name="confirm_pin"
							inputmode="numeric"
							on:keypress={numeric}
							type={state.confirm ? 'text' : 'password'}
							pattern="\d*"
							placeholder="xxxx"
							class="input-bordered input max-w-[80vw] focus:outline-none"
						/>
						<button
							type="button"
							class="btn-square btn"
							on:click={() => (state.confirm = !state.confirm)}
						>
							<iconify-icon icon="mdi:eye" width="24" height="24" />
						</button>
					</div>
					<button type="submit" class="btn-primary btn mt-4">Register</button>
				</div>
			</form>
		</div>
	</div>
</div>
