import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffaf7',
          100: '#fff3ec',
          200: '#fbe6dc'
        },
        rose: {
          50: '#fdf2ee',
          100: '#f9e2da',
          200: '#f1c9bd',
          300: '#e7b0a1',
          400: '#d99986',
          500: '#c47e6a',
          600: '#a8624f',
          700: '#854a3b',
          800: '#5d3329',
          900: '#3a1f18'
        },
        gold: {
          300: '#e3c79a',
          400: '#d4b07a',
          500: '#c9a36a',
          600: '#b48b52',
          700: '#8e6a3b'
        },
        ink: {
          500: '#8a675f',
          700: '#4a2e2b',
          900: '#2b1c1b'
        }
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 14px 36px rgba(66,31,28,0.08)',
        lift: '0 24px 60px rgba(66,31,28,0.18)',
        glow: '0 18px 40px rgba(180,139,82,0.28)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      backgroundImage: {
        'rose-gradient': 'linear-gradient(135deg,#f9e2da 0%,#e7b0a1 55%,#c9a36a 100%)',
        'gold-gradient': 'linear-gradient(135deg,#d4b07a 0%,#b48b52 100%)',
        'ink-gradient': 'linear-gradient(160deg,#4a2e2b 0%,#2b1c1b 100%)'
      }
    }
  },
  plugins: []
}

export default config
