<script lang="ts">
	import { page } from '$app/stores'
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte'
	import { search_term } from '$lib/stores/search'

	let state = {
		sidebar: false,
		search: false
	}
	$: path = $page.url.pathname === '/products' ? true : false

	let search_group: HTMLDivElement

	function update_search_term(event: Event) {
		const input = event.target as HTMLInputElement
		search_term.update((search_term) => input.value)
	}

	function toggle_search_bar() {
		state.search = !state.search
		state.search ? search_group.classList.remove('hidden') : search_group.classList.add('hidden')
		search_group.querySelector('input')?.focus()
	}
</script>

<div class="drawer">
	<input
		id="toggle-sidebar"
		aria-label="Toggle Drawer"
		type="checkbox"
		class="drawer-toggle"
		bind:checked={state.sidebar}
	/>
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full sticky top-0 z-20 navbar justify-between gap-2 bg-base-100">
			<div class="flex-none lg:hidden">
				<button
					aria-label="Toggle Drawer"
					class="btn btn-square btn-ghost"
					on:click={() => (state.sidebar = !state.sidebar)}
				>
					<iconify-icon icon="ph:list-duotone" width="36" height="36" />
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
				width="36"
				height="36"
				on:click={toggle_search_bar}
			/>
			<div class="flex-none gap-2">
				<div class="form-control">
					<div bind:this={search_group} class="input-group h-9 hidden lg:block">
						<button on:click={toggle_search_bar} class="btn btn-square min-h-0 h-9 w-9 lg:hidden">
							<iconify-icon icon="ph:x-duotone" width="36" height="36" />
						</button>
						<input
							type="search"
							placeholder="Search..."
							class="input input-bordered h-9 focus:outline-none"
							on:input={update_search_term}
						/>
					</div>
				</div>
			</div>
			<a href={path ? '/list' : '/products'}>
				<iconify-icon icon="ph:{path ? 'notepad' : 'note-pencil'}-duotone" width="36" height="36" />
			</a>
		</div>

		<!-- Page content here -->
		<main>
			<slot />
		</main>
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
