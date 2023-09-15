/** @type {import('tailwindcss').Config} */

const { createGlobPatternsForDependencies } = require("@nrwl/angular/tailwind");
const { join } = require("path");

module.exports = {
  content: [
    join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    "background-image": {
      "gradient-to-bottom": "var(--background-image)"
    },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        buttons: "var(--color-button)",
        "buttons-hover": "var(--color-buttons-hover)",
        error: "var(--color-error)",
        "delete-buttons-hover": "#FFB6C1"
      },
      screens: {
        "2xs": { min: "300px", max: "574px" },
        xs: { max: "575px" },
        sm: { min: "576px", max: "897px" },
        md: { min: "898px", max: "1199px" },
        lg: { min: "1200px", max: "1158px" },
        xl: { min: "1159px" },
        "2xl": { min: "1359px" }
      }
    }
  },
  plugins: []
};
