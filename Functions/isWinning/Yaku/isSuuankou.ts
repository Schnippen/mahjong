import {
  TTileObject,
  TstolenTiles,
  TypeOfAction,
} from '../../../Types/types';
import { countTilesByName } from '../../isReadyForRiichii/countTilesByName';
import { checkToiToiTriplets } from '../UtilsFunctions/checkToiToiTriplets';

type isToiToiTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isSuuankou({ hand, discard, playerMelds }: isToiToiTypes) {
  const start = performance.now();

  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';

  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);

  // Suuankou requires a closed hand
  if (meldedTiles.length > 0) {
    typeOfAction = '';
    return { result: false, typeOfAction: typeOfAction };
  }

  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard];
    typeOfAction = 'RON';
  }
  const tileCounts = countTilesByName(handToCheck);

  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = { ...tileCounts };
      newCounts[tileName] -= 2;
      if (checkToiToiTriplets(newCounts) === 4) {
        return { result: true, typeOfAction: typeOfAction };
      }
    }
  }

  let triplesCount = 0;
  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 3) {
      triplesCount++;
    }
  }

  const end = performance.now();
  console.log(`isSuuankou() took ${end - start} milliseconds.`);

  if (triplesCount === 4) {
    return { result: true, typeOfAction: typeOfAction };
  } else {
    return { result: false, typeOfAction: typeOfAction };
  }
}
