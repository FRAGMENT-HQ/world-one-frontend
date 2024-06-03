/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#fcf9f8",
        midnightblue: "#15103f",
        darkorange: {
          100: "rgba(255, 146, 53, 0.2)",
          200: "rgba(255, 146, 53, 0.15)",
        },
        darkslateblue: {
          100: "rgba(39, 53, 126, 0.5)",
          200: "rgba(60, 73, 139, 0.2)",
          300: "rgba(39, 53, 126, 0.4)",
          400: "rgba(60, 73, 139, 0.3)",
          500: "rgba(55, 70, 143, 0.4)",
          600: "rgba(55, 70, 143, 0.3)",
          900: "rgba(55, 70, 143, 1)",
          700: "#3c498b",
          800: "#4d5ca3",
          1000: "rgba(77, 92, 163, 0.09)",
        },
        white: "#fff",
        steelblue: {
          100: "rgba(37, 116, 180, 0.5)",
          200: "rgba(39, 117, 184, 0.4)",
        },
        gainsboro: {
          100: "#e6e6e6",
          200: "#e3e0de",
        },
        text0: "#141414",
        text5: "#e4e4e4",
        text1: "#333",
        accent: "#cfeeff",
        text2: "#4f4f4f",
        text3: "#828282",
        secondary: "#27357e",
        black: "#000",
        lightblue: "rgba(207, 238, 255, 0.2)",
        gray: {
          100: "rgba(255, 255, 255, 0.2)",
          200: "rgba(255, 255, 255, 0.1)",
        },
        error: "#ff3f2c",
        success: "#38b000",
        informative: "#4482f7",
        primary: "#ff9235",
        chocolate: {
          100: "#cc5e03",
          200: "rgba(204, 94, 3, 0.09)",
        },
      },
      spacing: {},
      fontFamily: {
        lato: "Lato",
        "body-small": "'Avenir Next LT Pro'",
      },
      borderRadius: {
        "13xl": "32px",
        lg: "18px",
      },
    },
    fontSize: {
      xl: "1.25rem",
      "2xl": "1.30rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      "5xl": "1.5rem",
      lgi: "1.188rem",
      "13xl": "2rem",
      "7xl": "1.625rem",
      "9xl": "1.75rem",
      "3xl": "1.375rem",
      "29xl": "3rem",
      "19xl": "2.375rem",
      "10xl": "1.813rem",
      lg: "1.125rem",
      inherit: "inherit",
    },
    screens: {
      mq1575: {
        raw: "screen and (max-width: 1575px)",
      },
      mq1275: {
        raw: "screen and (max-width: 1275px)",
      },
      mq825: {
        raw: "screen and (max-width: 825px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },

      xs: "400px",

      sm: "640px",

      tablet: "720px",

      laptop: "1024px",

      desktop: "1280px",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
