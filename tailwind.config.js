/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg_clr': '#e2e8ff',
        'text_clr': '#022f5b',
        'primary_blue': '#1148F7',
        'border_clr': '#d4d9f8',
        'marin_clr': '#0D1735',
        'secondary_blue': '#0087FE'
      },
    },
  },
  plugins: [],
}

