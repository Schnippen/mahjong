import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkChuurenPoutou} from '../UtilsFunctions/checkChuurenPoutou';

type isChuurenPoutouTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isChuurenPoutou({
  hand,
  discard,
  playerMelds,
}: isChuurenPoutouTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';
  let yakuName = 'Chuuren Poutou';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  if (meldedTiles.length > 0) {
    typeOfAction = '';
    return {result: false, typeOfAction: typeOfAction};
  }
  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard]; //is closed only
    typeOfAction = 'RON';
  }

  const tileCounts = countTilesByName(handToCheck);

  if (checkChuurenPoutou(tileCounts)) {
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
  //console.log(`isChuurenPoutou() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
  };
}
