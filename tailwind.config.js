/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-bg)',
        'ink-soft': 'var(--color-bg-soft)',
        surface: 'var(--color-surface)',
        purple: {
          DEFAULT: 'var(--color-purple)',
          deep: 'var(--color-purple-deep)',
          light: 'var(--color-lilac)'
        },
        text: 'var(--color-text)',
        muted: 'var(--color-muted)'
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
}
