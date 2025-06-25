module.exports = {
    content: ['./views/**/*.pug', './public/**/*.js'],
    safelist: [
        {
            pattern: /bg-(rose|sky|teal|emerald|indigo)-(500|600|700)/,
            variants: ['hover'],
        },
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
