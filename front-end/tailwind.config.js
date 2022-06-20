module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '600px',
      md: '1024px',
      lg: '1440px',
    },
    extend: {
      colors: {
        primary: '#00D7D7',
        active: '#76FCB3',
        terminated: '#FF007A',
        suspended: '#FFE500',
      },
      backgroundColor: {
        'app-background': '#221334'
      },
      backgroundImage: {
        'card-bg': 'url(../public/assets/card_bg.png)',
      },
      fontFamily: {
        primary: ['Ubuntu', 'sans-serif']
      }
    },
  },
  plugins: [],
}
