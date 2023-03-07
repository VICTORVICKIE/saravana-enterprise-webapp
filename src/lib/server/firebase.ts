import { SECRET_FIREBASE_CLIENT_EMAIL, SECRET_FIREBASE_PRIVATE_KEY } from '$env/static/private'
import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public'
import { cert, initializeApp } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'

const admin = initializeApp(
    {
        credential: cert({
            projectId: PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: SECRET_FIREBASE_CLIENT_EMAIL,
            privateKey: SECRET_FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n')
        })
    },
    'server'
)

const messaging = getMessaging(admin)

export { messaging }
