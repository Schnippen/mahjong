import {tileCountsType} from '../../../Types/types';

export function checkTsuuiisou(tileCounts: tileCountsType): boolean {
  const honorTiles = [
    'east',
    'south',
    'west',
    'north',
    'red',
    'green',
    'white',
  ];
  let meldsFound = 0;
  let pairFound = false;
  let remainingTileCounts = {...tileCounts};

  console.log('insideTsuuiisou:', tileCounts);

  for (let tileName in remainingTileCounts) {
    const [type] = tileName.split(/(\d+)/).filter(Boolean);

    if (!honorTiles.includes(type)) return false;

    while (remainingTileCounts[tileName] >= 3) {
      remainingTileCounts[tileName] -= 3;
      meldsFound++;
    }
  }

  for (let tileName in remainingTileCounts) {
    if (remainingTileCounts[tileName] === 2) {
      const [type] = tileName.split(/(\d+)/).filter(Boolean);
      if (honorTiles.includes(type)) {
        pairFound = true;
        remainingTileCounts[tileName] -= 2;
        break;
      }
    }
  }

  console.log('melds Tsuuiisou:', meldsFound);
  return meldsFound === 4 && pairFound;
}
