/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      buttons: "var(--color-button)",
      "buttons-hover": "var(--color-buttons-hover)",
      "error-message": "var(--color-error-message)"
    },
    "background-image": {
      "gradient-to-bottom": "var(--background-image)"
    },
    extend: {}
  },
  plugins: []
};
