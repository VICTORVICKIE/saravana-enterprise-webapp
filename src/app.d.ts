import type { User } from '$lib/types'
import type { PrismaClient } from '@prisma/client'

declare const __DATE__: string
declare const __RELOAD_SW__: boolean

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User
		}
		// interface PageData {}
		// interface Platform {}
	}
	var prisma: PrismaClient
}

export { }

