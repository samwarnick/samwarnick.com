const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.njk", "./src/**/*md", ".eleventy.js"],
    theme: {
        fontFamily: {
            sans: ["'Merriweather Sans'", "sans-serif"],
        },
        extend: {
            colors: {
                rainstorm: {
                    100: "hsl(197, 39%, 93%)",
                    200: "hsl(197, 39%, 73%)",
                    300: "hsl(197, 39%, 53%)",
                    400: "hsl(197, 39%, 33%)",
                    500: "hsl(197, 39%, 23%)",
                    600: "hsl(197, 39%, 18%)",
                    700: "hsl(197, 39%, 13%)",
                    800: "hsl(197, 39%, 8%)",
                    900: "hsl(197, 39%, 3%)",
                },
                gray: colors.slate,
                orange: colors.orange,
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme("colors.gray.700"),
                        fontWeight: theme("fontWeight.light"),
                        a: {
                            textDecoration: "none",
                        },
                        blockquote: {
                            fontWeight: theme("fontWeight.light"),

                            backgroundColor: theme("colors.gray.100"),
                            padding: theme("padding.1"),
                            border: "none",
                            p: {
                                paddingLeft: theme("padding.2"),
                                fontStyle: "normal",
                                "&::before": {
                                    color: theme("colors.rainstorm.500"),
                                    fontWeight: theme("fontWeight.bold"),
                                },
                                "&::after": {
                                    color: theme("colors.rainstorm.500"),
                                    fontWeight: theme("fontWeight.bold"),
                                },
                            },
                        },
                        h2: {
                            fontWeight: theme("fontWeight.black"),
                            marginTop: 0,
                            marginBottom: 0,
                            fontSize: theme("fontSize.5xl"),
                        },
                        img: {
                            marginLeft: "auto",
                            marginRight: "auto",
                        },
                        code: {
                            "&::before": {
                                display: "none",
                            },
                            "&::after": {
                                display: "none",
                            },
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require("@tailwindcss/typography")({
            modifiers: [],
        }),
    ],
};
