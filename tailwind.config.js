/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary palette
        primary: {
          red: "#A12C3B",
          salmon: "#E76662",
          teal: "#33626F",
          blue: "#378596",
          amber: "#FEAF52",
          crimson: "#D81A22",
          cream: "#FFF5E9",
          orange: "#FA9644",
          coral: "#F37947",
          wine: "#81344C",
        },
        // Brand darker/complimentary palette
        dark: {
          black: "#08141B",
          teal: "#0F474A",
          navy: "#123C55",
          slate: "#243843",
          ocean: "#186080",
          azure: "#3196AD",
          rust: "#D45D56",
          peach: "#F49272",
          sand: "#FFC590",
          ivory: "#FDF7E4",
        }
      },
    },
  },
  plugins: [],
} 