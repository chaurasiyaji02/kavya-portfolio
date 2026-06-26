/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(20, 184, 166, 0.18)',
        glass: '0 24px 60px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        mesh:
          'linear-gradient(135deg, rgba(20,184,166,0.16), transparent 28%), linear-gradient(225deg, rgba(99,102,241,0.18), transparent 32%), linear-gradient(315deg, rgba(244,114,182,0.13), transparent 30%)',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%, 100% 50%, 50% 100%' },
          '50%': { backgroundPosition: '100% 50%, 0% 50%, 50% 0%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        aurora: 'aurora 18s ease-in-out infinite',
        shimmer: 'shimmer 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
