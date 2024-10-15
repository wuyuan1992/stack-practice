const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: 'calc(var(--app-border-radius) + 2px)',
        default: 'var(--app-border-radius)',
        md: 'calc(var(--app-border-radius) - 2px)',
        sm: 'calc(var(--app-border-radius) - 4px)',
      },
      colors: {
        background: 'var(--app-color-bg-base)',
        foreground: 'var(--app-color-text-base)',
      },
    },
  },
};
