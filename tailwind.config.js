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
        navy: {
          950: '#030712', // Deepest dark space background
          900: '#0b1329', // Card backgrounds / main panel backgrounds
          800: '#1c2541', // Hover backgrounds / secondary layouts
          700: '#3a506b', // Text description / border lines
        },
        scientific: {
          teal: '#06b6d4',      // Primary cyan/teal highlight
          tealHover: '#0891b2', // Highlight hovered states
          cyan: '#0ea5e9',      // Bright secondary cyan
          emerald: '#10b981',   // Successful verification alerts / metrics
          mint: '#14b8a6',      // Teal accent gradient
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-teal': '0 0 15px rgba(6, 182, 212, 0.15)',
        'glow-teal-strong': '0 0 25px rgba(6, 182, 212, 0.4)',
        'glow-cyan': '0 0 15px rgba(14, 165, 233, 0.15)',
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(58, 80, 107, 0.1)' stroke-width='1'/%3E%3C/svg%3E\")",
        'grid-pattern-dark': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(58, 80, 107, 0.04)' stroke-width='1'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}
