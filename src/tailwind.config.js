// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",  // <- assure-toi que JSX est bien inclus ici
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  