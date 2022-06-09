import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

import { colors } from './configs.json'

export default defineConfig({
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.tsx'],
  darkMode: 'class',

  theme: {
    extend: {
      screens: {
        'light-mode': { raw: '(prefers-color-scheme: light)' },
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
        phone: { raw: '(max-width: 768px)' },
        desktop: { raw: '(min-width: 1024px)' },
        tablet: { raw: '(max-width: 1023px)' },
      },

      colors: {
        primary: {
          default: '#18A058FF',
          deep: '#0C7A43FF',
          shallow: '#36AD6AFF',
        },
        gray$: {
          default: '#ddd',
        },
        ...colors,
      },
    },
  },

  plugins: [],
})
