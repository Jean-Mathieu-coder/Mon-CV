/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        encre: {
          DEFAULT: "#23262D", // Softer, more modern warm dark slate instead of harsh pitch black
          light: "#2D313A",
          deep: "#1C1E24",
          card: "#2A2E37"
        },
        corail: {
          DEFAULT: "#E8634A",
          hover: "#D6533A",
          light: "#FDF2EF",
          glow: "rgba(232, 99, 74, 0.25)"
        },
        neige: "#FAFAFA",
        graphite: "#2D2D2D",
        charcoal: "#23262D",
        sand: "#F4F3EF"
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      boxShadow: {
        'subtle': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
        'elevated': '0 30px 60px -20px rgba(0, 0, 0, 0.10)',
        'coral-glow': '0 10px 30px -5px rgba(232, 99, 74, 0.35)',
      }
    },
  },
  plugins: [],
}
