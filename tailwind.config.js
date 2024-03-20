const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#435B5B",
        primary1: "#85764D",
        secondary: "#86764e",
        secondary1: "#c5baa6",
        secondary2: "#d4bebe",
      },
      fontFamily: {},
    },
    screens: {
      xxs: "380px",
      "2sm": "426px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      xxl: "1440px",
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
