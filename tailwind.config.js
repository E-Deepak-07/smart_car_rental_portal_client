/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Arial Black', 'Arial', 'sans-serif'],
      },
      colors: {
        'ride-yellow': '#ffff00',
        'ride-yellow-hover': '#e6e600',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}