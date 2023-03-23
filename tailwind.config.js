/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'black': '#242423',
      'grey-dark': '#333533',
      'yellow': '#f5cb5c',
      'grey': '#cfdbd5',
      'white': '#e8eddf',
      'red': '#ff4a4a',
    },
    extend: {
      fontFamily: {
        'gloock': ['Gloock', 'regular'],
      }
    },
  },
  plugins: [],
}
