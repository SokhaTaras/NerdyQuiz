/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      primaryBackground: "#e6e6ff",
      popUpBackground: "",
      buttons: "#E5E7EB",
      buttonsHover: "#D1D5DB",
      errorMessage: "#D10000"
    },
    cursor: {
      "not-allowed": "not-allowed"
    },
    backgroundImage: {
      "gradient-to-bottom": "linear-gradient(to bottom, #c7c7ff, #b3b3ff)"
    },
    extend: {}
  },
  plugins: []
};
