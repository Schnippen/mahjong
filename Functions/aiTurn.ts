import {TTileObject} from '../Types/types';
import {discardTile} from './discardTileFunction';

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

/* const AITurn = (
  gameTurn: string,
  humanPlayerWind: string,
  playerProps: {
    player: string;
    hand: TTileObject[];
  } | null,
) => {
  if (!playerProps || gameTurn === humanPlayerWind) {
    return;
  }
  let tileToDiscard = chooseRandomTile(playerProps.hand);
  let playerX = playerProps?.player;
  console.log('AITURN', playerProps?.player, tileToDiscard?.name);
  discardTile(playerX, tileToDiscard, dispatch);
}; */
