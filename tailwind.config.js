module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#FFF1E6",
      secondary: "#F8F7FF",
      "light-grey": "#F0EFEB",
      about: "#EEF5F7",
      blog: "#9AAD8B",
    }),
    stroke: (theme) => ({
      red: theme("colors.red.500"),
      green: theme("colors.green.500"),
      blue: theme("colors.blue.500"),
    }),
    extend: {
      width: {
        "1/6.5": "30.7692%",
        "3.5/5": "70%",
        "500px": "500px",
        250: "250px",
        320: "320px",
        300: "300px",
        450: "450px",
        900: "900px",
        1200: "1200px",
      },
      height: {
        600: "600px",
        500: "500px",
      },
      screens: {
        s: { max: "639" },
        sm: { max: "768px" },
        md: { max: "1023px" },
        lg: { max: "1279px" },
        xl: { max: "1535px" },
        smh: { min: "640px" },
        mdh: { min: "768px" },
        lgh: { min: "1024px" },
        xlh: { min: "1280px" },
        xl2: { min: "1536px" },
      },
    },
  },
  variants: {
    extend: {
      textColor: ["hover", "focus", "group-hover"],
      display: ["hover", "focus", "group-hover"],
      ringColor: ["hover"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
