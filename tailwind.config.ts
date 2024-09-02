import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        odteal: {
          white: "#e5f8ff",
          light: "#00b6ff",
        },
        odblue: {
          white: "#fafbff", // 99%
          lightest: "#f0f3ff", // 97%
          lighter: "#ccd6ff", // 90%
          light: "#8099ff", // 75%
          mid: "#2c55ff",
          dark: "#0029cc", // 40%
          black: "#000a33", // 10%
          gray: "#f9fafa", // 98%, 9% sat
        },
        odpurple: {
          white: "#fcfaff", // 99%
          lightest: "#f7f1fe", // 97%
          lighter: "#e3cffc", // 90%
          light: "#ba87f8", // 75%
          old: "#ae73f7", // 71%
          mid: "#903ef4", // 60%
          dark: "#690dd9", // 45%
          black: "#170330", // 10%,
        },
        odpink: {
          background: "#f9f6f9", // 99%
          white: "#fffafe", // 99%
          lightest: "#fff0fd", // 97%
          lighter: "#ffe6fc", // 95%
          light: "#ffccf5", // 90%
          mid: "#Fe1ce6",
          dark: "#e401ce", // 45%
          darker: "#980189", // 30%
          black: "#33002e", // 10%,
          gray: "#faf9fa", // 98%, 9% sat
          mute: "#c75abc",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
