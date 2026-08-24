import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        script: ['var(--font-pinyon)', 'cursive'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        warm: '0 4px 24px rgba(44,31,23,0.08)',
        lift: '0 8px 40px rgba(44,31,23,0.14)',
        heavy: '0 16px 60px rgba(44,31,23,0.20)',
        gold: '0 4px 24px rgba(201,169,107,0.25)',
      },
      screens: {
        xs: '390px',
      },
    },
  },
  plugins: [],
}

export default config
