const twColors = require('./tw-colors')
const alwaysColor = require('tailwindcss/colors')
const { addDynamicIconSelectors } = require('@iconify/tailwind')

const deprecatedColorKeyMap = {
  lightBlue: 'sky',
  warmGray: 'stone',
  trueGray: 'neutral',
  coolGray: 'gray',
  blueGray: 'slate',
}
for (const key in deprecatedColorKeyMap) {
  Reflect.deleteProperty(alwaysColor, key)
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.tsx'],
  darkMode: ['class', 'html.dark'],
  theme: {
    colors: twColors,

    extend: {
      colors: {
        always: alwaysColor,
        accent: 'var(--theme-color)',
        hover: 'var(--theme-hover-color)',
        deep: 'var(--theme-active-color)',
      },
      fontFamily: {
        mono: `Roboto Mono,Monaco,monospace`,
      },
      screens: {
        'light-mode': { raw: '(prefers-color-scheme: light)' },
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
        phone: { raw: '(max-width: 768px)' },
        desktop: { raw: '(min-width: 1024px)' },
        tablet: { raw: '(max-width: 1023px)' },
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
}
