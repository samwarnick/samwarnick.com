const postcss = require("postcss");

module.exports = {
  theme: {
    fontFamily: {
      serif: [
        "Roboto\\ Slab",
        "Constantia",
        "Lucida\\ Bright",
        "Lucidabright",
        "Lucida\\ Serif",
        "Lucida",
        "DejaVu\\ Serif",
        "Bitstream\\ Vera\\ Serif",
        "Liberation\\ Serif",
        "Georgia",
        "serif"
      ],
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
  variants: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus', 'active', 'disabled'],
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
