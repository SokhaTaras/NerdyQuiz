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
        buttons: "var(--color-button)",
        "buttons-hover": "var(--color-buttons-hover)",
        error: "var(--color-error)",
        "delete-buttons-hover": "#FFB6C1"
      }
    }
  },
  plugins: []
};
