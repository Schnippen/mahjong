import {tileCountsType} from '../../../Types/types';

export function checkToiToiTriplets(tileCounts: tileCountsType) {
  let meldsFound = 0;
  for (let tileName in tileCounts) {
    while (tileCounts[tileName] >= 3) {
      tileCounts[tileName] -= 3;
      meldsFound++;
    }
  }
  //console.log('checkToiToiTriplets', meldsFound);
  return meldsFound;
}
