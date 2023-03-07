export const pwa_themes = {
    dark: '#000000',
    light: '#ffffff'
} as Record<string, string>

export const Roles = ['GUEST', 'USER', 'ADMIN'] as const

export const StateColors = ['neutral', 'error', 'info', 'success']

export const AlertStates = new Map([
    ['success', { icon: 'ph:check-circle-duotone', color: 'text-success' }],
    ['neutral', { icon: 'ph:confetti-duotone', color: 'text-neutral-content' }],
    ['info', { icon: 'ph:info-duotone', color: 'text-info' }],
    ['warning', { icon: 'ph:warning-circle-duotone', color: 'text-warning' }],
    ['error', { icon: 'ph:x-circle-duotone', color: 'text-error' }]
]) as Map<string, Record<string, string>>

export const States = ['PENDING', 'CANCELLED', 'ORDERED', 'DELIVERED'] as const

export type State = (typeof States)[number]
export type Role = (typeof Roles)[number]
