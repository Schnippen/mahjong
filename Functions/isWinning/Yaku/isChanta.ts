import {
  TTileObject,
  TstolenTiles,
  TypeOfAction,
  tileCountsType,
} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkChanta} from '../UtilsFunctions/checkChanta';

type isChantaTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isChanta({hand, discard, playerMelds}: isChantaTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';
  let han: number;
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let yakuName = 'Chanta';
  if (meldedTiles.length === 0) {
    han = 2;
  } else {
    han = 1;
  }

  //TODO check if tsumo variant is correct
  if (hand.length === 14) {
    handToCheck = [...hand, ...meldedTiles];
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
    typeOfAction = 'RON';
  }

  const tileCounts = countTilesByName(handToCheck);
  /*  if (checkChanta(tileCounts)) {
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {result: true, typeOfAction: typeOfAction};
        }
      }
    }
  } */
  //working as intended
  if (checkChanta(tileCounts)) {
    return {
      result: true,
      typeOfAction: typeOfAction,
      han: han,
      yakuName: yakuName,
    };
  }
  /*   for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = {...tileCounts};
      newCounts[tileName] -= 2;
      if (checkMelds(newCounts) === 4) {
        return {result: true, typeOfAction: typeOfAction};
      }
    }
  } */

  const end = performance.now();
  //console.log(`isChanta() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
  };
}
