/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { wine: 'var(--wine)', cream: 'var(--cream)', paper: 'var(--paper)' },
    fontFamily: { sans: ['Manrope', 'system-ui', 'sans-serif'], display: ['Fraunces', 'Georgia', 'serif'] },
  } },
  plugins: [],
};
