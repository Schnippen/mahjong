import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkKokushiMusou} from '../UtilsFunctions/checkKokushiMusou';

type isKokushiMusouTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isKokushiMusou({
  hand,
  discard,
  playerMelds,
  Process,
}: isKokushiMusouTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];

  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let yakuName = 'Kokushi Musou';
  if (meldedTiles.length > 0) {
    return {
      result: false,
      typeOfAction,
      han: 0,
      yakuName,
      winningTile,
    };
  }

  handToCheck = hand.concat(discard);

  const tileCounts = countTilesByName(handToCheck);
  if (checkKokushiMusou(tileCounts)) {
    return {
      result: true,
      typeOfAction: typeOfAction,
      han: 13,
      yakuName: yakuName,
      winningTile,
    };
  }

  const end = performance.now();
  //console.log(`isKokushiMusou() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction: typeOfAction,
    han: 0,
    yakuName: yakuName,
    winningTile,
  };
}
