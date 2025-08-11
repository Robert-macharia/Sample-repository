/***** @type {import('tailwindcss').Config} *****/
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          bg: '#141414',
          red: '#E50914',
          gray: '#808080'
        }
      },
      boxShadow: {
        glow: '0 0 20px rgba(229, 9, 20, 0.6)'
      }
    }
  },
  plugins: []
};