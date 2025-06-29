module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-dark': '#0b0c26',
        'cosmic-purple-dark': '#1d3557',
        'cosmic-purple-mid': '#3a0ca3',
        'cosmic-purple-light': '#7209b7',
        'cosmic-pink': '#f72585',
        'cosmic-orange': '#fca311',
        'cosmic-text-primary': '#ffffff',
        'cosmic-text-secondary': '#adb5bd',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-lg': '0 0 15px theme(colors.cosmic-pink), 0 0 30px theme(colors.cosmic-pink)',
        'glow-xl': '0 0 25px theme(colors.cosmic-pink), 0 0 50px theme(colors.cosmic-pink)',
      },
      dropShadow: {
        'glow-pink': '0 0 15px #f72585',
      },
      keyframes: {
        'background-pan': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      animation: {
        'background-pan': 'background-pan 30s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
