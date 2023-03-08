import { PUBLIC_INTERNAL_API_KEY } from '$env/static/public'
import type { Prisma } from '@prisma/client'

export const pwa_themes = {
    dark: '#000000',
    light: '#ffffff'
} as Record<string, string>

export const AlertStates = new Map([
    ['success', { icon: 'ph:check-circle-duotone', color: 'text-success' }],
    ['neutral', { icon: 'ph:confetti-duotone', color: 'text-neutral-content' }],
    ['info', { icon: 'ph:info-duotone', color: 'text-info' }],
    ['warning', { icon: 'ph:warning-circle-duotone', color: 'text-warning' }],
    ['error', { icon: 'ph:x-circle-duotone', color: 'text-error' }]
]) as Map<string, Record<string, string>>

export const OrderStates = new Map([
    ['PENDING', { index: 0, color: 'neutral' }],
    ['CANCELLED', { index: 1, color: 'error' }],
    ['ORDERED', { index: 2, color: 'info' }],
    ['DELIVERED', { index: 3, color: 'success' }]
]) as Map<string, Record<string, string | number>>


export const AUTH_HEADERS = {
    headers: {
        Authorization: `Bearer ${PUBLIC_INTERNAL_API_KEY}`
    }
}

export const SelectUser: Prisma.UserSelect = {
    id: true,
    phone: true,
    name: true,
    address: true,
    role: true,
    notify: true,
    notify_token: true
}

export const SelectShop: Prisma.UserSelect = {
    phone: true,
    name: true,
    address: true,
    role: true
}

export const IncludeShop: Prisma.OrderInclude = {
    user: {
        select: SelectShop
    }
}
