<script lang="ts">
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte'
	import { search_term } from '$lib/stores/search'

	let state = {
		sidebar: false,
		search: false
	}
	let search_group: HTMLDivElement

	function update_search_term(event) {
		search_term.update((search_term) => event.target.value)
	}

	function toggle_search_bar() {
		state.search = !state.search
		state.search ? search_group.classList.remove('hidden') : search_group.classList.add('hidden')
		search_group.querySelector('input')?.focus()
	}
</script>

<div class="drawer">
	<input id="toggle-sidebar" type="checkbox" class="drawer-toggle" bind:checked={state.sidebar} />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar justify-between bg-base-100">
			<div class="flex-none lg:hidden">
				<button class="btn btn-square btn-ghost" on:click={() => (state.sidebar = !state.sidebar)}>
					<iconify-icon icon="ph:list-duotone" width="24" height="24" />
				</button>
			</div>
			<div
				class="flex-1 px-2 mx-2 normal-case text-2xl {state.search ? 'hidden' : 'block'} md:block"
			>
				Saravana Enterprise
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<iconify-icon
				class="lg:hidden hover:cursor-pointer {state.search ? 'hidden' : 'block'}"
				icon="ph:magnifying-glass-duotone"
				width="24"
				height="24"
				on:click={toggle_search_bar}
			/>
			<div class="flex-none gap-2">
				<div class="form-control">
					<div bind:this={search_group} class="input-group hidden lg:block">
						<button on:click={toggle_search_bar} class="btn btn-square lg:hidden">
							<iconify-icon icon="ph:x-duotone" width="24" height="24" />
						</button>
						<input
							type="search"
							placeholder="Search..."
							class="input input-bordered focus:outline-none"
							on:input={update_search_term}
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Page content here -->
		<slot />
	</div>
	<div class="drawer-side">
		<label for="toggle-sidebar" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100">
			<!-- Sidebar content here -->
			<li>
				<a on:click={() => (state.sidebar = !state.sidebar)} href="/products">Profile</a>
			</li>
			<li>
				<a on:click={() => (state.sidebar = !state.sidebar)} href="/products">Logout</a>
			</li>
			<li><ThemeToggleButton /></li>
		</ul>
	</div>
</div>
