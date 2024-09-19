import {tileCountsType, TTileObject} from '../../../Types/types';
import {checkMelds} from '../../isReadyForRiichii/checkMelds';
import {countTilesByName} from '../../isReadyForRiichii/countTilesByName';

function countPairs(tileCounts: tileCountsType): number {
  let pairs = 0;
  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      pairs++;
      tileCounts[tileName];
    }
  }
  return pairs;
}

const calculateShanten = (hand: TTileObject[]): number => {
  const tileCounts = countTilesByName(hand);
  const pairs = countPairs(tileCounts);
  const triplets = checkMelds(tileCounts);
  const shanten = 8 - (triplets * 2 + pairs);
  //if shanten <0 you are in tenpai (almost winning)
  return Math.max(0, shanten); // https://riichi.wiki/Shanten
  //TODO  Accurate shanten formula
};
export default calculateShanten;
