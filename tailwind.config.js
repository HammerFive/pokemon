/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pokemon: {
          red: '#FF0000',
          black: '#212121',
          white: '#FFFFFF',
          yellow: '#FFDE00',
          blue: '#3B4CCA',
          grass: '#78C850',
          fire: '#F08030',
          water: '#6890F0',
          bug: '#A8B820',
          normal: '#A8A878',
          poison: '#A040A0',
          electric: '#F8D030',
          ground: '#E0C068',
          fairy: '#EE99AC',
          fighting: '#C03028',
          psychic: '#F85888',
          rock: '#B8A038',
          ghost: '#705898',
          ice: '#98D8D8',
          dragon: '#7038F8',
          dark: '#705848',
          steel: '#B8B8D0',
          flying: '#A890F0'
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}