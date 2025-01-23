import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkSanshokuDoujun} from '../UtilsFunctions/checkSanshokuDoujun';

type isSanshokuDoujunTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isSanshokuDoujun({
  hand,
  discard,
  playerMelds,
  Process,
}: isSanshokuDoujunTypes) {
  const start = performance.now();
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];

  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let handToCheck: TTileObject[] = [];

  let han: number;
  let yakuName = 'Sanshoku Doujun';
  if (meldedTiles.length === 0) {
    han = 2;
    handToCheck = hand.concat(discard);
  } else {
    han = 1;
    handToCheck = [...hand, ...discard, ...meldedTiles];
  }

  const tileCounts = countTilesByName(handToCheck);

  // Check if there's a Sanshoku Doujun in the hand
  if (checkSanshokuDoujun(tileCounts)) {
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {
            result: true,
            typeOfAction,
            han: han,
            yakuName: yakuName,
            winningTile,
          };
        }
      }
    }
  }

  const end = performance.now();
  //console.log(`isSanshokuDoujun() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction,
    han: 0,
    yakuName: yakuName,
    winningTile,
  };
}
