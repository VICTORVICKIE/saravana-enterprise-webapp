<script lang="ts">
	import { page } from '$app/stores'
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte'
	import { Roles } from '$lib/constants'
	import { search_term, state_list } from '$lib/stores/observer'
	import type { LayoutData } from './$types'

	export let data: LayoutData
	let state = {
		sidebar: false,
		search: false
	}

	let search_group: HTMLDivElement

	function update_search_term(event: Event) {
		const input = event.target as HTMLInputElement
		$search_term = input.value
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
		<div class="navbar sticky top-0 z-20 w-full justify-between gap-2 bg-base-100">
			<div class="flex-none">
				<button
					aria-label="Toggle Drawer"
					class="btn-ghost btn-square btn"
					on:click={() => (state.sidebar = !state.sidebar)}
				>
					<iconify-icon icon="ph:list-duotone" width="36" height="36" />
				</button>
			</div>
			<div
				class="mx-2 flex-1 px-2 text-2xl normal-case {state.search ? 'hidden' : 'block'} md:block"
			>
				Saravana Enterprise
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<iconify-icon
				class="hover:cursor-pointer lg:hidden {state.search ? 'hidden' : 'block'}"
				icon="ph:magnifying-glass-duotone"
				width="36"
				height="36"
				on:click={toggle_search_bar}
			/>
			<div class="flex-none gap-2">
				<div class="form-control">
					<div bind:this={search_group} class="input-group hidden h-9 lg:block">
						<button on:click={toggle_search_bar} class="btn-square btn h-9 min-h-0 w-9 lg:hidden">
							<iconify-icon icon="ph:x-duotone" width="36" height="36" />
						</button>
						<input
							type="search"
							placeholder="Search..."
							class="input-bordered input h-9 focus:outline-none"
							on:input={update_search_term}
						/>
					</div>
				</div>
			</div>
			<button on:click={() => state_list.update((x) => !x)}>
				<iconify-icon
					icon="ph:{$state_list ? 'note-pencil' : 'notepad'}-duotone"
					width="36"
					height="36"
				/>
			</button>
		</div>

		<!-- Page content here -->
		<slot />
	</div>

	<div class="drawer-side">
		<label for="toggle-sidebar" class="drawer-overlay" />
		<ul class="menu w-80 bg-base-100 p-4">
			<!-- Sidebar content here -->
			{#if data.user.role !== Roles[0]}
				<li>
					<a on:click={() => (state.sidebar = !state.sidebar)} href="/profile">Profile</a>
				</li>
				{#if data.user.role === Roles[2]}
					<li>
						<a on:click={() => (state.sidebar = !state.sidebar)} href="/enterprise/add"
							>New Product</a
						>
					</li>
					<li>
						<a on:click={() => (state.sidebar = !state.sidebar)} href="/enterprise/orders">Orders</a
						>
					</li>
					<li>
						<a on:click={() => (state.sidebar = !state.sidebar)} href="/enterprise/users">Shops</a>
					</li>
				{/if}
				<li>
					<form data-sveltekit-preload-data="off" action="/logout" method="POST">
						<button
							class="w-full text-start"
							on:click={() => (state.sidebar = !state.sidebar)}
							type="submit">Logout</button
						>
					</form>
				</li>
			{:else}
				<li>
					<a on:click={() => (state.sidebar = !state.sidebar)} href="/login">Login</a>
				</li>
				<li>
					<a on:click={() => (state.sidebar = !state.sidebar)} href="/register">Register</a>
				</li>
			{/if}

			<li><ThemeToggleButton size="24" /></li>
		</ul>
	</div>
</div>
