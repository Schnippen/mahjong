import store from '../../../Store/store';
import {tileCountsType, WindTypes} from '../../../Types/types';

export function checkYakuhai(tileCounts: tileCountsType): number {
  let prevailingWind: WindTypes =
    store.getState().playersReducer.whoTheWinnerIs.prevailingWind;
  let player1Wind: WindTypes = store.getState().playersReducer.player1.wind;
  //TODO only works for player1
  const yakuhaiTiles = ['red', 'green', 'white', prevailingWind, player1Wind];

  let yakuhaiTripletsCount = 0;

  for (let tileName in tileCounts) {
    const [type] = tileName.split(/(\d+)/).filter(Boolean);

    if (['red', 'green', 'white'].includes(type) && tileCounts[tileName] >= 3) {
      yakuhaiTripletsCount++;
    } else if (
      ['east', 'south', 'west', 'north'].includes(type) &&
      (type === prevailingWind || type === player1Wind) &&
      tileCounts[tileName] >= 3
    ) {
      yakuhaiTripletsCount++;
    }
  }

  return yakuhaiTripletsCount;
}

/*  if (yakuhaiTiles.includes(type) && tileCounts[tileName] >= 3) {
       yakuhaiTripletsCount++;
     } */

/*  if (tileCounts[tileName] >= 3) {
      if (['red', 'green', 'white'].includes(type)) {
        yakuhaiTripletsCount++;
      } else if (
        ['east', 'south', 'west', 'north'].includes(type) &&
        (type === prevailingWind || type === player1Wind)
      ) {
        yakuhaiTripletsCount++;
      } */
