import { SECRET_DATABASE_URL } from '$env/static/private'
import { PrismaClient } from '@prisma/client'

const prisma =
	global.prisma ||
	new PrismaClient({
		datasources: {
			db: {
				url: SECRET_DATABASE_URL
			}
		}
	})

if (process.env.NODE_ENV === 'development') {
	global.prisma = prisma
}

export { prisma }
