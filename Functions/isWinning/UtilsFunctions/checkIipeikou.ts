import { tileCountsType } from '../../../Types/types';

export function checkIipeikou(tileCounts: tileCountsType): boolean {
  let sequenceCounts: { [key: string]: number } = {};

  let tempTileCounts = { ...tileCounts };

  for (let tileName in tileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    if (['bamboo', 'circles', 'characters'].indexOf(type) === -1) continue;

    const intValue = parseInt(value);

    while (
      tempTileCounts[tileName] > 0 &&
      tempTileCounts[`${type}${intValue + 1}`] > 0 &&
      tempTileCounts[`${type}${intValue + 2}`] > 0
    ) {
      const sequence = `${tileName}-${type}${intValue + 1}-${type}${intValue + 2}`;
      sequenceCounts[sequence] = (sequenceCounts[sequence] || 0) + 1;

      tempTileCounts[tileName]--;
      tempTileCounts[`${type}${intValue + 1}`]--;
      tempTileCounts[`${type}${intValue + 2}`]--;
    }
  }

  console.log(sequenceCounts);
  
  for (let sequence in sequenceCounts) {
    if (sequenceCounts[sequence] >= 2) {
      return true;
    }
  }

  return false;
}