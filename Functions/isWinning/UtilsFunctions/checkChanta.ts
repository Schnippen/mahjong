import {tileCountsType} from '../../../Types/types';
export function checkChanta(tileCounts: tileCountsType): boolean {
  let meldsFound = 0;
  const validTypes = ['bamboo', 'circles', 'characters'];
  const honors = [
    'east1',
    'south1',
    'west1',
    'north1',
    'red1',
    'green1',
    'white1',
  ];

  const originalTileCounts = {...tileCounts}; // Make a copy to reset later

  for (let tileName in tileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    // Skip invalid types
    if (!validTypes.includes(type) && !honors.includes(type)) continue;

    // Form melds with triplets of 1, 9, or honors
    while (tileCounts[tileName] >= 3) {
      if (value === '1' || value === '9' || honors.includes(type)) {
        tileCounts[tileName] -= 3;
        meldsFound++;
      } else {
        break;
      }
    }

    // Form sequences from 1-2-3 and 7-8-9
    if (validTypes.includes(type) && tileCounts[tileName] > 0) {
      if (value === '1' || value === '7') {
        const nextValue1 = `${type}${parseInt(value) + 1}`;
        const nextValue2 = `${type}${parseInt(value) + 2}`;

        if (tileCounts[nextValue1] > 0 && tileCounts[nextValue2] > 0) {
          tileCounts[tileName]--;
          tileCounts[nextValue1]--;
          tileCounts[nextValue2]--;
          meldsFound++;
        }
      }
    }
  }

  // Reset tileCounts
  tileCounts = {...originalTileCounts};

  // Ensure the hand contains 4 melds and a pair
  let pairFound = false;
  for (let tileName in tileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    // Check for pairs
    if (tileCounts[tileName] === 2) {
      if (value === '1' || value === '9' || honors.includes(type)) {
        pairFound = true;
      } else {
        return false; // Invalid pair
      }
    }
  }
  return meldsFound === 4 && pairFound;
}
