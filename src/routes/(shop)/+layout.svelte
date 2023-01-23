<script lang="ts">
	let toggle: boolean = false

	function toggle_sidebar(){
		toggle = !toggle
	}
</script>

<div class="drawer">
	<input id="toggle-sidebar" type="checkbox" class="drawer-toggle" bind:checked={toggle}/>
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-1">
                <a href = "/" class="btn btn-ghost normal-case text-xl">E-Commerce Client</a>
            </div>
            <div class="flex-none gap-2">
                <div class="form-control">
                <input type="text" placeholder="Search" class="input input-bordered" />
            </div>
            <div class="dropdown dropdown-end">

                <button class="btn btn-ghost btn-circle avatar" on:click={toggle_sidebar} >
                    <div class="w-10 rounded-full">
                        <img src="https://placeimg.com/80/80/people" alt="avatar"/>
                    </div>
                </button>
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
			<li><a on:click={toggle_sidebar} href = "/products">Profile</a></li>
			<li><a on:click={toggle_sidebar} href = "/products">Logout</a></li>
		</ul>
	</div>
</div>
