const postcss = require("postcss");

module.exports = {
  theme: {
    fontFamily: {
      mono: [
        "Fira\\ Mono",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation\\ Mono",
        "Courier\\ New",
        "monospace"
      ]
    },
    extend: {
      height: {
        "screen-85": "85vh"
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'first', 'last', 'even', 'odd', 'hover', 'focus'],
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover', 'disabled'],
    textDecoration: ['responsive', 'hover', 'focus', 'active', 'group-hover']
  },
  plugins: [
    function({ addVariant, e }) {
      addVariant('disabled', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`disabled${separator}${className}`)}:disabled`
        })
      })
    }
  ]
};
