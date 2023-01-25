<script lang="ts">
	import { browser } from '$app/environment'
	// default theme
	var theme: string = browser ? document.cookie.split('=')[1] ?? 'black' : 'black'

	function set_theme() {
		theme = theme === 'black' ? 'lofi' : 'black'

		document.documentElement.dataset.theme = theme
		document.cookie = `se_theme=${theme};max-age=31536000;path="/"`
	}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<label
	class="swap pl-4 pt-2 justify-start swap-rotate {theme === 'black' ? '' : 'swap-active'}"
	on:click={set_theme}
>
	<iconify-icon class="swap-on" icon="ph:sun-duotone" width="24" height="24" />

	<iconify-icon class="swap-off" icon="ph:moon-stars-duotone" width="24" height="24" />
</label>
