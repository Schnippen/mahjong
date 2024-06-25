import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkIttsuu} from '../UtilsFunctions/checkIttsuu';

type isIttsuuTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isIttsuu({hand, discard, playerMelds}: isIttsuuTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let han: number;
  let yakuName = 'Ittsuu';
  if (meldedTiles.length === 0) {
    han = 2;
  } else {
    han = 1;
  }
  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
    typeOfAction = 'RON';
  }

  const tileCounts = countTilesByName(handToCheck);

  // checking if there is an Ittsuu in the hand
  if (checkIttsuu(tileCounts)) {
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
  //console.log(`isIttsuu() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
  };
}
