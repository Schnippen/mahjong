import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkShousangen} from '../UtilsFunctions/checkShousangen';

type isShousangenTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isShousangen({
  hand,
  discard,
  playerMelds,
  Process,
}: isShousangenTypes) {
  const start = performance.now();
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];

  let yakuName = 'Shousangen';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let handToCheck: TTileObject[] = [];

  if (meldedTiles.length === 0) {
    handToCheck = hand.concat(discard);
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
  }

  const tileCounts = countTilesByName(handToCheck);

  if (checkShousangen(tileCounts)) {
    //return { result: true, typeOfAction: typeOfAction }; //there is problem with melds
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {
            result: true,
            typeOfAction,
            han: 2,
            yakuName,
            winningTile,
          };
        }
      }
    }
  }
  /*  console.log("SHOU",checkShousangen(tileCounts))
   for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = { ...tileCounts };
      newCounts[tileName] -= 2;
      if (checkMelds(newCounts) === 4) {
        return true;
      }
    }
  } */

  const end = performance.now();
  //console.log(`isShousangen() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction,
    han: 0,
    yakuName,
    winningTile,
  };
}
