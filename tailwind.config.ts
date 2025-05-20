import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray: {
          100: '#F2F2F2',
          300: '#E4E4E4',
          600: '#6E6E6E',
          700: '#434A54',
          800: '#2E3339',
        },
        iris: {
          100: '#5D5FEF',
          80: '#7879F1',
        },
        green: {
          50: '#14B9D5',
          100: '#1BBC9B',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
} satisfies Config;
