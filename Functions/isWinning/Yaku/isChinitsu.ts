import {
  TTileObject,
  TstolenTiles,
  TypeOfAction,
  tileCountsType,
} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkChinitsu} from '../UtilsFunctions/checkChiinitsu';
import {checkTanyaoMelds} from '../UtilsFunctions/checkTanyaoMelds';

type isChinitsuTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isChinitsu({hand, discard, playerMelds}: isChinitsuTypes) {
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

  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = {...tileCounts};
      newCounts[tileName] -= 2;
      if (checkChinitsu(newCounts) === 4) {
        return {result: true, typeOfAction: typeOfAction};
      }
    }
  }

  const end = performance.now();
  console.log(`isChinitsu() took ${end - start} milliseconds.`);
  return {result: false, typeOfAction: typeOfAction};
}
