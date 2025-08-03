/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brandPink: '#ffe4e6',
        brandGreen: '#d1fae5',
      },
    },
    borderRadius: {
      '2xl': '1rem',
    },
  },
  plugins: [],
};
