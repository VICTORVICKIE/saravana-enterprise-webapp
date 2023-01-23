<script lang="ts">
	let toggle: boolean = false

	function toggle_sidebar(){
		toggle = !toggle
	}
</script>

<div class="drawer">
	<input id = "toggle-sidebar" type="checkbox" class="drawer-toggle" bind:checked={toggle}/>
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-none lg:hidden">
				<button class="btn btn-square btn-ghost" on:click={toggle_sidebar}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</button>
			</div>
			<div class="flex-1 px-2 mx-2 normal-case text-xl">E-Commerce Client</div>
			<div class="flex-none hidden lg:block">
				<ul class="menu menu-horizontal">
					<!-- Navbar menu content here -->
					<li><a href="/login">Login</a></li>
					<li><a href="/register">Register</a></li>
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
		</ul>
	</div>
</div>
