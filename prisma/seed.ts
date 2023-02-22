import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.SECRET_DATABASE_URL
		}
	}
})
async function hash(pin: string) {
	const encoded_pin = new TextEncoder().encode(pin)
	const buffer_pin = await crypto.subtle.digest('SHA-512', encoded_pin)
	const hashed_pin = Array.from(new Uint8Array(buffer_pin))
	const hex_pin = hashed_pin.map((x) => x.toString(16).padStart(2, '0')).join('')
	return hex_pin
}

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

let users = await (
	await fetch('https://dummyjson.com/users?limit=10&select=firstName,address,birthDate,phone')
).json()

users = users.users.map((user: any) => {
	const { firstName, address, birthDate, phone } = user
	const pin = birthDate.substring(0, 4)
	const modifiedPhone = phone.replace(/\s/g, '').replace('+', '').slice(2)
	const city = address.city
	return {
		name: firstName,
		pin,
		phone: modifiedPhone,
		address: city,
		role: 'USER',
		discount: Math.floor(Math.random() * 26)
	}
})

async function seed() {
	await prisma.item.deleteMany()
	await prisma.order.deleteMany()
	await prisma.product.deleteMany()
	for (let i = 0; i < products.length; i++) {
		await prisma.product.create({
			data: {
				name: products[i],
				brand: 'Too Yumm',
				category: 'Chips',
				price: 54,
				image_url: links[i],
				search_terms: `${products[i]} Too Yumm Chips`
			}
		})
	}

	for (let { name, phone, address, pin, role, discount } of users) {
		await prisma.user.create({
			data: {
				name,
				phone,
				address,
				hashed_password: await hash(pin),
				role
			}
		})
	}
}

seed()
