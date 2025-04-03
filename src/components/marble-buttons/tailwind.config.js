/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 20s linear infinite",
        ripple: "ripple 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(10px) translateY(-10px)" },
          "50%": { transform: "translateX(20px) translateY(0)" },
          "75%": { transform: "translateX(10px) translateY(10px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(500)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
