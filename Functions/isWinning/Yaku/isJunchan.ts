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
  Process?: 'ron' | 'tsumo';
};

export function isJunchan({
  hand,
  discard,
  playerMelds,
  Process,
}: isJunchanTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let han: number;
  let yakuName = 'Junchan';
  if (meldedTiles.length === 0) {
    han = 3;
    handToCheck = hand.concat(discard);
  } else {
    han = 2;
    handToCheck = [...hand, ...discard, ...meldedTiles];
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
          winningTile,
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
    winningTile,
  };
}
