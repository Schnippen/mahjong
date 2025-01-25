import {TstolenTiles, TTileObject, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';

type isRiichiTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isRiichi({hand, discard, playerMelds, Process}: isRiichiTypes) {
  let handToCheck: TTileObject[] = hand.concat(discard);
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let yakuName = 'Riichi';

  if (handToCheck.length !== 14 || meldedTiles.length > 0) {
    //riichi cannot have melds

    return {
      result: false,
      typeOfAction,
      yakuName,
      han: 0,
      winningTile,
    };
  }

  const tileCounts = countTilesByName(handToCheck);
  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = {...tileCounts};
      newCounts[tileName] -= 2;
      if (checkMelds(newCounts) === 4) {
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
  return {
    result: false,
    typeOfAction,
    han: 0,
    yakuName,
    winningTile,
  };
}
