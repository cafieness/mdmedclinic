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
     }),
    extend: {
      width: {
        '1/6.5': '30.7692%',
        '500px': '500px'
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
