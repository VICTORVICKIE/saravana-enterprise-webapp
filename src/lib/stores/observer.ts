import type { Item } from '$lib/types/Item'
import { writable } from 'svelte/store'

export const state_list = writable<boolean>(false)

export const list_items = writable<Item>()