import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkYakuhai} from '../UtilsFunctions/checkYakuhai';

type isYakuhaiTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isYakuhai({
  hand,
  discard,
  playerMelds,
  Process,
}: isYakuhaiTypes) {
  const start = performance.now();
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];

  let yakuName = 'Yakuhai';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let handToCheck: TTileObject[] = [];
  if (meldedTiles.length === 0) {
    handToCheck = hand.concat(discard);
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles];
  }
  const tileCounts = countTilesByName(handToCheck);
  if (checkYakuhai(tileCounts) > 0) {
    let numberOfYakuhai = checkYakuhai(tileCounts);
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {
            result: true,
            typeOfAction,
            han: numberOfYakuhai,
            yakuName: yakuName,
            winningTile,
          };
        }
      }
    }
  }

  const end = performance.now();
  //console.log(`isYakuhai() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction,
    han: 0,
    yakuName,
    winningTile,
  };
}
