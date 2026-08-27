/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nwpc: {
          blue: '#0d47a1',
          'blue-dark': '#002171',
          'blue-light': '#1e88e5',
          green: '#7bb31a',
          'green-dark': '#558b2f',
          'green-light': '#96c92c',
          yellow: '#fbc02d',
          gold: '#d4af37',
          dark: '#1e293b',
          surface: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'Comic Sans MS', 'sans-serif']
      }
    },
  },
  plugins: [],
}
