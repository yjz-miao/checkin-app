/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pinky: {
          50: '#FFF5F5',
          100: '#FFE3E3',
          200: '#FFC0CB',
          300: '#FFB6C1',
          400: '#FF91A4',
          500: '#FF6B81',
        },
        mint: {
          100: '#E0F7FA',
          200: '#B2EBF2',
          300: '#80DEEA',
        },
        cream: {
          100: '#FFFDE7',
          200: '#FFF9C4',
          300: '#FFF176',
        },
        lavender: {
          100: '#F3E5F5',
          200: '#E1BEE7',
          300: '#CE93D8',
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        cute: ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
      },
      boxShadow: {
        'cute': '0 4px 20px rgba(255, 182, 193, 0.25)',
        'cute-lg': '0 8px 30px rgba(255, 182, 193, 0.3)',
      }
    }
  },
  plugins: []
}
