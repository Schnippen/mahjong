import {
  TTileObject,
  TstolenTiles,
  TypeOfAction,
  tileCountsType,
} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkIttsuu} from '../UtilsFunctions/checkIttsuu';
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
  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
    typeOfAction = 'RON';
  }

  const tileCounts = countTilesByName(handToCheck);
  if (checkKokushiMusou(tileCounts)) {
    return {result: true, typeOfAction: typeOfAction};
  }

  const end = performance.now();
  console.log(`isKokushiMusou() took ${end - start} milliseconds.`);
  return {result: false, typeOfAction: typeOfAction};
}
