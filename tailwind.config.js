/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
],
  theme: {
    extend: {
      colors: {
        'primary-blue': {
          '50': '#f0f8ff',
          '100': '#dff0ff',
          '200': '#b8e3ff',
          '300': '#7accff',
          '400': '#33b3fd',
          '500': '#0999ee',
          '600': '#007acc',
          '700': '#0060a5',
          '800': '#04538a',
          '900': '#0a4570',
          '950': '#062b4b',
        },
        'secondary-orange': {
          '50': '#fefee8',
          '100': '#fefdc3',
          '200': '#fef88a',
          '300': '#fded47',
          '400': '#fadc15',
          '500': '#f0c808',
          '600': '#ca9804',
          '700': '#a16d07',
          '800': '#85550e',
          '900': '#714612',
          '950': '#422406',
        },
        'gray-text': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#474747',
          '900': '#3d3d3d',
          '950': '#262626',
        },
        'black-text': '#000500',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}