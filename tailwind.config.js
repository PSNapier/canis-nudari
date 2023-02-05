/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'bg-img-dunes': "url('/img-dunes.png')",
      },
    },
  },
  plugins: [],
}