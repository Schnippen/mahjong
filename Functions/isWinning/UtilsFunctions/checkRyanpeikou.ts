import { tileCountsType } from '../../../Types/types';

export function checkRyanpeikou(tileCounts: tileCountsType): boolean {
  let sequenceCounts: { [key: string]: number } = {};

  for (let tileName in tileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    // Check for sequences in valid tile types
    if (['bamboo', 'circles', 'characters'].indexOf(type) === -1) continue;

    const nextValue1 = `${type}${parseInt(value) + 1}`;
    const nextValue2 = `${type}${parseInt(value) + 2}`;

    if (tileCounts[tileName] > 0 && tileCounts[nextValue1] > 0 && tileCounts[nextValue2] > 0) {
      const sequence = `${tileName}-${nextValue1}-${nextValue2}`;
      if (sequenceCounts[sequence]) {
        sequenceCounts[sequence]++;
      } else {
        sequenceCounts[sequence] = 1;
      }
    }
  }

  let pairsOfSequences = 0;
  // Check if there are two distinct sequences that appear at least twice
  for (let sequence in sequenceCounts) {
    if (sequenceCounts[sequence] >= 2) {
      pairsOfSequences++;
    }
  }

  return pairsOfSequences >= 2;
}
