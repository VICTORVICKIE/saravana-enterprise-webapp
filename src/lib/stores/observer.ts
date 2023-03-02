import type { Item } from '$lib/types'
import { writable } from 'svelte/store'

export const state_list = writable<boolean>(false)

export const list_items = writable<Item[]>([])

export const total = writable<number>(0)

export const search_term = writable<string>('')

export const alert = writable<{ status: string, message: string, action: boolean, show: boolean }>({ status: '', message: '', action: false, show: false })