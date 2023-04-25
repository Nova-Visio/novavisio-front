const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const colors = require('material-colors/dist/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
        'print': { 'raw': 'print' },
        'tablet': '600px',
        'desktop': '960px'
    },
    colors: {
      ...colors,
      primary: 'var(--primary)',
      'primary-highlight': 'var(--primary-highlight)',
      'primary-contrast': 'var(--primary-contrast)',
      'primary-50': 'var(--primary-50)',
      'primary-100': 'var(--primary-100)',
      'primary-200': 'var(--primary-200)',
      'primary-300': 'var(--primary-300)',
      'primary-400': 'var(--primary-400)',
      'primary-500': 'var(--primary-500)',
      'primary-600': 'var(--primary-600)',
      'primary-700': 'var(--primary-700)',
      'primary-800': 'var(--primary-800)',
      'primary-900': 'var(--primary-900)',
      'primary-a100': 'var(--primary-a100)',
      'primary-a200': 'var(--primary-a200)',
      'primary-a400': 'var(--primary-a400)',
      'primary-a700': 'var(--primary-a700)',
      accent: 'var(--accent)',
      'accent-highlight': 'var(--accent-highlight)',
      'accent-contrast': 'var(--accent-contrast)',
      'accent-50': 'var(--accent-50)',
      'accent-100': 'var(--accent-100)',
      'accent-200': 'var(--accent-200)',
      'accent-300': 'var(--accent-300)',
      'accent-400': 'var(--accent-400)',
      'accent-500': 'var(--accent-500)',
      'accent-600': 'var(--accent-600)',
      'accent-700': 'var(--accent-700)',
      'accent-800': 'var(--accent-800)',
      'accent-900': 'var(--accent-900)',
      'accent-a100': 'var(--accent-a100)',
      'accent-a200': 'var(--accent-a200)',
      'accent-a400': 'var(--accent-a400)',
      'accent-a700': 'var(--accent-a700)',
      warn: 'var(--warn)',
      'warn-highlight': 'var(--warn-highlight)',
      'warn-50': 'var(--warn-50)',
      'warn-100': 'var(--warn-100)',
      'warn-200': 'var(--warn-200)',
      'warn-300': 'var(--warn-300)',
      'warn-400': 'var(--warn-400)',
      'warn-500': 'var(--warn-500)',
      'warn-600': 'var(--warn-600)',
      'warn-700': 'var(--warn-700)',
      'warn-800': 'var(--warn-800)',
      'warn-900': 'var(--warn-900)',
      'warn-a100': 'var(--warn-a100)',
      'warn-a200': 'var(--warn-a200)',
      'warn-a400': 'var(--warn-a400)',
      'warn-a700': 'var(--warn-a700)',
      toolbar: 'var(--toolbar)',
      'toolbar-contrast': 'var(--toolbar-contrast)',
      default: 'var(--default)',
      light: 'var(--light)',
      transparent: 'transparent',
      current: 'currentColor'
    },
    extends: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%',
        '11/12': '91.66%'
      },
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        'screen-3/4': '75vh'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // plugin(function({ matchUtilities, theme }) {
    //   matchUtilities(
    //     {
    //       fontFamily: (value) => ({
    //         fontFamily: value
    //       }),
    //     },
    //     { values: theme('fontFamily') }
    //   )
    // })
  ],
};
