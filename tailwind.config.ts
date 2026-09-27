import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#090909',
          soft: '#0e0e0d',
          raise: '#141412',
        },
        bone: {
          DEFAULT: '#f4f1ea',
          dim: '#c9c5ba',
        },
        fog: {
          DEFAULT: '#8f8a7e',
          bright: '#a8a396',
          faint: '#57544c',
        },
        acid: {
          DEFAULT: '#c7ff35',
          dim: '#9dcc2b',
        },
        hairline: 'rgba(244, 241, 234, 0.08)',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'Space Grotesk', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'mega': ['clamp(2.9rem, 8.2vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display': ['clamp(1.9rem, 3.6vw, 3.1rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        card: '18px',
      },
      boxShadow: {
        lift: '0 24px 60px -24px rgba(0, 0, 0, 0.85)',
        panel: '0 1px 0 0 rgba(244,241,234,0.04) inset',
      },
      animation: {
        'spin-slow': 'spin 26s linear infinite',
        'spin-slower': 'spin 60s linear infinite',
        marquee: 'marquee 42s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
