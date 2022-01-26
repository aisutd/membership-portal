module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          darkest: '#1f2d3d',
          dark: '#3c4858',
          DEFAULT: '#242424',
          light: '#e0e6ed',
          lightest: '#f9fafc',
        }
      },
    },
  },
  variants: {
    extend: {},
    fill: ['hover', 'focus'], // this line does the trick
  },
  plugins: [],
}
