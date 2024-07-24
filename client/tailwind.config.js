/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/**/*.{js,jsx,ts,tsx}' ],
	theme: {
        screens: {
            'sm': { 'min': '300px', 'max': '767px' },
            // => @media (min-width: 300px and max-width: 767px) { ... }

            'md': { 'min': '768px', 'max': '1023px' },
            // => @media (min-width: 768px and max-width: 1023px) { ... }

            'lg': { 'min': '1024px', 'max': '1535px' },
            // => @media (min-width: 1024px and max-width: 1535px) { ... }

            'xl': { 'min': '1536px' },
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            colors: {
                'primary': '#27374D',
                'secondary': '#526D82',
                'dark': '#9DB2BF',
                'light':'#DDE6ED',
                'danger': '#ff1744',
            },
            fontFamily: {
                'logo': [ 'Lora' ],
                sans: [ 'Nunito Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' ],
            }
        },
	},
	plugins: [],
};
