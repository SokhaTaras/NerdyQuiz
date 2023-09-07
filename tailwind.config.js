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
        secondary: "var(--color-secondary)",
        "back-ground": "var(--color-back-ground)",
        buttons: "var(--color-button)",
        "buttons-hover": "var(--color-buttons-hover)",
        error: "var(--color-error)",
        "delete-buttons-hover": "#FFB6C1"
      },
      screens: {
        "2xs": { min: "300px" },
        xs: { max: "575px" },
        sm: { min: "576px", max: "897px" },
        md: { min: "898px", max: "1199px" },
        lg: { min: "1200px" },
        xl: { min: "1159px" },
        "2xl": { min: "1359px" }
      }
    }
  },
  plugins: []
};
