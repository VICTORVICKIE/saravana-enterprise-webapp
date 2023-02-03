const { default: themes } = require('daisyui/src/colors/themes')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,svelte,ts}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				fit: 'repeat(auto-fit, minmax(20rem, 1fr))'
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		styled: true,
		themes: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		themes: [
			{
				dark: {
					...require('daisyui/src/colors/themes')['[data-theme=black]'],
					'--btn-text-case': 'uppercase',
					'--rounded-box': '0.25rem',
					'--rounded-btn': '0.125rem',
					'--rounded-badge': '0.125rem',
					'--animation-btn': '0',
					'--animation-input': '0',
					'--btn-focus-scale': '1',
					'--tab-radius': '0'
				},
				light: {
					...require('daisyui/src/colors/themes')['[data-theme=lofi]']
				}
			}
		]
	}
}
