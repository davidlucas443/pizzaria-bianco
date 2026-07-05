/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f4',
          100: '#ffe4e1',
          200: '#ffbdb7',
          300: '#ff8a80',
          400: '#e95b51',
          500: '#d63c31',
          600: '#b51f1b',
          700: '#7b0f12',
          800: '#5e0c10',
          900: '#3b070a',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(10, 10, 10, 0.12)',
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(123, 15, 18, 0.18)',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top right, rgba(214, 60, 49, 0.24), transparent 34%), radial-gradient(circle at bottom left, rgba(255, 196, 0, 0.16), transparent 28%)',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['Fraunces', 'ui-serif', 'Georgia'],
      },
    },
  },
  plugins: [],
};