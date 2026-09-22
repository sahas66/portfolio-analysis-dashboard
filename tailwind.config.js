/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563eb',
          red: '#dc2626',
          green: '#16a34a',
          amber: '#d97706',
        },
      },
      maxWidth: {
        content: '46rem',
      },
    },
  },
  plugins: [],
};
