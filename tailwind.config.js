/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      primary: "#e6e6ff",
      buttons: "#E5E7EB",
      "buttons-hover": "#D1D5DB",
      "error-message": "#D10000"
    },
    "background-image": {
      "gradient-to-bottom": "linear-gradient(to bottom, #c7c7ff, #b3b3ff)"
    },
    extend: {}
  },
  plugins: []
};
