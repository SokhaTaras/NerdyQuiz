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
        buttons: "var(--color-button)",
        "buttons-hover": "var(--color-buttons-hover)",
        "error-message": "var(--color-error-message)",
        "delete-buttons-hover": "#FFB6C1"
      }
    }
  },
  plugins: []
};
