import { setCatchHandler, setDefaultHandler } from 'workbox-routing'
import { NetworkOnly } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope
const offline = 'offline.html'
// @ts-ignore
const build_date = __DATE__

setDefaultHandler(new NetworkOnly())

self.addEventListener('install', async (event) => {
	console.log(`SW Version built at: ${build_date}`)
	self.caches.delete('workbox-offline-fallbacks')
	event.waitUntil(
		self.caches
			.open('workbox-offline-fallbacks')
			.then((cache) => cache.add(new Request(offline, { cache: 'reload' })))
	)
})

const handler = async () => {
	const cache = await self.caches.open('workbox-offline-fallbacks')

	return (await cache.match(offline)) || Response.error()
}

setCatchHandler(handler)
