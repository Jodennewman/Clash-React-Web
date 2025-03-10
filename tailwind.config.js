/** @type {import('tailwindcss').Config} */
import tailwindcss from "@tailwindcss/vite";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary palette in OKLCH
        primary: {
          red: "oklch(47% 0.18 25)", // #A12C3B
          salmon: "oklch(67% 0.19 20)", // #E76662
          teal: "oklch(43% 0.065 205)", // #33626F
          blue: "oklch(51% 0.09 205)", // #378596
          amber: "oklch(82% 0.15 65)", // #FEAF52
          crimson: "oklch(52% 0.27 20)", // #D81A22
          cream: "oklch(97% 0.03 90)", // #FFF5E9
          orange: "oklch(74% 0.19 50)", // #FA9644
          coral: "oklch(67% 0.18 40)", // #F37947
          wine: "oklch(38% 0.13 0)", // #81344C
        },
        // Brand darker/complimentary palette
        dark: {
          black: "oklch(10% 0.02 240)", // #08141B
          teal: "oklch(30% 0.07 195)", // #0F474A
          navy: "oklch(26% 0.06 230)", // #123C55
          slate: "oklch(27% 0.025 240)", // #243843
          ocean: "oklch(39% 0.09 225)", // #186080
          azure: "oklch(58% 0.11 205)", // #3196AD
          rust: "oklch(58% 0.18 25)", // #D45D56
          peach: "oklch(72% 0.16 40)", // #F49272
          sand: "oklch(84% 0.12 70)", // #FFC590
          ivory: "oklch(97% 0.04 110)", // #FDF7E4
        },
        // Extended color variations
        light: {
          100: "oklch(97% 0.03 90)", // #FFF5E9
          200: "oklch(94% 0.04 80)", // #FDEBDD
          300: "oklch(97% 0.04 110)", // #FDF7E4
        },
        coral: {
          400: "oklch(72% 0.19 35)", // #FF9E7D
          500: "oklch(67% 0.18 40)", // #F37947
          600: "oklch(62% 0.21 35)", // #E85F2D
        },
        // HDR enhanced versions for XDR display
        hdr: {
          // Higher lightness and chroma for HDR versions
          highlight: "oklch(105% 0.01 90)", // Super bright white
          amber: "oklch(88% 0.19 65)", // Brighter amber
          crimson: "oklch(58% 0.32 20)", // More vibrant crimson
          coral: "oklch(74% 0.25 40)", // More vibrant coral
          teal: "oklch(50% 0.11 205)", // More vibrant teal
          blue: "oklch(58% 0.14 205)", // More vibrant blue
        }
      },
      // HDR specific styles and animations
      backdropFilter: {
        'hdr': 'contrast(1.1) saturate(1.2)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'hdrGlow': 'hdrGlow 3s infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        hdrGlow: {
          '0%': { 
            filter: 'brightness(1.0)',
            boxShadow: '0 0 10px oklch(95% 0.1 90 / 0.5)'
          },
          '100%': { 
            filter: 'brightness(1.15)',
            boxShadow: '0 0 20px oklch(100% 0.15 90 / 0.7)'
          }
        },
      },
    },
  },
  plugins: [
    tailwindcss(),
    // Custom plugin for HDR support
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
        // Utility for subtle HDR highlights in UI elements
        '.hdr-accent-border': {
          '@media (dynamic-range: high)': {
            borderColor: 'oklch(85% 0.2 var(--hdr-hue, 65))',
          }
        }
      });
    }
  ],
}