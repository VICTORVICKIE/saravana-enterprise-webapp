import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/*
model Product {
  id          Int     @id @default(autoincrement())
  name        String  @unique
  brand       String
  category    String
  price       Decimal
  description String?
  image_url   String
  items       Item[]

  @@index([name])
}
*/
let products: string[] = [
	'Indian Masala',
	'Cream & Onion',
	'Kashmiri Chilli',
	'Spanish Tomato',
	'Classic Salted'
]
let links: string[] = [
	'https://firebasestorage.googleapis.com/v0/b/saravana-enterprise.appspot.com/o/tooyumm-blue.png?alt=media&token=13794913-74ee-4215-b2ee-2fcbbeaa4e75',
	'https://firebasestorage.googleapis.com/v0/b/saravana-enterprise.appspot.com/o/tooyumm-green.png?alt=media&token=75232f54-dbbe-4452-ae99-1729069fb715',
	'https://firebasestorage.googleapis.com/v0/b/saravana-enterprise.appspot.com/o/tooyumm-orange.png?alt=media&token=8ed406da-3a94-4466-b814-112c708afe56',
	'https://firebasestorage.googleapis.com/v0/b/saravana-enterprise.appspot.com/o/tooyumm-red.png?alt=media&token=123a765d-706d-419b-939f-68e803d9b11c',
	'https://firebasestorage.googleapis.com/v0/b/saravana-enterprise.appspot.com/o/tooyumm-yellow.png?alt=media&token=22a63fd5-73f7-4fcd-9b0a-ea5ddfef91f5'
]

async function seed() {
	for (let i = 0; i < products.length; i++) {
		await prisma.product.create({
			data: {
				name: products[i],
				brand: 'Too Yumm',
				category: 'Chips',
				price: 54,
				image_url: links[i]
			}
		})
	}
}

seed()
