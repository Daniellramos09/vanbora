/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          canvas: '#FAF8F5',
          surface: '#FFFFFF',
          ink: '#16233B',
          muted: '#5B677E',
          blue: '#2764E8',
          'blue-dark': '#142544',
          'blue-soft': '#EBF2FE',
          yellow: '#F5A623',
          'yellow-light': '#FEF7E6',
          green: '#15803D',
          'green-soft': '#E8F8F0',
          border: '#E8E4DC',
          'border-strong': '#D4CEBF',
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        'towel': '0 8px 30px -4px rgba(22, 35, 59, 0.08), 0 2px 6px -1px rgba(22, 35, 59, 0.04)',
        'towel-hover': '0 16px 40px -6px rgba(22, 35, 59, 0.12), 0 4px 12px -2px rgba(22, 35, 59, 0.06)',
      }
    },
  },
  plugins: [],
}
