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
				name: 'Saravana Enterprise',
				short_name: 'Saravana Enterprise',
				description: 'Saravana Enterprise Order App',
				theme_color: '#000000',
				display: 'standalone',
				start_url: '/',
				icons: [
					{
						src: 'icons/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'icons/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'icons/maskable_icon.png',
						sizes: '196x196',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			}
		})
	]
}

export default config
