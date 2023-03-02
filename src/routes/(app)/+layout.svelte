<script lang="ts">
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte'

	let state = { sidebar: false }
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
		<div class="navbar sticky top-0 z-20 w-full bg-base-100">
			<div class="flex-none lg:hidden">
				<button
					aria-label="Toggle Drawer"
					class="btn-ghost btn-square btn"
					on:click={() => (state.sidebar = !state.sidebar)}
				>
					<iconify-icon icon="ph:list-duotone" width="24" height="24" />
				</button>
			</div>
			<div class="mx-2 flex-1 px-2 text-xl normal-case">Saravana Enterprise</div>
			<div class="hidden flex-none lg:block">
				<ul class="menu menu-horizontal">
					<!-- Navbar menu content here -->
					<li><a href="/login">Login</a></li>
					<li><a href="/register">Register</a></li>
					<li><ThemeToggleButton size="36" /></li>
				</ul>
			</div>
		</div>
		<!-- Page content here -->
		<slot />
	</div>
	<div class="drawer-side">
		<label for="toggle-sidebar" class="drawer-overlay" />
		<ul class="menu w-80 bg-base-100 p-4">
			<!-- Sidebar content here -->
			<li><a on:click={() => (state.sidebar = !state.sidebar)} href="/login">Login</a></li>
			<li><a on:click={() => (state.sidebar = !state.sidebar)} href="/register">Register</a></li>
			<li><ThemeToggleButton size="24" /></li>
		</ul>
	</div>
</div>
