import {tileCountsType} from '../../../Types/types';

export function checkChuurenPoutou(tileCounts: tileCountsType): boolean {
  const validSuits = ['characters', 'bamboo', 'circles'];
  let suitFound = '';
  let has1to9 = false;
  let additionalTileFound = false;
  let totalTiles = 0;

  for (let suit of validSuits) {
    let hasAllNumbers = true;
    let hasAdditionalTile = false;

    for (let i = 1; i <= 9; i++) {
      const tileName = `${suit}${i}`;
      if (tileCounts[tileName] === undefined || tileCounts[tileName] < 1) {
        hasAllNumbers = false;
        break;
      }
    }

    if (hasAllNumbers) {
      for (let i = 1; i <= 9; i++) {
        const tileName = `${suit}${i}`;
        if (tileCounts[tileName] > 1) {
          hasAdditionalTile = true;
          break;
        }
      }
    }

    if (hasAllNumbers && hasAdditionalTile) {
      if (suitFound === '') {
        suitFound = suit;
      } else {
        return false;
      }
    }
  }

  if (suitFound === '') return false;

  for (let tileName in tileCounts) {
    totalTiles += tileCounts[tileName];
  }

  return totalTiles === 14;
}
