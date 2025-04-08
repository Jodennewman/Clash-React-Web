/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // We'll use CSS variables from @theme directive instead of colors here
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-medium': 'float-medium 5s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'float-gentle': 'float-gentle 9s ease-in-out infinite',
        'ripple': 'ripple 0.5s ease-out forwards',
        'float': 'float-pattern 20s linear infinite',

        'spin-slow': 'spin 12s linear infinite',
        'marquee': 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',

      },
      keyframes: {
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '33%': { transform: 'translate3d(5px, -7px, 0) rotate(1deg)' },
          '66%': { transform: 'translate3d(-3px, -4px, 0) rotate(-1deg)' }
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' },

        },
        'float-pattern': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(-10px)' },
          '50%': { transform: 'translateX(20px) translateY(0)' },
          '75%': { transform: 'translateX(10px) translateY(10px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'marquee-vertical': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' }
        },
      },
      transitionTimingFunction: {
        'bounce-vs': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    },
  },
  experimental: {
    variantGrouping: false,
  },
  plugins: [
    // Add custom utilities for HDR support
    function({ addBase, addUtilities }) {
      // Add base HDR detection
      addBase({
        '@supports (color: oklch(0% 0 0))': {
          ':root': {
            '--supports-oklch': '1',
          }
        },
        '@media (dynamic-range: high)': {
          ':root': {
            '--supports-hdr': '1',
            '--hdr-boost': '1.2',
          }
        }
      });
      
      // Add HDR-specific utilities
      addUtilities({
        '.hdr-text-shadow': {
          '@media (dynamic-range: high)': {
            textShadow: '0 0 5px currentColor',
          }
        },
        '.hdr-enhance': {
          '@media (dynamic-range: high)': {
            filter: 'contrast(1.1) brightness(1.1)',
          }
        },
        '.hdr-accent-border': {
          '@media (dynamic-range: high)': {
            borderColor: 'oklch(85% 0.2 var(--hdr-hue, 65))',
          }
        }
      });
    },
    require('tailwindcss-animate')
  ],
}