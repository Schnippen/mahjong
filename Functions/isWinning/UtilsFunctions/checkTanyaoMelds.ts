import {tileCountsType} from '../../../Types/types';

export function checkTanyaoMelds(tileCounts: tileCountsType) {
  let meldsFound = 0;
  let validTypes = ['bamboo', 'circles', 'characters'];

  for (let tileName in tileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
    //skiping other than type of validTypes and 1 9
    if (validTypes.indexOf(type) === -1) continue;
    if (value === '1' || value === '9') continue;

    while (tileCounts[tileName] >= 3) {
      tileCounts[tileName] -= 3;
      meldsFound++;
    }

    if (tileCounts[tileName] > 0) {
      if (type && value) {
        const nextValue1 = `${type}${parseInt(value) + 1}`;
        const nextValue2 = `${type}${parseInt(value) + 2}`;

        // Skip if the next values are 1 or 9
        if (
          value >= '2' &&
          value <= '8' &&
          tileCounts[nextValue1] > 0 &&
          tileCounts[nextValue2] > 0
        ) {
          tileCounts[tileName]--;
          tileCounts[nextValue1]--;
          tileCounts[nextValue2]--;
          meldsFound++;
        }
      }
    }
  }
  return meldsFound;
}
