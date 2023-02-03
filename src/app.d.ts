import type { PrismaClient } from '@prisma/client'

declare global {
	namespace App {
		interface Locals {
			user: {
				phone?: string
				role: string
			}
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	var prisma: PrismaClient
}

export { }

