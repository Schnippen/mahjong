import {tileCountsType} from '../../../Types/types';

export function checkRyanpeikou(tileCounts: tileCountsType): boolean {
  let sequenceCounts: {[key: string]: number} = {};

  // Create a copy of the tile counts to manipulate
  let tempTileCounts = {...tileCounts};

  for (let tileName in tileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    // Check for sequences in valid tile types
    if (['bamboo', 'circles', 'characters'].indexOf(type) === -1) continue;

    const intValue = parseInt(value);

    // Check for sequences and update counts
    while (
      tempTileCounts[tileName] > 0 &&
      tempTileCounts[`${type}${intValue + 1}`] > 0 &&
      tempTileCounts[`${type}${intValue + 2}`] > 0
    ) {
      const sequence = `${tileName}-${type}${intValue + 1}-${type}${
        intValue + 2
      }`;
      sequenceCounts[sequence] = (sequenceCounts[sequence] || 0) + 1;

      // Deduct the counts for the found sequence
      tempTileCounts[tileName]--;
      tempTileCounts[`${type}${intValue + 1}`]--;
      tempTileCounts[`${type}${intValue + 2}`]--;
    }
  }

  //console.log("RYANPEIKOU COUNTS:", sequenceCounts);

  // Check if there are at least two sequences that appear at least twice
  let pairsOfSequences = 0;
  for (let sequence in sequenceCounts) {
    if (sequenceCounts[sequence] >= 2) {
      pairsOfSequences++;
    }
  }

  return pairsOfSequences >= 2;
}
