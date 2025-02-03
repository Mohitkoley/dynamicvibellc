import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #001c32, #00060a, #001c32)',
        'custom-gradient-2': 'linear-gradient(to right, #130F40,#000000, #130F40)',
        'premium-gradient': 'linear-gradient(135deg, rgba(37, 38, 43, 0.7) 0%, rgba(37, 38, 43, 0.9) 100%)',
      },
      fontFamily: {
        'lobster': ['Lobster', 'sans-serif'],
        },
        animation: {
          'fade-in-down': 'fadeInDown 1s ease-out',
          'fade-in': 'fadeIn 1s ease-out',
          'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          fadeInDown: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          pulse: {
            '0%, 100%': {
              opacity: '1',
            },
            '50%': {
              opacity: '0.5',
            },
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
      },
    },
  }
