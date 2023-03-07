export function numeric(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement

    switch (input.name) {
        case 'phone':
            break

        default:
            break
    }

    if (!/^\d+$/.test(event.key) && event.key !== 'Enter') {
        event.preventDefault()
    }
}
