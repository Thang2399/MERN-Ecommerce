/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/**/*.{js,jsx,ts,tsx}' ],
	theme: {
		extend: {
            colors: {
                'primary': '#1769aa',
                'danger': '#ff1744'
            },
            fontFamily: {
                'logo': [ 'Lora' ]
            }
        },
	},
	plugins: [],
};
