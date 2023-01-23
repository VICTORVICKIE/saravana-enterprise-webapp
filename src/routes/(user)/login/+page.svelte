<div class="flex justify-center flex-1 bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<form method="POST" action="?/login">
					<div class="form-control">
						<label class="label">
							<span class="label-text">Phone Number</span>
						</label>
						<label class="input-group">
							<span class="p-2 border-y border-l border-zinc-800">+91</span>
							<input name="phone-number" type="text" required placeholder="" class="input input-bordered" />
						</label>
						<label class="label">
							<span class="label-text">Passcode</span>
						</label>
						<div class="input-group">
							<input
								name="pass-code"
								type="password"
								required
								placeholder="⁎⁎⁎⁎"
								class="input input-bordered"
							/>
							<button class="btn btn-square">
								<iconify-icon icon="mdi:eye" width="24" height="24" ></iconify-icon>
							</button>
						</div>

						<button class="mt-4 btn btn-primary">Login</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
