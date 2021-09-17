module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        flip: {
          '0%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(185deg)' },
          '55%': { transform: 'rotate(175deg)' },
          '95%': { transform: 'rotate(365deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        flip: 'flip 2s ease-in-out infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
