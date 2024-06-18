import {tileCountsType} from '../../../Types/types';

export function checkSankantsu(tileCounts: tileCountsType): boolean {
  let kantsuCount = 0;

  for (let tileName in tileCounts) {
    if (tileCounts[tileName] === 4) {
      kantsuCount++;
    }
  }

  return kantsuCount === 3;
}
