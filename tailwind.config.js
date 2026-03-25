/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sber: {
          green: '#21A038',
          'green-dark': '#1a8030',
          'green-light': '#e8f7eb',
        },
      },
    },
  },
  plugins: [],
}
