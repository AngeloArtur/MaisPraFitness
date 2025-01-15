/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
          fontFamily: {
            poppins: "Poppins"
          },
          colors: {
            primary: "##021024",
            secondary: "#052659",
            "tint-blue1": "#5483B3",
            "tint-blue2": "#7DA0C4",
            "tint-blue3": "#C1E8FF",
            white: "#F0F4F5",
            error: "#D32F2F"
          }
        },
    },
    plugins: [],
};
