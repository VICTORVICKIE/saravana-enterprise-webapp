export function input_validation(event: KeyboardEvent) {
	let input = event.target as HTMLInputElement
	let pattern: RegExp

	if (event.key !== 'Backspace') {
		input.setAttribute(`data-${input.name}-error`, '')
	}

	switch (input.name) {
		case 'phone':
			pattern = /^\d$/
			break
		case 'name':
			pattern = /^[a-zA-Z0-9\s._]+$/
			break
		case 'address':
			pattern = /^[a-zA-Z0-9\s,.-]+$/
			break
		case 'pin':
		case 'confirm':
			pattern = /^\d$/
			break
		default:
			pattern = /.*/
			break
	}

	if (!pattern.test(event.key) && event.key !== 'Enter') {
		event.preventDefault()
	}

	if (input.name === 'phone' && input.value.length <= 10) {
		input.setAttribute(`data-${input.name}-error`, '')
	}

	if (['pin', 'confirm'].includes(input.name) && input.value.length <= 4) {
		input.setAttribute(`data-${input.name}-error`, '')
	}

	if (input.name === 'phone' && input.value.length >= 10) {
		event.preventDefault()
		input.removeAttribute(`data-${input.name}-error`)
	}

	if (['pin', 'confirm'].includes(input.name) && input.value.length >= 4) {
		event.preventDefault()
		input.removeAttribute(`data-${input.name}-error`)
	}
}

export function paste_validation(event: ClipboardEvent) {
	let input = event.target as HTMLInputElement
	input.value = ''
}

export async function hash(pin: string) {
	const encoded_pin = new TextEncoder().encode(pin)
	const buffer_pin = await crypto.subtle.digest('SHA-512', encoded_pin)
	const hashed_pin = Array.from(new Uint8Array(buffer_pin))
	const hex_pin = hashed_pin.map((x) => x.toString(16).padStart(2, '0')).join('')
	return hex_pin
}

export async function compare(pin: string, pin_hash: string) {
	return (await hash(pin)) === pin_hash
}
