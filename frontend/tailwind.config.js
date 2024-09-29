module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        light: {
          primary: "#0e4677",
          secondary: "#FF0000",
          neutral: "#444",
          "neutral-content": "#757872",
          "base-100": "#ffffff",
        },
      },
      {
        dark: {
          neutral: "#eee",
          "neutral-content": "#b5aeae",
          "base-100": "#111",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
