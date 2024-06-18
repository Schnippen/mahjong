import {tileCountsType} from '../../../Types/types';

export function checkSanankou(tileCounts: tileCountsType): boolean {
  let tripletsOrQuadsCount = 0;

  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 3) {
      tripletsOrQuadsCount += Math.floor(tileCounts[tileName] / 3);
    }
    if (tileCounts[tileName] === 4) {
      tripletsOrQuadsCount++;
    }
  }

  return tripletsOrQuadsCount >= 3;
}
