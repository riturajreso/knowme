import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: '#020817',
        terminalSurface: '#081222',
        terminalAccent: '#8be9fd',
        terminalBorder: '#22334d'
      },
      boxShadow: {
        terminal: '0 0 0 1px rgba(56,189,248,0.12), 0 25px 70px rgba(0,0,0,0.45)'
      }
    }
  },
  plugins: [typography]
}

export default config
