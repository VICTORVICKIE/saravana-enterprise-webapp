<script lang="ts">
	import { browser } from '$app/environment'
	import { pwa_themes } from '$lib/constants'

	export let size: string
	// default theme
	var theme: string = browser ? document.cookie.split('=')[1] ?? 'dark' : 'dark'

	function set_theme() {
		theme = theme === 'dark' ? 'light' : 'dark'
		let theme_meta = document.documentElement.querySelector(
			'meta[name="theme-color"'
		) as HTMLMetaElement

		theme_meta.content = pwa_themes[theme]
		document.documentElement.dataset.theme = theme
		document.cookie = `se_theme=${theme};max-age=31536000;path="/";samesite=strict`
	}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<label
	class="swap-rotate swap justify-start pl-4 pt-2 {theme === 'dark' ? '' : 'swap-active'}"
	on:click={set_theme}
>
	<iconify-icon class="swap-on" icon="ph:sun-duotone" width={size} height={size} />

	<iconify-icon class="swap-off" icon="ph:moon-stars-duotone" width={size} height={size} />
</label>
