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
  Process?: 'ron' | 'tsumo';
};

export function isTanyao({hand, discard, playerMelds, Process}: isTanyaoTypes) {
  const start = performance.now();
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];

  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let yakuName = 'Tanyao';
  let handToCheck: TTileObject[] = [];
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
      if (checkTanyaoMelds(newCounts) === 4) {
        return {
          result: true,
          typeOfAction,
          han: 1,
          yakuName,
          winningTile,
        };
      }
    }
  }

  const end = performance.now();
  //console.log(`isTanyao() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction,
    han: 0,
    yakuName,
    winningTile,
  };
}
