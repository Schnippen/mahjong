import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkPinfu} from '../UtilsFunctions/checkPinfu';

type isPinfuTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isPinfu({hand, discard, playerMelds, Process}: isPinfuTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = hand.concat(discard);
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let yakuName = 'Pinfu';

  if (meldedTiles.length > 0) {
    return {
      result: false,
      typeOfAction: typeOfAction,
      han: 0,
      yakuName: yakuName,
      winningTile,
    };
  }

  const tileCounts = countTilesByName(handToCheck);
  //console.log('Tile Counts:', tileCounts);
  //console.log('Winning Tile:', winningTile.name);

  const pinfuResult = checkPinfu(tileCounts, winningTile);
  //console.log('PINFU RESULT:', pinfuResult);

  const end = performance.now();
  //console.log(`isPinfu() took ${end - start} milliseconds.`);
  return {
    result: pinfuResult,
    typeOfAction: typeOfAction,
    han: pinfuResult ? 1 : 0,
    yakuName: yakuName,
    winningTile,
  };
}
