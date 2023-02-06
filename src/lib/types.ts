export type Product = {
	id: number
	name: string
	image_url: string
	description?: string
	brand: string
	price: number
	category: string
	search_terms: string
}

export type Item = Product & {
	subtotal: number
	quantity: number
}

export type Order = {
	id: number
	user: User
	total: number
	state: string
}

export type User = {
	name: string
	phone: string
	address: string
}
