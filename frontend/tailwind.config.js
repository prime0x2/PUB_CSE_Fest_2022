/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {},
		fontFamily: {
			'signika': ['Signika Negative', 'sans-serif'],
			'iceland': ['Iceland', 'cursive'],
			'iceberg': ['Iceberg', 'cursive'],
			'rampart': ['Rampart One', 'cursive'],
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}
