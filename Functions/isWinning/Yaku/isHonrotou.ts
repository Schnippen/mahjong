import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkHonroutou} from '../UtilsFunctions/checkHonroutou';

type isHonrotouTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isHonrotou({hand, discard, playerMelds}: isHonrotouTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';
  let yakuName = 'Honrotou';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
    typeOfAction = 'RON';
  }

  const tileCounts = countTilesByName(handToCheck);

  if (checkHonroutou(tileCounts)) {
    //return { result: true, typeOfAction: typeOfAction }; //there is problem with melds
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {
            result: true,
            typeOfAction: typeOfAction,
            han: 2,
            yakuName: yakuName,
          };
        }
      }
    }
  }

  const end = performance.now();
  //console.log(`isHonrotou() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
  };
}
