import type { Item, Notify } from '$lib/types'
import { writable } from 'svelte/store'

export const state_list = writable<boolean>(false)

export const list_items = writable<Item[]>([])

export const total = writable<number>(0)

export const search_term = writable<string>('')

export const alert = writable<Notify>({
    status: '',
    message: '',
    show: false,
    duration: 0,
    action: false
})

export const loading = writable<boolean>(false)