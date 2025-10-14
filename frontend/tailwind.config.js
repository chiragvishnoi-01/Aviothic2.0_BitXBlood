/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: "#E63946", // ❤️ main theme color for buttons, headings
        darkAccent: "#1D3557", // 💙 for contrast text or dark sections
      }
    },
  },
  plugins: [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
  require('@tailwindcss/aspect-ratio'),
],
}
