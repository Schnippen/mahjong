import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkIipeikou} from '../UtilsFunctions/checkIipeikou';

type isIipekouTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isIipeikou({
  hand,
  discard,
  playerMelds,
  Process,
}: isIipekouTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = hand.concat(discard);
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let yakuName = 'Honrotou';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let winningTile: TTileObject = discard[0];
  if (meldedTiles.length > 0) {
    //is closed only
    return {
      result: false,
      typeOfAction,
      han: 0,
      yakuName,
      winningTile,
    };
  }

  const tileCounts = countTilesByName(handToCheck);

  if (checkIipeikou(tileCounts)) {
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {
            result: true,
            typeOfAction,
            han: 1,
            yakuName,
            winningTile,
          };
        }
      }
    }
  }
  //must check for 4 triplets and a pair
  /*     if (checkIipekou(tileCounts)) {
      return { result: true, typeOfAction: typeOfAction };
    } */

  const end = performance.now();
  //console.log(`isIipekou() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction,
    han: 0,
    yakuName,
    winningTile,
  };
}
