/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            transitionProperty: {
                hover: "all",
            },
            transitionDuration: {
                200: "200ms",
            },
            fontFamily: {
                mondwest: ["Mondwest", "sans-serif"],
                hack: ["Hack", "sans-serif"],
            },
        },
    },
    plugins: [],
};
