import {tileCountsType} from '../../../Types/types';

export function checkRyuuiisou(tileCounts: tileCountsType): boolean {
  const ryuuiisouTiles = [
    'bamboo2',
    'bamboo3',
    'bamboo4',
    'bamboo6',
    'bamboo8',
    'green1',
  ];
  for (let tile in tileCounts) {
    if (tileCounts[tile] > 0 && !ryuuiisouTiles.includes(tile)) {
      return false;
    }
  }
  return true;
}
