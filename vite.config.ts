import { sveltekit } from '@sveltejs/kit/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import type { UserConfig } from 'vite'

const config: UserConfig = {
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			scope: '/',
			base: '/',
			includeAssets: ['fonts/*.*', 'images/*.png'],
			registerType: 'autoUpdate',
			manifest: {
				name: 'Saravana Enterprise App',
				short_name: 'Saravana ENT',
				description: 'Saravana Enterprise Order App',
				theme_color: '#000000',
				display: 'standalone',

			}
		})
	]
}

export default config
