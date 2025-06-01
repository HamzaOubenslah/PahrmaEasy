// tailwind.config.js
export default {
  content: [`./{html, js}`],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
    screens: {
      initial: "0px",
      sm: "320px",
      md: "768px",
      lg: "1440px",
    },
  },
  plugins: [],
};
