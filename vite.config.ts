import { sveltekit } from '@sveltejs/kit/vite'
import { multicssclass } from 'svelte-multicssclass'
import type { UserConfig } from 'vite'

const config: UserConfig = {
	plugins: [
		// @ts-ignore
		multicssclass(),
		sveltekit(),
	]
}

export default config
