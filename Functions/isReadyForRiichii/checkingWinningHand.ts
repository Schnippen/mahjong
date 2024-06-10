import {TTileObject} from '../../Types/types';
import {checkMelds} from './checkMelds';
import {countTilesByName} from './countTilesByName';

export function checkWinningHand(hand: TTileObject[]): boolean {
  if (hand.length !== 14) return false;

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
