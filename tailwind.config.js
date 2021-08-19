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
       backgroundColor: theme => ({
         'active' :'rgba(242, 242, 242, 1)',
         'overlay' : 'rgba(0, 0, 0, 0.5)'
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
