export function numeric(event: { key: string; preventDefault: () => void }) {
	// custom logic for handling input
	if (!/^\d+$/.test(event.key) && event.key !== 'Enter') {
		event.preventDefault()
	}
}
