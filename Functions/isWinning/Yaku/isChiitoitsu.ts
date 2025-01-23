import {TstolenTiles, TTileObject, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';

type isChiitoitsuTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isChiitoitsu({
  hand,
  discard,
  playerMelds,
  Process,
}: isChiitoitsuTypes) {
  const start = performance.now();
  let handToCheck: TTileObject[] = [];
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];
  let yakuName = 'Chiitoitsu';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);

  if (meldedTiles.length > 0) {
    return {
      result: false,
      typeOfAction: typeOfAction,
      han: 0,
      yakuName: yakuName,
      winningTile,
    };
  } else {
    handToCheck = hand.concat(discard);
  }

  //must be closed hand
  const tileCounts = countTilesByName(handToCheck);
  // check for Chiitoitsu (Seven Pairs)
  let pairsCount = 0;
  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      pairsCount++;
    }
  }
  const end = performance.now();
  //console.log(`isChiitoitsu() took ${end - start} milliseconds.`);
  if (pairsCount === 7) {
    return {
      result: true,
      typeOfAction: typeOfAction,
      han: 2,
      yakuName: yakuName,
      winningTile,
    };
    // In Chiitoitsu, 6 pairs means waiting for the 7th pair
  } else {
    return {
      result: false,
      typeOfAction: typeOfAction,
      han: 0,
      yakuName: yakuName,
      winningTile,
    };
  }
}
