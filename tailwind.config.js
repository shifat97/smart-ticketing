/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {
      padding: {
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        30: '30px'
      }
    },
    fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
      inter: ['Inter', 'sans - serif']
    },
    fontSize: {
      16: '1rem',
      18: '1.125rem',
      20: '1.25rem',
      24: '1.5rem',
      36: '2.25rem',
      32: '2rem',
      40: '2.5rem',
      64: '4rem',
    },
    colors: {
      black: '#030712',
      gray: 'rgba(3, 7, 18, 0.70)',
      lightgray: 'rgba(3, 7, 18, 0.50)',
      white: '#FFF',
      green: '#1DD100',
    },
    backgroundColor: {
      white: 'FFF',
      lightgreen: 'rgba(29, 209, 0, 0.10)',
      green: '#1DD100',
      yellow: '#FFBF0F',
      red: '#F78C9C',
      gray: '#F7F8F8',
      darkgray: 'rgba(3, 7, 18, 0.05)',
      black: '#030712'
    },
    borderRadius: {
      8: '8px',
      12: '12px',
      16: '16px',
      24: '24px',
      32: '32px',
      88: '88px'
    },
    borderColor: {
      green: '3px solid var(--primary-700, #1DD100)',
      lightgreen: '1px solid rgba(29, 209, 0, 0.40)'
    },
  },
  plugins: [],
}

