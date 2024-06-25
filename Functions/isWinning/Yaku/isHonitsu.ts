import {
  TTileObject,
  TstolenTiles,
  TypeOfAction,
  tileCountsType,
} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkHonitsu} from '../UtilsFunctions/checkHonitsu';

type isHonitsuTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isHonitsu({hand, discard, playerMelds}: isHonitsuTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';

  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);

  let han: number;
  let yakuName = 'Honitsu';
  if (meldedTiles.length === 0) {
    han = 3;
  } else {
    han = 2;
  }

  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
    typeOfAction = 'RON';
  }

  const tileCounts = countTilesByName(handToCheck);

  if (checkHonitsu(tileCounts)) {
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {
            result: true,
            typeOfAction: typeOfAction,
            han: han,
            yakuName: yakuName,
          };
        }
      }
    }
  }

  const end = performance.now();
  //console.log(`isHonitsu() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
  };
}
