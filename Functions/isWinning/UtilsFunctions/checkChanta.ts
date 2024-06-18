import {tileCountsType} from '../../../Types/types';
export function checkChanta(tileCounts: tileCountsType): boolean {
  let meldsFound = 0;
  let pairFound = false;
  const validTypes = ['bamboo', 'circles', 'characters'];
  const honors = ['east', 'south', 'west', 'north', 'red', 'green', 'white'];
  const remainingTileCounts = {...tileCounts};

  console.log('insideChanta:', tileCounts);

  const isTerminalOrHonor = (type: string, value: string) => {
    return honors.includes(type) || value === '1' || value === '9';
  };

  // Form melds and sequences
  for (let tileName in remainingTileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    // Skip invalid types
    if (!validTypes.includes(type) && !honors.includes(type)) continue;

    // Form triplets with terminals or honors
    while (remainingTileCounts[tileName] >= 3) {
      remainingTileCounts[tileName] -= 3;
      meldsFound++;
    }

    // Form sequences from 1-2-3 and 7-8-9
    if (validTypes.includes(type) && (value === '1' || value === '7')) {
      const nextValue1 = `${type}${parseInt(value) + 1}`;
      const nextValue2 = `${type}${parseInt(value) + 2}`;

      if (
        remainingTileCounts[tileName] > 0 &&
        remainingTileCounts[nextValue1] > 0 &&
        remainingTileCounts[nextValue2] > 0
      ) {
        remainingTileCounts[tileName]--;
        remainingTileCounts[nextValue1]--;
        remainingTileCounts[nextValue2]--;
        meldsFound++;
      }
    }
  }

  // Ensure there is a valid pair
  for (let tileName in remainingTileCounts) {
    if (remainingTileCounts[tileName] === 2) {
      const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
      if (isTerminalOrHonor(type, value)) {
        pairFound = true;
        remainingTileCounts[tileName] -= 2;
        break;
      }
    }
  }

  // Ensure all remaining tiles are either terminals or honors
  for (let tileName in remainingTileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
    if (
      remainingTileCounts[tileName] > 0 &&
      validTypes.includes(type) &&
      !isTerminalOrHonor(type, value)
    ) {
      return false; // Invalid meld found
    }
  }

  console.log('melds Chanta:', meldsFound);
  return meldsFound === 4 && pairFound;
}
