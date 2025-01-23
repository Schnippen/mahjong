import {TTileObject, TstolenTiles, TypeOfAction} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';
import {checkIttsuu} from '../UtilsFunctions/checkIttsuu';

type isIttsuuTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
};

export function isIttsuu({hand, discard, playerMelds, Process}: isIttsuuTypes) {
  const start = performance.now();

  const typeOfAction: TypeOfAction =
    Process === 'ron' ? 'RON' : Process === 'tsumo' ? 'TSUMO' : '';
  let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
  let han: number;
  let yakuName = 'Ittsuu';
  let handToCheck: TTileObject[] = [];
  let winningTile: TTileObject = discard[0];

  if (meldedTiles.length === 0) {
    han = 2;
    handToCheck = hand.concat(discard);
  } else {
    han = 1;
    handToCheck = [...hand, ...discard, ...meldedTiles];
  }

  const tileCounts = countTilesByName(handToCheck);

  // checking if there is an Ittsuu in the hand
  if (checkIttsuu(tileCounts)) {
    for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = {...tileCounts};
        newCounts[tileName] -= 2;
        if (checkMelds(newCounts) === 4) {
          return {
            result: true,
            typeOfAction,
            han: han,
            yakuName,
            winningTile,
          };
        }
      }
    }
  }

  const end = performance.now();
  //console.log(`isIttsuu() took ${end - start} milliseconds.`);
  return {
    result: false,
    typeOfAction,
    han: 0,
    yakuName,
    winningTile,
  };
}
