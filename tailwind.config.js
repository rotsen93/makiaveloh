/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Override Tailwind's pink scale with the pastel green accent palette
        pink: {
          25: '#F5FBF7',
          50: '#EDFAF2',
          100: '#D3F2E0',
          200: '#A9E4C6',
          300: '#7ED3A8',
          400: '#52BD8A',
          500: '#35A46E',
          600: '#2B8A5C',
          700: '#26724D',
          800: '#215C40',
          900: '#1C4C36',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'bounce': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}