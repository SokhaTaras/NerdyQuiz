/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    "background-image": {
      "gradient-to-bottom": "var(--background-image)"
    },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "back-ground": "var(--color-back-ground)",
        buttons: "var(--color-button)",
        "buttons-hover": "var(--color-buttons-hover)",
        error: "var(--color-error)",
        "delete-buttons-hover": "#FFB6C1"
      }
    }
  },
  plugins: []
};
