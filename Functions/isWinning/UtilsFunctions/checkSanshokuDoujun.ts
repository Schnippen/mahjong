import { tileCountsType } from '../../../Types/types';

export function checkSanshokuDoujun(tileCounts: tileCountsType): boolean {
  const sequenceCounts: { [key: string]: number } = {};
  const validTypes = ['bamboo', 'circles', 'characters'];

  for (let tileName in tileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    // Check if the tile type is valid
    if (validTypes.indexOf(type) === -1) continue;

    const nextValue1 = `${type}${parseInt(value) + 1}`;
    const nextValue2 = `${type}${parseInt(value) + 2}`;

    if (tileCounts[tileName] > 0 && tileCounts[nextValue1] > 0 && tileCounts[nextValue2] > 0) {
      const sequence = `${value}-${parseInt(value) + 1}-${parseInt(value) + 2}`;

      if (sequenceCounts[sequence]) {
        sequenceCounts[sequence]++;
      } else {
        sequenceCounts[sequence] = 1;
      }
    }
  }

  // Check for each sequence if it appears in all three types
  for (let sequence in sequenceCounts) {
    const typesFound = new Set();

    for (let type of validTypes) {
      if (
        tileCounts[`${type}${sequence.split('-')[0]}`] > 0 &&
        tileCounts[`${type}${sequence.split('-')[1]}`] > 0 &&
        tileCounts[`${type}${sequence.split('-')[2]}`] > 0
      ) {
        typesFound.add(type);
      }
    }

    if (typesFound.size === 3) {
      return true;
    }
  }

  return false;
}
