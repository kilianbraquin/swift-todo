import { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  content: ["index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      current: "currentColor",
      white: "white",
      primary: "#98D4F3",
      "primary-dark": "#157CB0",
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
      title: ["Nunito", ...defaultTheme.fontFamily.sans],
      body: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      width: {
        header: "calc(100vw - 32px)",
      },
    },
  },
} satisfies Config;
