import {TTileObject} from '../../../Types/types';
import calculateShanten from './calculateShanten';

export function calculateEfficiency(
  hand: TTileObject[],
  possibleTiles: TTileObject[],
): number {
  let bestEfficiency = 0;

  hand.forEach(tile => {
    const handAfterDiscard = hand.filter(t => t !== tile);
    const shantenAfterDiscard = calculateShanten(handAfterDiscard);
    let improvingTilesCount = 0; //check how many of remaining tiles will improve the hand
    possibleTiles.forEach(possibleTile => {
      //simulation of adding THIS possible tile to the hand
      const simulatedHand = [...handAfterDiscard, possibleTile];
      const newShanten = calculateShanten(simulatedHand);

      //if shanten decreases (improvement), count THIS tile as helpfull
      if (newShanten < shantenAfterDiscard) {
        improvingTilesCount++;
      }
    });

    //the efficiency score for this discard is the number of tiles that improve the hand
    if (improvingTilesCount > bestEfficiency) {
      bestEfficiency = improvingTilesCount;
    }
  });
  return bestEfficiency;
}
