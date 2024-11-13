/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        wine: "#b91c1c",

        yellow: "#facc15",
        lightGreen: "#15803d",
        lightBlue: "#6366f1",
        darkYellow: "",
        beige: "#fecaca",
        indigo: "#4338ca",
      },
    },
  },
  plugins: [],
};
