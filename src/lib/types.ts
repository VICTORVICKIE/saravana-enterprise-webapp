import type { OrderStates } from "$lib/constants"

export type User = {
    [key: string]: unknown
    id?: string
    name?: string
    phone?: string
    address?: string
    role: Role
    notify?: boolean
    notify_token?: string | undefined | null
}

export type Role = 'GUEST' | 'USER' | 'ADMIN'

export type Shop = {
    name?: string
    phone?: string
    address?: string
}

export type Order = {
    id: number
    user: User
    items: Item[]
    total: number
    discount: number
    state: State
    ordered_at: string
    updated_at: string
}

export type State = (typeof OrderStates)[number]

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


export interface Notify {
    message: string
    show: boolean
    status: string
    duration: number
    action: boolean
    options?: {
        url: string
        text: string
        fxn: () => void
    }
}
