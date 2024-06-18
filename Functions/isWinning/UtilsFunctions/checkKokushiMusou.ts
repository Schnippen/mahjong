import {tileCountsType} from '../../../Types/types';

export function checkKokushiMusou(tileCounts: tileCountsType): boolean {
  const kokushiMusouTiles = [
    'bamboo1',
    'bamboo9',
    'circles1',
    'circles9',
    'characters1',
    'characters9',
    'east1',
    'south1',
    'west1',
    'north1',
    'red1',
    'green1',
    'white1',
  ];

  let uniqueTiles = 0;
  let duplicateFound = false;

  for (let tile of kokushiMusouTiles) {
    if (tileCounts[tile] && tileCounts[tile] > 0) {
      uniqueTiles++;
      if (tileCounts[tile] >= 2) {
        duplicateFound = true;
      }
    }
  }

  return uniqueTiles === 13 && duplicateFound;
}
