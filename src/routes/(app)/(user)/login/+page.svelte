<script lang="ts">
	import { numeric } from '$lib/validate/Numeric'

	let state = { show_pin: false }
</script>

<div class="flex flex-1 justify-center overflow-hidden  bg-base-200">
	<div class="my-auto flex-row-reverse">
		<div class="w-full bg-base-100 p-12">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<form method="POST" action="?/login">
				<div class="form-control">
					<label class="label">
						<span class="label-text">Phone Number</span>
					</label>

					<input
						name="phone-number"
						type="text"
						inputmode="numeric"
						on:keypress={numeric}
						pattern="\d*"
						placeholder="10 - Digits"
						class="input-bordered input focus:outline-none"
					/>
					<label class="label">
						<span class="label-text">Passcode</span>
					</label>
					<div class="input-group">
						<input
							name="pass-code"
							type={state.show_pin ? 'text' : 'password'}
							inputmode="numeric"
							on:keypress={numeric}
							pattern="\d*"
							placeholder="xxxx"
							class="input-bordered input max-w-[80vw] focus:outline-none"
						/>
						<button
							type="button"
							class="btn-square btn"
							on:click={() => (state.show_pin = !state.show_pin)}
						>
							<iconify-icon icon="mdi:eye" width="24" height="24" />
						</button>
					</div>

					<button type="submit" class="btn-primary btn mt-4">Login</button>
				</div>
			</form>
		</div>
	</div>
</div>
