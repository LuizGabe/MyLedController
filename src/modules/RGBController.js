import { Client } from 'openrgb-sdk';
import fs from 'fs';

const colorTestes = JSON.parse(fs.readFileSync('./data/fireAnimation.json', 'utf8'))

const client = new Client();
const Log = (text, force=false) => force ? console.log(text): '';

async function Delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export class RGBController {
  async defineColor(color) {
    try {
      await client.connect();

      const deviceList = await client.getAllControllerData();

      for (const device of deviceList) {
        const { deviceId, zones } = device;

        const { id, ledsCount } = zones[0];

        const ledColors = Array(ledsCount).fill(color);

        client.updateZoneLeds(deviceId, id, ledColors);
      }

      Log('A cor foi definida para todos os dispositivos.');

    } catch (error) {
      Log('Erro ao definir a cor:', error);

    }
  }

  async animation() {
    await client.connect();

    const deviceList = await client.getAllControllerData();

    const { deviceId, zones: { 0: { id: zoneId } } } = deviceList[0];

    while (true) {
      for (let i = 0; i < 5; i++) {
        // Cria um array com as cores para todos os LEDs
        const ledColors = Array(5).fill({ red: 255, green: 255, blue: 255 });

        // Atualiza as cores dos LEDs na zona da memória RAM
        ledColors[i] = { red: 255, green: 0, blue: 0 };

        // Atualiza as cores dos LEDs na zona da memória RAM
        client.updateZoneLeds(deviceId, zoneId, ledColors);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }

  async explosionAnimation() {
    try {
      client.isConnected ? '' : await client.connect();

      const deviceList = await client.getAllControllerData();

      const device = deviceList[0];

      const colors = {
        purple: { red: 255, green: 0, blue: 255 },
        red: { red: 255, green: 0, blue: 0 },
        pink: { red: 255, green: 0, blue: 255 },
        blue: { red: 0, green: 0, blue: 255 },
        off: { red: 0, green: 0, blue: 0 },
      }
      this.setAllLedsColor(device, colors.off);
      this.setLedColor(device, 2, colors.purple)
      await new Promise(resolve => setTimeout(resolve, 100));
      this.setLedColor(device, 1, colors.pink)
      this.setLedColor(device, 3, colors.pink)
      await new Promise(resolve => setTimeout(resolve, 100));
      this.setLedColor(device, 0, colors.red)
      this.setLedColor(device, 4, colors.red)
      this.setLedColor(device, 1, colors.off)
      this.setLedColor(device, 3, colors.off)
      this.setLedColor(device, 2, colors.off)
      await new Promise(resolve => setTimeout(resolve, 100));
      this.setAllLedsColor(device, colors.off);

    } catch (error) {
      Log('Erro ao executar a animação:', error);

    }
  }
  async setLedColor(device, led, color) {
    try {
      client.isConnected ? '' : await client.connect();

      await client.updateSingleLed(device.deviceId, led, color);

      Log(`Definido a cor para o LED ${led} do dispositivo "${device.name}".`);

    } catch (error) {
      Log('Erro ao definir a cor do LED1:', error);

    }
  }

  async setAllLedsColor(device, color) {
    const zoneId = device.zones[0]
    const ledColors = Array(device.zones[0].ledsCount).fill(color);

    await client.updateZoneLeds(device.id, zoneId, ledColors);
    Log(`Definido a cor para todos os LEDs do dispositivo "${device.name}".`);
  }

  async animationFire() {
    client.isConnected ? '' : await client.connect();

    const deviceList = await client.getAllControllerData();
    const device = deviceList[0];

    const defineColorForLeds = async (scene) => {
      for (const color of scene) {
        await this.setLedColor(device, color.led, color.color);
      }
    };

    Log('Iniciando a animação.', true);
    const numberOfScenes = colorTestes.length;

    while (true) {
        const random = Math.floor(Math.random() * numberOfScenes)-1

        await defineColorForLeds(colorTestes[random < 0 ? random + 1 : random]);
        await Delay(100);
    }
  }

  decreaseLedsWithDelay = async (device, delay, primaryColor, segundaryColor) => {
    client.isConnected ? '' : await client.connect();

    await this.setAllLedsColor(device, primaryColor);

    for (const led of device.leds) {
      const ledIndex = device.leds.indexOf(led);
      await Delay(delay);
      await this.setLedColor(device, ledIndex, segundaryColor);
    }
  }

  async updateMultipleLeds(device, colors) {
    client.isConnected ? '' : await client.connect();
    await client.updateZoneLeds(device.deviceId, device.zones[0].id, colors);
  }
}

await client.connect();

const deviceList = await client.getAllControllerData();

// new RGBController().decreaseLedsWithDelay(deviceList[0], 1000, { red: 255, green: 0, blue: 0 }, { red: 0, green: 0, blue: 0 });
// new RGBController().animationFire();

new RGBController().updateMultipleLeds(deviceList[1], [{red: 255, green: 0, blue: 0},{red: 0, green: 255, blue: 0},{red: 0, green: 0, blue: 255}, {red: 255, green: 0, blue: 0},{red: 0, green: 255, blue: 0}])
// Log(await rgbToColorName({ red: 255, green: 0, blue: 0 }));
