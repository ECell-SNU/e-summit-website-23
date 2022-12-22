/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: { max: "768px" },
        laptop: { min: "768px" },
      },
    },
  },
  plugins: [],
};
