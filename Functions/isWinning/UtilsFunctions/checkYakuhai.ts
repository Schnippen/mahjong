import {tileCountsType} from '../../../Types/types';

export function checkYakuhai(tileCounts: tileCountsType): boolean {
  const yakuhaiTiles = [
    'red',
    'green',
    'white',
    'east',
    'south',
    'west',
    'north',
  ];
  let yakuhaiTripletsCount = 0;

  for (let tileName in tileCounts) {
    const [type] = tileName.split(/(\d+)/).filter(Boolean);

    if (yakuhaiTiles.includes(type) && tileCounts[tileName] >= 3) {
      yakuhaiTripletsCount++;
    }
  }

  return yakuhaiTripletsCount > 0;
}
