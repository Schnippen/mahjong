import {tileCountsType} from '../../../Types/types';

type TripletCounts = {
  [key: string]: {[key: string]: number};
};
export function checkSanshokudoukou(tileCounts: tileCountsType): boolean {
  let tripletCounts: TripletCounts = {
    bamboo: {},
    circles: {},
    characters: {},
  };

  for (let tileName in tileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    if (tileCounts[tileName] >= 3) {
      if (tripletCounts[type]) {
        if (!tripletCounts[type][value]) {
          tripletCounts[type][value] = 0;
        }
        tripletCounts[type][value] += Math.floor(tileCounts[tileName] / 3);
      }
    }
  }

  for (let value in tripletCounts.bamboo) {
    if (
      tripletCounts.bamboo[value] &&
      tripletCounts.circles[value] &&
      tripletCounts.characters[value]
    ) {
      return true;
    }
  }

  return false;
}
