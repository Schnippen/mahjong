import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkRyuuiisou} from '../UtilsFunctions/checkRyuuiisou';

type isRyuuiisouTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isRyuuiisou({hand, discard, playerMelds}: isRyuuiisouTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';
  let yakuName = 'Ryuuiisou';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
    typeOfAction = 'RON';
  }

  const tileCounts = countTilesByName(handToCheck);
  if (checkRyuuiisou(tileCounts)) {
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {
            result: true,
            typeOfAction: typeOfAction,
            han: 13,
            yakuName: yakuName,
          };
        }
      }
    }
  }

  const end = performance.now();
  //console.log(`isRyuuiisou() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
  };
}
