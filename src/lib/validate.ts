export function input_validation(event: KeyboardEvent) {
    let input = event.target as HTMLInputElement
    let pattern: RegExp;

    switch (input.name) {
        case 'phone':
            pattern = /^\d$/;
            break;
        case 'name':
            pattern = /^[a-zA-Z0-9\s._]+$/;
            break;
        case 'address':
            pattern = /^[a-zA-Z0-9\s,.-]+$/;
            break;
        case 'pin':
        case 'confirm_pin':
            pattern = /^\d$/;
            break;
        default:
            pattern = /.*/;
            break;
    }

    if (!pattern.test(event.key) && event.key !== 'Enter') {
        event.preventDefault();
    }

    if (input.name === 'phone' && input.value.length <= 10) {
        input.setAttribute(`data-${input.name}-error`, "")
    }

    if (['pin', 'confirm_pin'].includes(input.name) && input.value.length <= 4) {
        input.setAttribute(`data-${input.name}-error`, "")
    }

    if (input.name === 'phone' && input.value.length >= 10) {
        event.preventDefault()
        input.removeAttribute(`data-${input.name}-error`)
    }

    if (['pin', 'confirm_pin'].includes(input.name) && input.value.length >= 6) {
        event.preventDefault()
        input.removeAttribute(`data-${input.name}-error`)
    }
}
