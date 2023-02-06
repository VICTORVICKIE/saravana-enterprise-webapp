export let pwa_themes: { [x: string]: string } = {
	dark: '#000000',
	light: '#ffffff'
}

export const Roles = ['GUEST', 'USER', 'ADMIN'] as const

export var StateColors = ['neutral', 'error', 'info', 'success']

export const States = ['PENDING', 'CANCELLED', 'ORDERED', 'DELIVERED'] as const

export type State = (typeof States)[number]
export type Role = (typeof Roles)[number]
