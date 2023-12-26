/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
        themes: [
          // {
          //   mytheme: {
          //     "primary": "#919ce0",
          //     "secondary": "#2e8fa5",
          //     "accent": "#6150fc",
          //     "neutral": "#201a23",
          //     "base-100": "#393163",
          //     "info": "#8295f8",
          //     "success": "#14a98e",
          //     "warning": "#ad6b10",
          //     "error": "#fb285d",
          //   },
      // },
          "forest"
    ],
   
    },
};

