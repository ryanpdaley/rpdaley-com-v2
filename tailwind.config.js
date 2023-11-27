/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      nunito: ["var(--font-nunito)"],
      oswald: ["var(--font-oswald)"],
      lato: ["var(--font-lato)"],
    },
    extend: {},
  },
  plugins: [],
};
