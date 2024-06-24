import {TTileObject, tileCountsType} from '../../../Types/types';

export function checkPinfu(
  tileCounts: tileCountsType,
  winningTile: TTileObject,
): boolean {
  if (!winningTile || !winningTile.name) {
    console.error('Invalid winningTile object');
    return false;
  }

  const originalTileCounts = {...tileCounts};
  const validTypes = ['bamboo', 'circles', 'characters'];
  const yakuhaiTiles = [
    'east1',
    'south1',
    'west1',
    'north1',
    'red1',
    'green1',
    'white1',
  ];

  type RyanmenWaitTilesType = {
    [key: string]: string[];
  };

  const ryanmenWaitTiles: RyanmenWaitTilesType = {
    '1': ['2', '3'],
    '2': ['1', '3'],
    '3': ['2', '4'],
    '4': ['3', '5'],
    '5': ['4', '6'],
    '6': ['5', '7'],
    '7': ['6', '8'],
    '8': ['7', '9'],
    '9': ['8', '7'],
  };

  let meldsFound = 0;
  let pairFound = false;

  for (let tileName in tileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    if (!validTypes.includes(type)) continue;

    while (tileCounts[tileName] > 0) {
      const nextValue1 = `${type}${parseInt(value) + 1}`;
      const nextValue2 = `${type}${parseInt(value) + 2}`;

      if (tileCounts[nextValue1] > 0 && tileCounts[nextValue2] > 0) {
        tileCounts[tileName]--;
        tileCounts[nextValue1]--;
        tileCounts[nextValue2]--;
        meldsFound++;
      } else {
        break;
      }
    }
  }

  for (let tileName in tileCounts) {
    if (tileCounts[tileName] === 2) {
      const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
      if (pairFound || yakuhaiTiles.includes(tileName)) return false;
      pairFound = true;
      tileCounts[tileName] -= 2;
    }
  }

  if (meldsFound !== 4 || !pairFound) {
    return false;
  }

  const [winningType, winningValue] = winningTile.name
    .split(/(\d+)/)
    .filter(Boolean);
  const winningNum = parseInt(winningValue);

  const twoSidedWait = () => {
    const waitPatterns =
      ryanmenWaitTiles[winningValue as keyof RyanmenWaitTilesType];
    return waitPatterns.some(val => {
      const adjacentTile = `${winningType}${val}`;
      return originalTileCounts[adjacentTile] > 0;
    });
  };

  const ryanmenWait = twoSidedWait();

  return ryanmenWait;
}
