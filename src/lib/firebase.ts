import { browser } from '$app/environment'
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET
} from '$env/static/public'

import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getMessaging, type Messaging } from 'firebase/messaging'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const firebase_config = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	appId: PUBLIC_FIREBASE_APP_ID,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET
}

let messaging: Messaging
let storage: FirebaseStorage

if (browser) {
	const app: FirebaseApp = initializeApp(firebase_config, 'client')

	messaging = getMessaging(app)
	storage = getStorage(app)
}
export { messaging, storage }
