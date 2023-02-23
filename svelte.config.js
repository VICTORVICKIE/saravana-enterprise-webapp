import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	},
	vitePlugin: {
		experimental: {
			inspector: {
				// change shortcut
				toggleKeyCombo: 'control-shift',
				// hold and release key to toggle inspector mode
				holdMode: true,
				// show or hide the inspector option
				showToggleButton: 'active',
				// inspector position
				toggleButtonPos: 'bottom-right'
			}
		}
	}
}

export default config
