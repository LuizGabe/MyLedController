import { GameColors } from "./GameColors.js";
import { RGBController } from "../modules/RGBController.js";

const defineColor = new RGBController().defineColor;

export const monitoredApps = [
  {
    name: 'Minecraft.exe',
    openAction: () => defineColor(GameColors.minecraft),
    closeAction: () => defineColor(GameColors.default)
  },
  {
    name: 'valorant',
    openAction: () => defineColor(GameColors.valorant),
    closeAction: () => defineColor(GameColors.default)
  },
  {
    name: 'ping',
    openAction: () => defineColor(GameColors.default),
    closeAction: () => defineColor(GameColors.valorant)
  }
];
