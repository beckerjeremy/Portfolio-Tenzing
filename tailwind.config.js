module.exports = {
    theme: {
      colors: {
        blue: '#1089BC',
        green: '#00BC24',
        pink: '#B500BC',
        lightPink: '#FDD6FF',
      },
      fontFamily: {
        title: ['Lao', 'sans-serif'],
        text: ['Khmer', 'sans-serif'],
      },
      extend: {
        gridTemplateRows: {
          'portfolio': '200px 1fr',
        },
        gridTemplateColumns: {
          'studio': '1fr 1fr',
          'about': '350px 1fr',
        },
        lineHeight: {
          'portfolio': '200px',
        }
      }
    },
  }