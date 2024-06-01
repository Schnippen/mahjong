import {TTileObject} from '../Types/types';

//this function is only for button popUP, stealing will be in seperate function
//so if you press PON button with debounce the proper stealing function will run

const isPlayerHandContainingFourOfAKind = (playerHand: TTileObject[]) => {
  const frequencyMap: {[key: string]: number} = {};
  playerHand.forEach(tile => {
    const key = `${tile.name}-${tile.type}`;
    frequencyMap[key] = (frequencyMap[key] || 0) + 1;
  });
  for (const key in frequencyMap) {
    if (frequencyMap[key] >= 4) {
      return true;
    }
  }
  return false;
};

export function checkForQuadruplet(
  playerHand: TTileObject[],
  discardedTileArray: TTileObject[],
) {
  console.log(discardedTileArray[0]?.name);
  let isKan = isPlayerHandContainingFourOfAKind(playerHand);
  // console.log('isKan?', isKan);
  if (isKan) {
    return true;
  }
  if (!discardedTileArray || discardedTileArray.length === 0) {
    console.info('NO DISCARDED TILE IN checkForQuadruplet');
    return false;
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
  let isKanPossible = tilesSuits.indexOf(discardedTileSuit);
  if (isKanPossible === -1) return false; //return false
  if (isKanPossible <= 2) {
    let suitTiles = playerHand.filter(
      tile =>
        tile.type === discardedTile.type && tile.name === discardedTile.name,
    );
    if (suitTiles.length == 3) return true;
    //return //check for characters+ number
  } else {
    let suitTiles = playerHand.filter(t => t.type === discardedTileSuit);
    //let setOfSuit = new Set()
    if (suitTiles.length == 3) return true;
  }
  return false;
}
