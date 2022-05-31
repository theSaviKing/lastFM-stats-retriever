const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./**/*.{html,pug}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Spline Sans', ...defaultTheme.fontFamily.sans]
            }
        },
    },
    plugins: [
        require('daisyui')
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#FF715B",
                    "secondary": "#DFA06E",
                    "accent": "#86BA90",
                    "neutral": "#f2f2f2",
                    "base-100": "#141414",
                    "base-200": "#1e1e1e",
                    "base-300": "#282828",
                    "info": "#0e7490",
                    "success": "#0f766e",
                    "warning": "#c2410c",
                    "error": "#dc2626",
                },
            },
        ],
    }
}