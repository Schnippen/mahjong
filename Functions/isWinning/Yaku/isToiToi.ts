import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';

type isToiToiTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

/* TstolenTiles {
  name: string;
  tiles: TTileObject[];
  isOpen: boolean;
  type?: StolenType;
} */

export function isToiToi({hand, discard, playerMelds}: isToiToiTypes) {
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles]; //TODO check it
    typeOfAction = 'RON';
  }

  //this yaku can be done on opened hand
  const tileCounts = countTilesByName(handToCheck);

  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = {...tileCounts};
      newCounts[tileName] -= 2;
      if (checkMelds(newCounts) === 4) {
        return true;
      }
    }
  }
  //return false;

  let triplesCount = 0;
  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 3) {
      //there is possibility of Kan
      triplesCount++;
    }
  }
  if (triplesCount === 4) {
    return {result: true, typeOfAction: typeOfAction};
    // In Chiitoitsu, 6 pairs means waiting for the 7th pair
  } else {
    return {result: false, typeOfAction: typeOfAction};
  }
}
