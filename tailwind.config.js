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
    textDecoration: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: []
};
