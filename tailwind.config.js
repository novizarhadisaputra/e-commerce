/** @type {import('tailwindcss').Config} */

const { AppColors } = require('./src/core/themes/colors');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: AppColors
    },
  },
  plugins: [],
}

