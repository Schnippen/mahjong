import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkPinfu} from '../UtilsFunctions/checkPinfu';

type isPinfuTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
};

export function isPinfu({hand, discard, playerMelds}: isPinfuTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  let typeOfAction: TypeOfAction = '';
  let winningTile: TTileObject;
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);

  if (meldedTiles.length > 0) {
    typeOfAction = '';
    return {result: false, typeOfAction: typeOfAction};
  }

  if (hand.length === 14) {
    handToCheck = hand;
    typeOfAction = 'TSUMO';
    winningTile = hand[hand.length - 1];
    // console.log('PINFU LAST TILE TSUMO:', hand[hand.length - 1]);
  } else {
    handToCheck = [...hand, discard[0]];
    typeOfAction = 'RON';
    winningTile = discard[0];
    //console.log('PINFU LAST TILE RON:', discard);
  }

  const tileCounts = countTilesByName(handToCheck);
  //console.log('Tile Counts:', tileCounts);
  //console.log('Winning Tile:', winningTile.name);

  const pinfuResult = checkPinfu(tileCounts, winningTile);
  //console.log('PINFU RESULT:', pinfuResult);

  const end = performance.now();
  //console.log(`isPinfu() took ${end - start} milliseconds.`);
  return {result: pinfuResult, typeOfAction: typeOfAction};
}
