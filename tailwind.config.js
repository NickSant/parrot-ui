/** @type {import('tailwindcss').Config} */

import scrollbar from 'tailwind-scrollbar'
import headless from '@headlessui/tailwindcss'

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [scrollbar, headless],
}

