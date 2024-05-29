/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#30ab6d',
      warn: '#feb557',
      baseBg: '#eaeaea',
      navBg: '#ffffff',
      grey: '#86898f',
      danger: 'red',
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
