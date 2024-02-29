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
        primary: "#691a31",
        secondary: "#86764e",
      },
      fontFamily: {
        lato: ["lato", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      xxs: "380px",
      "2sm": "426px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
