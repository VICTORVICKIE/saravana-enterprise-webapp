export type User = {
	[key: string]: unknown
	id?: string
	name?: string
	phone?: string
	address?: string
	role: string
	notify_token?: string
}


export const UserKeys = ['id', 'name', 'phone', 'address', 'role', 'notify_token'] as const

export type Order = {
	id: number
	user: User
	items: Item
	total: number
	state: string
	ordered_at: string
	updated_at: string
}

export const OrderKeys = [
	'id',
	'user',
	'items',
	'total',
	'state',
	'ordered_at',
	'updated_at'
] as const

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

export const ProductKeys = [
	'id',
	'name',
	'brand',
	'category',
	'price',
	'description',
	'image_url',
	'search_terms'
] as const

export type Item = {
	product: Product
	subtotal: number
	quantity: number
}

export const ItemKeys = ['product', 'subtotal', 'quantity'] as const
