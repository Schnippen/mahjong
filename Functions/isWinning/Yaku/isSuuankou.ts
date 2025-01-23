import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkToiToiTriplets} from '../UtilsFunctions/checkToiToiTriplets';

type isToiToiTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isSuuankou({
  hand,
  discard,
  playerMelds,
  Process,
}: isToiToiTypes) {
  const start = performance.now();

  let handToCheck: TTileObject[] = [];
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];

  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let yakuName = 'Suuankou';
  // Suuankou requires a closed hand
  if (meldedTiles.length === 0) {
    handToCheck = hand.concat(discard);
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
    return {
      result: false,
      typeOfAction: typeOfAction,
      han: 0,
      yakuName: yakuName,
      winningTile,
    };
  }
  const tileCounts = countTilesByName(handToCheck);

  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = {...tileCounts};
      newCounts[tileName] -= 2;
      if (checkToiToiTriplets(newCounts) === 4) {
        return {
          result: true,
          typeOfAction: typeOfAction,
          han: 13,
          yakuName: yakuName,
          winningTile,
        };
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
  //console.log(`isSuuankou() took ${end - start} milliseconds.`);

  if (triplesCount === 4) {
    return {
      result: true,
      typeOfAction: typeOfAction,
      han: 13,
      yakuName: yakuName,
      winningTile,
    };
  } else {
    return {
      result: false,
      typeOfAction: typeOfAction,
      han: 0,
      yakuName: yakuName,
    };
  }
}
