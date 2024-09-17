const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mint-green": "var(--mint-green)",
        "purple-1": "var(--purple)",
        "light-cream": "var(--light-cream)",
        primary: "var(--main-bg-color)",
        secondary: "var(--onyx)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
