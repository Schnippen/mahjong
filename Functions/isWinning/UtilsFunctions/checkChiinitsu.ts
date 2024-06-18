import {tileCountsType} from '../../../Types/types';

export function checkChinitsu(tileCounts: tileCountsType) {
  let meldsFound = 0;
  let validTypes = ['bamboo', 'circles', 'characters'];
  let suitType = '';

  for (let tileName in tileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    if (validTypes.indexOf(type) === -1) continue;

    if (suitType === '') {
      suitType = type;
    }

    if (type !== suitType) continue;

    while (tileCounts[tileName] >= 3) {
      tileCounts[tileName] -= 3;
      meldsFound++;
    }

    // checking for sequences
    if (tileCounts[tileName] > 0) {
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

  const otherSuits = Object.keys(tileCounts).filter(tileName => {
    const [type] = tileName.split(/(\d+)/).filter(Boolean);
    return type !== suitType;
  });

  if (otherSuits.length > 0) {
    return 0;
  }

  return meldsFound;
}
