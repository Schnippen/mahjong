import {tileCountsType} from '../../../Types/types';

export function checkHonitsu(tileCounts: tileCountsType): boolean {
  const honorTiles = [
    'east1',
    'south1',
    'west1',
    'north1',
    'red1',
    'green1',
    'white1',
  ];
  const suits = ['bamboo', 'circles', 'characters'];
  let detectedSuit: string | null = null;

  for (let tileName in tileCounts) {
    const [type] = tileName.split(/(\d+)/).filter(Boolean);

    if (honorTiles.includes(type)) {
      continue;
    }

    if (suits.includes(type)) {
      if (detectedSuit === null) {
        detectedSuit = type;
      } else if (detectedSuit !== type) {
        return false;
      }
    }
  }

  return detectedSuit !== null;
}
