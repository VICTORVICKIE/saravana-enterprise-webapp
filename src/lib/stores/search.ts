import { writable } from 'svelte/store'

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
	data: T[]
	filtered: T[]
	search: string
}

export const create_search_store = <T extends Record<PropertyKey, any>>(data: T[]) => {
	const { subscribe, set, update } = writable<SearchStoreModel<T>>({
		data: data,
		filtered: data,
		search: ''
	})

	return {
		subscribe,
		set,
		update
	}
}

export const search_handler = <T extends Record<PropertyKey, any>>(store: SearchStoreModel<T>) => {
	const search_term = store.search.toLowerCase() || ''
	store.filtered = store.data.filter((item) => {
		return item.search_terms.toLowerCase().includes(search_term)
	})
}

export const search_term = writable<string>('')
