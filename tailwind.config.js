/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fintech: {
          dark: '#080B11',
          card: '#0E131F',
          cardHover: '#131A2B',
          cardBorder: '#1E2638',
          borderSubtle: '#182030',
          bull: '#10B981',
          bullBg: 'rgba(16, 185, 129, 0.08)',
          bullBorder: 'rgba(16, 185, 129, 0.25)',
          bear: '#F43F5E',
          bearBg: 'rgba(244, 63, 94, 0.08)',
          bearBorder: 'rgba(244, 63, 94, 0.25)',
          accent: '#3B82F6',
          cyan: '#06B6D4',
          muted: '#94A3B8',
          textBright: '#F8FAFC',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace', 'ui-monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-bull': '0 0 25px -5px rgba(16, 185, 129, 0.15)',
        'glow-bear': '0 0 25px -5px rgba(244, 63, 94, 0.15)',
        'glow-accent': '0 0 25px -5px rgba(59, 130, 246, 0.2)',
        'glow-cyan': '0 0 20px -4px rgba(6, 182, 212, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
