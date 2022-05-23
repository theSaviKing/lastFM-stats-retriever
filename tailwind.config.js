const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./**/*.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans]
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
                    "info": "#0e7490",
                    "success": "#0f766e",
                    "warning": "#c2410c",
                    "error": "#dc2626",
                },
            },
        ],
    }
}