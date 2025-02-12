import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';

type isToiToiTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isToiToi({hand, discard, playerMelds, Process}: isToiToiTypes) {
  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let winningTile: TTileObject = discard[0];
  let yakuName = 'ToiToi';

  // Combine all tiles
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let handToCheck = [...hand, ...discard, ...meldedTiles];

  //console.log(    'isToiToi: full hand:',    handToCheck.map(t => t.name),  );

  const tileCounts = countTilesByName(handToCheck);
  //console.log('isToiToi: tile counts:', tileCounts);
  let triplets = 0;
  let pairs = 0;

  for (let tileName in tileCounts) {
    const count = tileCounts[tileName];
    if (count === 4) {
      triplets++;
    } else if (count === 3) {
      triplets++;
    } else if (count === 2) {
      pairs++;
    }
  }

  //console.log('isToiToi: found triplets:', triplets, 'pairs:', pairs);

  if (triplets === 4 && pairs === 1) {
    return {
      result: true,
      typeOfAction,
      han: 2,
      yakuName,
      winningTile,
    };
  }

  return {
    result: false,
    typeOfAction,
    han: 0,
    yakuName: '',
    winningTile,
  };
}
