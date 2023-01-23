<div class="flex justify-center flex-1 my-auto bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
                <!-- svelte-ignore a11y-label-has-associated-control -->
				<form method="POST" action="?/register"><div class="form-control">
					<label class="label">
						<span class="label-text">Name</span>
					</label>
					<input name="username" required type="text" placeholder="Name" class="input input-bordered" />
					<label class="label">
						<span class="label-text">Phone Number</span>
					</label>
					<label class="input-group">
						<span class="p-2 border-y border-l border-zinc-800">+91</span>
						<input name="phone" required type="text" placeholder="" class="input input-bordered" />
					</label>
					<label class="label">
						<span class="label-text">Address</span>
					</label>
					<textarea name="address" required class="textarea textarea-bordered resize-none" placeholder="Address" />
					<label class="label">
						<span class="label-text">Passcode</span>
					</label>
					<div class="input-group">
							<input
								name="pin"
								type="password"
								required
								placeholder="⁎⁎⁎⁎"
								class="input input-bordered"
							/>
							<button class="btn btn-square">
								<iconify-icon icon="mdi:eye" width="24" height="24" ></iconify-icon>
							</button>
						</div>
					<label class="label">
						<span class="label-text">Confirm Passcode</span>
					</label>
					<div class="input-group">
							<input
								name="confirm-pin"
								type="password"
								required
								placeholder="⁎⁎⁎⁎"
								class="input input-bordered"
							/>
							<button class="btn btn-square">
								<iconify-icon icon="mdi:eye" width="24" height="24" ></iconify-icon>
							</button>
						</div>
				
					<button class="mt-4 btn btn-primary">Register</button>
				</div>
				</form>
			</div>
		</div>
	</div>
</div>
