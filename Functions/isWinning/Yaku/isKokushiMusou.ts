import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkKokushiMusou} from '../UtilsFunctions/checkKokushiMusou';

type isKokushiMusouTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isKokushiMusou({
  hand,
  discard,
  playerMelds,
}: isKokushiMusouTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';

  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let yakuName = 'Kokushi Musou';
  if (meldedTiles.length > 0) {
    typeOfAction = '';
    return {
      result: false,
      typeOfAction: typeOfAction,
      han: 0,
      yakuName: yakuName,
    };
  }

  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
    typeOfAction = 'RON';
  }

  const tileCounts = countTilesByName(handToCheck);
  if (checkKokushiMusou(tileCounts)) {
    return {
      result: true,
      typeOfAction: typeOfAction,
      han: 13,
      yakuName: yakuName,
    };
  }

  const end = performance.now();
  //console.log(`isKokushiMusou() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
  };
}
