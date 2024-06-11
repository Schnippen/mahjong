import {TTileObject, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';

type isChiitoitsuTypes = {hand: TTileObject[]; discard: TTileObject[]};

export function isChiitoitsu({hand, discard}: isChiitoitsuTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';
  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard]; //TODO check it
    typeOfAction = 'RON';
  }

  //must be closed hand
  const tileCounts = countTilesByName(handToCheck);
  // check for Chiitoitsu (Seven Pairs)
  let pairsCount = 0;
  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      pairsCount++;
    }
  }
  const end = performance.now();
  console.log(`isChiitoitsu() took ${end - start} milliseconds.`);
  if (pairsCount === 7) {
    return {result: true, typeOfAction: typeOfAction};
    // In Chiitoitsu, 6 pairs means waiting for the 7th pair
  } else {
    return {result: false, typeOfAction: typeOfAction};
  }
}
