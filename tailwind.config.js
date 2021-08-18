module.exports = {
  purge: [],
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
       backgroundColor: theme => ({
         'active' :'rgba(242, 242, 242, 1)'
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
