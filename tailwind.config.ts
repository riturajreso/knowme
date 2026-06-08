import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Hand-drawn design system colors
        paper: {
          50: '#fdfbf7',
          100: '#faf8f3',
          200: '#f5f1e8',
          300: '#e5e0d8',
          400: '#d0ccc1',
        },
        pencil: {
          DEFAULT: '#2d2d2d',
          light: '#5a5a5a',
          lighter: 'rgba(45, 45, 45, 0.4)',
        },
        marker: {
          red: '#ff4d4d',
          blue: '#2d5da1',
        },
      },
      fontFamily: {
        kalam: ['Kalam', 'cursive'],
        patrick: ['Patrick Hand', 'cursive'],
      },
      boxShadow: {
        hard: '4px 4px 0px 0px #2d2d2d',
        'hard-lg': '8px 8px 0px 0px #2d2d2d',
        'hard-sm': '2px 2px 0px 0px #2d2d2d',
        'hard-xl': '12px 12px 0px 0px #2d2d2d',
        subtle: '3px 3px 0px 0px rgba(45, 45, 45, 0.1)',
      },
      backgroundImage: {
        'paper-grain': 'radial-gradient(#e5e0d8 1px, transparent 1px)',
      },
      backgroundSize: {
        'paper': '24px 24px',
      }
    }
  },
  plugins: [typography]
}

export default config
