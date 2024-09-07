import {TTileObject} from '../../Types/types';
export const chooseRandomTile = (hand: TTileObject[]) => {
  let max = hand.length - 1;
  let dropLastTile = max;
  let dropRandomTile = Math.floor(Math.random() * max);
  let sixtyPercentChance = Math.floor(Math.random() * 11) <= 6;
  let result = sixtyPercentChance ? dropLastTile : dropRandomTile;
  let tileToDiscard = hand[result];
  //console.log("tileToDiscard:",max, dropLastTile, result, tileToDiscard?.name )
  return tileToDiscard;
};
