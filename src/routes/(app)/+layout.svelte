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
		<div class="w-full sticky top-0 z-20 navbar bg-base-100">
			<div class="flex-none lg:hidden">
				<button
					aria-label="Toggle Drawer"
					class="btn btn-square btn-ghost"
					on:click={() => (state.sidebar = !state.sidebar)}
				>
					<iconify-icon icon="ph:list-duotone" width="24" height="24" />
				</button>
			</div>
			<div class="flex-1 px-2 mx-2 normal-case text-2xl">Saravana Enterprise</div>
			<div class="flex-none hidden lg:block">
				<ul class="menu menu-horizontal">
					<!-- Navbar menu content here -->
					<li><a href="/login">Login</a></li>
					<li><a href="/register">Register</a></li>
					<li><ThemeToggleButton /></li>
				</ul>
			</div>
		</div>
		<!-- Page content here -->
		<main class="flex flex-1">
			<slot />
		</main>
	</div>
	<div class="drawer-side">
		<label for="toggle-sidebar" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100">
			<!-- Sidebar content here -->
			<li><a on:click={() => (state.sidebar = !state.sidebar)} href="/login">Login</a></li>
			<li><a on:click={() => (state.sidebar = !state.sidebar)} href="/register">Register</a></li>
			<li><ThemeToggleButton /></li>
		</ul>
	</div>
</div>
