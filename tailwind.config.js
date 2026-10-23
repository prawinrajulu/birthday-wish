/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#081426',
          deep: '#040B16',
          light: '#0D1E38',
          ocean: '#122847',
        },
        ocean: {
          DEFAULT: '#122847',
          deep: '#0B1C33',
          light: '#1B3B66',
        },
        blush: {
          DEFAULT: '#FFB9D5',
          light: '#FFD4E5',
          dark: '#E59AB8',
        },
        rosepink: {
          DEFAULT: '#F47FAF',
          hover: '#E25B93',
          glow: '#FF94C2',
          deep: '#C93F76',
        },
        lavender: {
          DEFAULT: '#C9B8FF',
          light: '#E4DCFF',
          dark: '#A78FFF',
        },
        champagne: {
          DEFAULT: '#F4D49A',
          glow: '#FFE8BE',
          dark: '#D9B575',
        },
        softgold: {
          DEFAULT: '#F4D49A',
          glow: '#FFE8BE',
          dark: '#D9B575',
        },
        dreamwhite: '#FFF7F8',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwriting: ['"Dancing Script"', '"Caveat"', 'cursive'],
      },
      boxShadow: {
        'glow-pink': '0 0 25px -3px rgba(244, 91, 154, 0.45), 0 0 10px -2px rgba(255, 182, 213, 0.3)',
        'glow-gold': '0 0 25px -3px rgba(255, 217, 142, 0.45), 0 0 10px -2px rgba(255, 232, 181, 0.3)',
        'glow-blue': '0 0 25px -3px rgba(22, 59, 112, 0.55), 0 0 15px -2px rgba(201, 182, 255, 0.3)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(244, 91, 154, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(255, 217, 142, 0.8))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
