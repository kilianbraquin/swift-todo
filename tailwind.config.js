const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      current: "currentColor",
      white: "white",
      primary: {
        50: "#F5FEFF",
        100: "#E6FDFE",
        200: "#B5F5F8",
        300: "#93EDF0",
        400: "#5BD8DC",
        500: "#2FCAD0",
        600: "#28A0A4",
        700: "#14868A",
        800: "#096467",
        900: "#023E41",
      },
      neutral: {
        50: "#F6F7F9",
        100: "#DEE1E8",
        200: "#C9CFD9",
        300: "#B4BCCA",
        400: "#929DB0",
        500: "#78849B",
        600: "#636E83",
        700: "#535B6A",
        800: "#3A404A",
        900: "#24272D",
      },
      danger: colors.red,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
      },
      screens: {
        sm: "100%",
        md: "768px",
      },
    },
    fontFamily: {
      title: ["var(--font-nunito)"].concat(defaultTheme.fontFamily.sans),
      body: ["var(--font-inter)"].concat(defaultTheme.fontFamily.sans),
    },
  },
  plugins: [],
};
