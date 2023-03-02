importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

const version = 1

const channel = new BroadcastChannel('notification-click')

self.addEventListener('notificationclick', function ({ notification }) {
	notification.close()
	channel.postMessage(notification.data.FCM_MSG.data.url)
})

async function initialize_firebase() {
	try {
		const response = await fetch('/init/firebase', {
			headers: {
				referer: '/firebase-messaging-sw.js'
			}
		})
		const config = await response.json()

		firebase.initializeApp(config)
		const messaging = firebase.messaging()
	} catch (error) {
		console.error(error)
	}
}

initialize_firebase()
