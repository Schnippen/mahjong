import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkRyanpeikou} from '../UtilsFunctions/checkRyanpeikou';

type isRyanpeikouTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isRyanpeikou({
  hand,
  discard,
  playerMelds,
  Process,
}: isRyanpeikouTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = hand.concat(discard);
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let yakuName = 'Ryanpeikou';
  //closed only
  if (meldedTiles.length > 0) {
    return {
      result: false,
      typeOfAction,
      yakuName: yakuName,
      winningTile,
      han: 0,
    };
  }

  const tileCounts = countTilesByName(handToCheck);

  if (checkRyanpeikou(tileCounts)) {
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {
            result: true,
            typeOfAction,
            han: 3,
            yakuName,
            winningTile,
          };
        }
      }
    }
  }
  /*     for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        console.log(tileCounts)
        const newCounts = { ...tileCounts };
        newCounts[tileName] -= 2;
        //console.log("RYAN",checkRyanpeikou(newCounts))
        if (checkRyanpeikou(newCounts)) {
          
           return { result: true, typeOfAction: typeOfAction };
        }
        }
      }  */

  const end = performance.now();
  //console.log(`isRyanpeikou() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction,
    yakuName: yakuName,
    han: 0,
    winningTile,
  };
}
