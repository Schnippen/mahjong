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
  Process?: 'ron' | 'tsumo';
};

export function isChanta({hand, discard, playerMelds, Process}: isChantaTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];
  let han: number;
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let yakuName = 'Chanta';
  if (meldedTiles.length === 0) {
    han = 2;
    handToCheck = hand.concat(discard);
  } else {
    han = 1;
    handToCheck = [...hand, ...discard, ...meldedTiles];
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
      winningTile,
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
    winningTile,
  };
}
