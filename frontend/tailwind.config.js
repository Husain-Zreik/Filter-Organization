/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00334a',
        accent: '#42a86c',
        secondary: '#2d4a5c',
        'bg-base': '#FAFAFA',
        'bg-light': '#F7F9FB',
        'border-light': '#E8EDF0',
        'status-confirmed': '#2e7d32',
        'status-false': '#c62828',
        'status-unverified': '#f9a825',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
