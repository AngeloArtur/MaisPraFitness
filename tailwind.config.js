const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: "Poppins",
            },
            colors: {
                "primary-color": "##021024",
                secondary: "#052659",
                "tint-blue1": "#5483B3",
                "tint-blue2": "#7DA0C4",
                "tint-blue3": "#C1E8FF",
                "tint-blue4": "#E3F2FD",
                white: "#F0F4F5",
                "white-100": "#FFFFFF",
                black: "#000000",
                error: "#D32F2F",
                danger: "#F03000",
                success: "#25842d",
            },
        },
    },
    plugins: [
        plugin(function ({ addBase, theme }) {
            addBase({
                h1: {
                    "@apply text-xl": {},
                    "@screen md": {
                        fontSize: theme("fontSize.3xl"),
                    },
                },
                h2: {
                    "@apply text-xl": {},
                    "@screen md": {
                        fontSize: theme("fontSize.2xl"),
                    },
                },
                h4: {
                    "@apply text-base": {},
                    "@screen md": {
                        fontSize: theme("fontSize.lg"),
                    },
                },
            });
        }),
    ],
};
