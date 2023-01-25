<script lang="ts">
	import ThemeToggleButton from '$components/ThemeToggleButton.svelte'

	let toggle: boolean = false

	function toggle_sidebar() {
		toggle = !toggle
	}
</script>

<div class="drawer">
	<input id="toggle-sidebar" type="checkbox" class="drawer-toggle" bind:checked={toggle} />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-none lg:hidden">
				<button class="btn btn-square btn-ghost" on:click={toggle_sidebar}>
					<iconify-icon icon="ph:list-duotone" width="24" height="24" />
				</button>
			</div>
			<div class="flex-1 px-2 mx-2 normal-case text-xl">E-Commerce Client</div>
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
		<slot />
	</div>
	<div class="drawer-side">
		<label for="toggle-sidebar" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100">
			<!-- Sidebar content here -->
			<li><a on:click={toggle_sidebar} href="/login">Login</a></li>
			<li><a on:click={toggle_sidebar} href="/register">Register</a></li>
			<ThemeToggleButton />
		</ul>
	</div>
</div>
