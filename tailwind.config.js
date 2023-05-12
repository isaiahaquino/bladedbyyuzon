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
      'grey-light': '#e8eddf',
      'white': '#f0f0f0',
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
