
function convertToHexRGB(r, g, b) {
  const red = r.toString(16).padStart(2, '0');
  const green = g.toString(16).padStart(2, '0');
  const blue = b.toString(16).padStart(2, '0');

  return {
    red: `0x${red}`,
    green: `0x${green}`,
    blue: `0x${blue}`
  };
}
function LedsAndColors(leds, colors) {
  return Array(leds).fill(convertToHexRGB(colors.red, colors.green, colors.blue))
}

export {
  convertToHexRGB,
  LedsAndColors
}