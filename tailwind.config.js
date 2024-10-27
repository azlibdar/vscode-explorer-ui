/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
        italic: ["Inter Italic", "sans-serif"],
      },
      colors: {
        vsdark: {
          1: "#000000",
          2: "#0f0f0f",
          3: "#212121",
          4: "#808080",
          5: "#a1a1a1",
          6: "#e1e1e1",
          7: "#f5f5f5",
        },
      },
      fontSize: {
        xxs: "0.7rem",
      },
    },
  },
  plugins: [],
};
