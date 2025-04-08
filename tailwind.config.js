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
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'ripple': 'ripple 0.5s ease-out forwards',
        'float': 'float-pattern 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tw-rotate, 0))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--tw-rotate, 0))' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(500)', opacity: '0' },
        },
        'float-pattern': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(-10px)' },
          '50%': { transform: 'translateX(20px) translateY(0)' },
          '75%': { transform: 'translateX(10px) translateY(10px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
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