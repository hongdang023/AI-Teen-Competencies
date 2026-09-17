/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#111111',
        primary: {
          DEFAULT: '#cc4e2d',
          foreground: '#ffffff',
          dark: '#b33d1e'
        },
        card: '#ffffff',
        border: '#e7e5e4',
        muted: {
          DEFAULT: '#f2f2f2',
          foreground: '#666666'
        },
        accent: {
          DEFAULT: '#fff7ed',
          foreground: '#a83d22'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
