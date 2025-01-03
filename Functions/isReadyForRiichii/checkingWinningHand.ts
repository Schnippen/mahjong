import {TTileObject} from '../../Types/types';
import {checkMelds} from './checkMelds';
import {countTilesByName} from './countTilesByName';

export function checkWinningHand(hand: TTileObject[]): boolean {
  if (hand.length !== 14) {
    //TODO there might be problems here in the future, can't think about it in the mome IMPORTANT
    /* console.info(
      `checkWinningHand(): Invalid hand length. Hand: ${hand
        .map(t => t.name)
        .join(', ')} (${hand.length} tiles).`,
    ); */
    return false;
  }
  //if (hand.length !== 14) return false;
  //fool proof design to check if i made a mistake
  const tileCounts = countTilesByName(hand);
  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = {...tileCounts};
      newCounts[tileName] -= 2;
      if (checkMelds(newCounts) === 4) {
        return true;
      }
    }
  }
  return false;
}
