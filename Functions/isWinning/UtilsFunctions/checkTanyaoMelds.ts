import {tileCountsType} from '../../../Types/types';

export function checkTanyaoMelds(tileCounts: tileCountsType) {
  let meldsFound = 0;
  const validTypes = ['bamboo', 'circles', 'characters'];
  const counts = { ...tileCounts };
  for (let tileName in counts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
    if (!validTypes.includes(type!) || value === '1' || value === '9') {
      return 0;
    }
  }
  for (let tileName in counts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
        while (counts[tileName] >= 3) {
      counts[tileName] -= 3;
      meldsFound++;
    }
    //checking sequences
    if (counts[tileName] > 0) {
      const next1 = `${type}${parseInt(value) + 1}`;
      const next2 = `${type}${parseInt(value) + 2}`;
      if (
        parseInt(value) <= 6 && 
        counts[next1] > 0 &&
        counts[next2] > 0
      ) {
        counts[tileName]--;
        counts[next1]--;
        counts[next2]--;
        meldsFound++;
      }
    }
  }
  return meldsFound;
}