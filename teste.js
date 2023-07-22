import fs from 'fs';
import { Client } from 'openrgb-sdk';

const colorBefore = [[
  0xff000000,
  0xff000000,
  0xff0094ff,
  0xff002fff,
  0xff0000ff
],
[
  0xff000000,
  0xff000000,
  0xff002fff,
  0xff0000ff,
  0xff0000ff
],
[
  0xff000000,
  0xff16dde3,
  0xff002fff,
  0xff00c1ff,
  0xff0000ff
],
[
  0xff000000,
  0xff1668e3,
  0xff0089ff,
  0xff00c1ff,
  0xff0000ff
],
[
  0xff000000,
  0xff000000,
  0xff0089ff,
  0xff0094ff,
  0xff0000ff
],
[
  0xff000000,
  0xff000000,
  0xff000000,
  0xff0044ff,
  0xff0000ff
]]
const colorRGB = [
  [
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 0,
      "green": 148,
      "blue": 255
    },
    {
      "red": 0,
      "green": 47,
      "blue": 255
    },
    {
      "red": 0,
      "green": 0,
      "blue": 255
    }
  ],
  [
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 0,
      "green": 47,
      "blue": 255
    },
    {
      "red": 0,
      "green": 0,
      "blue": 255
    },
    {
      "red": 0,
      "green": 0,
      "blue": 255
    }
  ],
  [
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 22,
      "green": 221,
      "blue": 227
    },
    {
      "red": 0,
      "green": 47,
      "blue": 255
    },
    {
      "red": 0,
      "green": 193,
      "blue": 255
    },
    {
      "red": 0,
      "green": 0,
      "blue": 255
    }
  ],
  [
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 22,
      "green": 104,
      "blue": 227
    },
    {
      "red": 0,
      "green": 137,
      "blue": 255
    },
    {
      "red": 0,
      "green": 193,
      "blue": 255
    },
    {
      "red": 0,
      "green": 0,
      "blue": 255
    }
  ],
  [
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 0,
      "green": 137,
      "blue": 255
    },
    {
      "red": 0,
      "green": 148,
      "blue": 255
    },
    {
      "red": 0,
      "green": 0,
      "blue": 255
    }
  ],
  [
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "red": 0,
      "green": 68,
      "blue": 255
    },
    {
      "red": 0,
      "green": 0,
      "blue": 255
    }
  ]
]

function convertHexToRGB(hexList) {
  const rgbList = [];

  for (const hexRow of hexList) {
    const rgbRow = hexRow.map((hexValue) => ({
      red: (hexValue >> 16) & 0xFF,
      green: (hexValue >> 8) & 0xFF,
      blue: hexValue & 0xFF,
    }));

    // Inverter a ordem dos componentes de cor
    for (const rgbValue of rgbRow) {
      const temp = rgbValue.red;
      rgbValue.red = rgbValue.blue;
      rgbValue.blue = temp;
    }

    rgbList.push(rgbRow);
  }

  return rgbList;
}


const colorAfter = convertHexToRGB(colorBefore)

const colorRGBWithIndexcolorRGB = colorAfter.map((color) => {
  return color.map((colorRGB, indexRGB) => {
    return {led: indexRGB, color: colorRGB}
  })
})

const client = new Client()
await client.connect()
const devices = await client.getAllControllerData()
const mouse = devices[1]

fs.writeFileSync('./src/data/deviceMouse.json', JSON.stringify(mouse, null, 2))
client.disconnect()