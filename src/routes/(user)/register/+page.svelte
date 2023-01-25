<script lang="ts">
</script>

<div class="flex flex-1 overflow-hidden justify-center bg-base-200">
	<div class="my-auto flex-row-reverse">
		<div class="w-full bg-base-100 p-12">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<form method="POST" action="?/register">
				<div class="form-control ">
					<label class="label">
						<span class="label-text">Name</span>
					</label>

					<input name="username" type="text" placeholder="Name" class="input input-bordered" />
					<label class="label">
						<span class="label-text">Phone Number</span>
					</label>
					<input
						name="phone"
						type="text"
						inputmode="numeric"
						pattern="\d*"
						placeholder="10 - Digits"
						class="input input-bordered max-w-[95vw]"
					/>
					<label class="label">
						<span class="label-text">Address</span>
					</label>
					<textarea
						name="address"
						class="textarea textarea-bordered resize-none"
						placeholder="Address"
					/>
					<label class="label">
						<span class="label-text">Passcode</span>
					</label>
					<div class="input-group">
						<input
							name="pin"
							type="password"
							inputmode="numeric"
							pattern="\d*"
							placeholder="xxxx"
							class="input input-bordered max-w-[80vw]"
						/>
						<button type="button" class="btn btn-square flex-shrink">
							<iconify-icon icon="mdi:eye" width="24" height="24" />
						</button>
					</div>
					<label class="label">
						<span class="label-text">Confirm Passcode</span>
					</label>
					<div class="input-group">
						<input
							name="confirm-pin"
							inputmode="numeric"
							type="password"
							pattern="\d*"
							placeholder="xxxx"
							class="input input-bordered max-w-[80vw]"
						/>
						<button type="button" class="btn btn-square">
							<iconify-icon icon="mdi:eye" width="24" height="24" />
						</button>
					</div>
					<button type="submit" class="mt-4 btn btn-primary">Register</button>
				</div>
			</form>
		</div>
	</div>
</div>
