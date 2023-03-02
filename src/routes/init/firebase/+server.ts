import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_PROJECT_ID
} from '$env/static/public'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	const firebase_config = {
		projectId: PUBLIC_FIREBASE_PROJECT_ID,
		apiKey: PUBLIC_FIREBASE_API_KEY,
		appId: PUBLIC_FIREBASE_APP_ID,
		messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID
	}
	return json(firebase_config)
}
