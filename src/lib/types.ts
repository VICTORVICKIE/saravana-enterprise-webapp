export type Product = {
	id: number
	name: string
	brand: string
	category: string
	price: number
	description?: string
	image_url: string
	search_terms: string
}

export type Item = {
	product: Product
	subtotal: number
	quantity: number
}

export type Order = {
	id: number
	user: User
	items: Item
	total: number
	state: string
	ordered_at: string
	updated_at: string
}

export type User = {
	name: string
	phone: string
	address: string
	role: string
}

export type Preference = {
	user: User
	discount: number
	theme: string
	notification_token: string
}
