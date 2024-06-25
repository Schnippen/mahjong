import {
  TTileObject,
  TstolenTiles,
  TypeOfAction,
  tileCountsType,
} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkJunchanMelds} from '../UtilsFunctions/checkJunchan';

type isJunchanTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isJunchan({hand, discard, playerMelds}: isJunchanTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';

  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let han: number;
  let yakuName = 'Junchan';
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

  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = {...tileCounts};
      newCounts[tileName] -= 2;
      if (checkJunchanMelds(newCounts)) {
        return {
          result: true,
          typeOfAction: typeOfAction,
          han: han,
          yakuName: yakuName,
        };
      }
    }
  }

  const end = performance.now();
  //console.log(`isJunchan() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
  };
}
