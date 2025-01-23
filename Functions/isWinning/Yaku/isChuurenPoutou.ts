import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkChuurenPoutou} from '../UtilsFunctions/checkChuurenPoutou';

type isChuurenPoutouTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isChuurenPoutou({
  hand,
  discard,
  playerMelds,
  Process,
}: isChuurenPoutouTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];
  let yakuName = 'Chuuren Poutou';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);

  if (meldedTiles.length === 0) {
    handToCheck = hand.concat(discard);
  } else {
    handToCheck = [...hand, ...discard, ...meldedTiles]; //is closed only
    return {
      result: false,
      typeOfAction,
      han: 0,
      yakuName,
      winningTile,
    };
  }
  const tileCounts = countTilesByName(handToCheck);

  if (checkChuurenPoutou(tileCounts)) {
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {
            result: true,
            typeOfAction: typeOfAction,
            han: 13,
            yakuName: yakuName,
            winningTile,
          };
        }
      }
    }
  }

  const end = performance.now();
  //console.log(`isChuurenPoutou() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
    winningTile,
  };
}
