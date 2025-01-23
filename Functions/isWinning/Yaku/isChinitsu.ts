import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkChinitsu} from '../UtilsFunctions/checkChiinitsu';

type isChinitsuTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isChinitsu({
  hand,
  discard,
  playerMelds,
  Process,
}: isChinitsuTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);

  let han: number;
  let yakuName = 'Chinitsu';
  if (meldedTiles.length === 0) {
    han = 6;
  } else {
    han = 5;
  }

  if (meldedTiles.length === 0) {
    handToCheck = hand.concat(discard);
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
  }

  const tileCounts = countTilesByName(handToCheck);

  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = {...tileCounts};
      newCounts[tileName] -= 2;
      if (checkChinitsu(newCounts) === 4) {
        return {
          result: true,
          typeOfAction: typeOfAction,
          han: han,
          yakuName: yakuName,
          winningTile,
        };
      }
    }
  }

  const end = performance.now();
  //console.log(`isChinitsu() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
    winningTile,
  };
}
