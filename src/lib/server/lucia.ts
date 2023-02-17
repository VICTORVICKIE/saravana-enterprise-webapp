import { dev } from '$app/environment'
import { prisma } from '$lib/server/prisma'
import prismaAdapter from '@lucia-auth/adapter-prisma'
import lucia from 'lucia-auth'

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (userData) => {
		return {
			userId: userData.id,
			phone: userData.phone,
			name: userData.name,
			role: userData.role,
			address: userData.address
		}
	}
})

export type Auth = typeof auth
