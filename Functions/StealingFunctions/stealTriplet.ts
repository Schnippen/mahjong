import {TTileObject} from '../../Types/types';

//this function is only for button popUP, stealing will be in seperate function
//so if you press PON button with debounce the proper stealing function will run
//TODO paste types into types.ts
export type positionType ='left' | 'top' | 'right' | 'bottom';
export function stealTriplet(
  playerHand: TTileObject[],
  discardedTileArray: TTileObject[],
  position: positionType,
) {
  let ponArray: TTileObject[] = [];
  if (!discardedTileArray || discardedTileArray.length === 0) {
    console.info('NO DISCARDED TILE IN stealTriplet');
    return {result: false, ponArray: ponArray};
  }
  let discardedTile = discardedTileArray[0];
  let discardedTileSuit = discardedTile.type;
  const tilesSuits = [
    'bamboo',
    'circles',
    'characters',
    'white',
    'green',
    'red',
    'east',
    'south',
    'west',
    'north',
  ];
  //if it has the same name ex. characters9 or same type for "white","green","red","east","south","west","north"
  //is true
  let isPonPossible = tilesSuits.indexOf(discardedTileSuit);

  if (isPonPossible === -1) return {result: false}; //return false
  if (isPonPossible <= 2) {
    let suitTiles = playerHand.filter(
      tile =>
        tile.type === discardedTile.type && tile.name === discardedTile.name,
    );
    if (suitTiles.length == 2) {
      if (position === 'left') {
        ponArray.push(discardedTile, suitTiles[0], suitTiles[1]);
      } else if (position === 'top') {
        ponArray.push(suitTiles[0], discardedTile, suitTiles[1]);
      } else if (position === 'right') {
        ponArray.push(suitTiles[0], suitTiles[1], discardedTile);
      } else {
        console.error('Invalid position');
        return {result: false, ponArray: ponArray};
      }
      return {result: true, ponArray: ponArray.flat()};
    }
  } else {
    let suitTiles = playerHand.filter(t => t.type === discardedTileSuit);
    //let setOfSuit = new Set()
    if (suitTiles.length == 2) {
      let ponArray = [];
      if (position === 'left') {
        ponArray.push(discardedTile, suitTiles[0], suitTiles[1]);
      } else if (position === 'top') {
        ponArray.push(suitTiles[0], discardedTile, suitTiles[1]);
      } else if (position === 'right') {
        ponArray.push(suitTiles[0], suitTiles[1], discardedTile);
      } else {
        console.error('Invalid position');
        return {result: false};
      }
      return {result: true, ponArray: ponArray};
    }
  }
  return {result: false};
}
