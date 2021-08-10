module.exports = {
  //mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#FFF1E6',
      'secondary': '#F8F7FF',
      'light-grey': '#F0EFEB',
      'about': '#EEF5F7',
      'blog':'#9AAD8B'
     }),
     stroke: theme => ({
      'red': theme('colors.red.500'),
      'green': theme('colors.green.500'),
      'blue': theme('colors.blue.500'),
    }),
    extend: {
      width: {
        '1/6.5': '30.7692%',
        '3.5/5': '70%',
        '500px': '500px',
        '320':'320px',
        '300': '300px',
        '450': '450px',
        '1000':'1000px',
      },
      height: {
        '600': '600px',
        '500':'500px'
      },
      screens: {
        's':{ 'max': '639'},
        'sm': { 'max': '768px'},
        'md': {'max': '1023px'},
        'lg': { 'max': '1279px'},
        'xl': { 'max': '1535px'},
        '2xl': {'min': '1536px'},
      },
    },
  },
  variants: {
    extend: {
      display: ['hover', 'focus', 'group-hover'],
    },
  },
  plugins: [],
}
