export default {
  content: ["./index.html", "./views/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0e4677",
        secondary: "#F03449",
        neutral: "#333",
        "neutral-content": "#777",
        "base-100": "#fff",
      },
    },
  },
  plugins: [require("daisyui")],
};
