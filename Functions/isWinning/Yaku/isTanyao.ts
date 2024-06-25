import {
  TTileObject,
  TstolenTiles,
  TypeOfAction,
  tileCountsType,
} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkTanyaoMelds} from '../UtilsFunctions/checkTanyaoMelds';

type isTanyaoTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isTanyao({hand, discard, playerMelds}: isTanyaoTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';

  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let yakuName = 'Tanyao';
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
      if (checkTanyaoMelds(newCounts) === 4) {
        return {
          result: true,
          typeOfAction: typeOfAction,
          han: 1,
          yakuName: yakuName,
        };
      }
    }
  }

  const end = performance.now();
  //console.log(`isTanyao() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
  };
}
