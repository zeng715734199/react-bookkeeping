/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#30ab6d',
      baseBg: '#eaeaea',
      navBg: '#ffffff',
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
