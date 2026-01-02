/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'maroon': {
                    DEFAULT: '#8B0000',
                    50: '#FFE5E5',
                    100: '#FFCCCC',
                    200: '#FF9999',
                    300: '#FF6666',
                    400: '#FF3333',
                    500: '#CC0000',
                    600: '#8B0000',
                    700: '#660000',
                    800: '#4D0000',
                    900: '#330000',
                },
                'gold': {
                    DEFAULT: '#D4AF37',
                    50: '#FBF8E8',
                    100: '#F7F0D1',
                    200: '#EFE1A3',
                    300: '#E7D275',
                    400: '#DFC347',
                    500: '#D4AF37',
                    600: '#B8962C',
                    700: '#8F7422',
                    800: '#665217',
                    900: '#3D300D',
                },
                'parchment': {
                    DEFAULT: '#fdfbf7',
                    50: '#fdfbf7',
                    100: '#f9f5ed',
                    200: '#f3ebe1',
                    300: '#ede1d5',
                    400: '#e7d7c9',
                    500: '#e1cdbd',
                },
            },
            fontFamily: {
                sans: ['Lato', 'system-ui', 'sans-serif'],
                serif: ['Cinzel', 'serif'],
                display: ['Playfair Display', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
