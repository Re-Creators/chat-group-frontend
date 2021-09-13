module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        '44': '11rem',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
       },
       height: {
        '7/10' : '70%'
       },
       borderColor: {
        'primary' : 'rgb(130, 130, 130)'
       },
      textColor: {
        'primary' : 'rgb(130, 130, 130)'
      },
      gridTemplateColumns: {
        'message' : 'repeat(3, minmax(50px, auto))'
      },
       backgroundColor: theme => ({
         'active' :'rgba(242, 242, 242, 1)',
         'primary' : 'rgb(37, 35, 41)',
         'secondary' : 'rgb(18, 15, 19)',
         'input' : 'rgb(60, 57, 63)',
         'overlay' : 'rgba(27, 25, 30, .5)',
         'profile' : 'rgb(11, 9, 12)',
         'hover-profile' : 'rgb(60, 57, 63)'
       })
    }
  },
  variants: {
    extend: {
      backgroundColor : ['active'],
      borderWidth : ['focus']
    },
  },
  plugins: [],
}
