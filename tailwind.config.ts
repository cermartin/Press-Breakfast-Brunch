import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'press-dark': '#1A1A1A',
        'press-red': '#D32F2F',
        'press-blue': '#90CAF9',
        'warm-latte': '#EAE0D5',
        'warm-oatmeal': '#F9F9F7',
        'sage-green': '#5F7161',
        'charcoal': '#1C1C1C',
        'terracotta': '#C1440E',
        'sage-light': '#E8F0E9',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
