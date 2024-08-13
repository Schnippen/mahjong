import {kanPositionTypes, positionType, TTileObject} from '../../Types/types';

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
};

export function stealQuadruplet(
  playerHand: TTileObject[],
  discardedTileArray: TTileObject[],
  position: positionType,
) {
  console.log('stealQuadruplet():', playerHand, discardedTileArray, position);
  let kanPosition: kanPositionTypes;
  let kanArray: TTileObject[] = [];
  let isKan = isPlayerHandContainingFourOfAKind(playerHand);
  if (isKan) {
    let discardedTile = discardedTileArray[0];
    console.log('DISCARDED:', discardedTile.name);
    let suitTiles = playerHand.filter(
      tile =>
        tile.type === discardedTile.type && tile.name === discardedTile.name,
    );

    kanArray.push(...suitTiles);
    kanPosition = 'kanClosed';
    return {result: true, kanArray: kanArray, positionKan: kanPosition};
  }
  if (!discardedTileArray || discardedTileArray.length === 0) {
    console.info('NO DISCARDED TILE IN checkForQuadruplet');
    return {result: false};
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
  let isKanPossible = tilesSuits.indexOf(discardedTileSuit);
  if (isKanPossible === -1) return {result: false}; //return false
  if (isKanPossible <= 2) {
    let suitTiles = playerHand.filter(
      tile =>
        tile.type === discardedTile.type && tile.name === discardedTile.name,
    );
    if (suitTiles.length == 3) {
      if (position === 'left') {
        kanArray.push(discardedTile, suitTiles[0], suitTiles[1], suitTiles[2]);
        kanPosition = 'kanLeft';
      } else if (position === 'top') {
        kanArray.push(suitTiles[0], discardedTile, suitTiles[1], suitTiles[2]);
        kanPosition = 'kanFront';
      } else if (position === 'right') {
        kanArray.push(suitTiles[2], suitTiles[1], suitTiles[0], discardedTile);
        kanPosition = 'kanRight';
      } else {
        console.error('Invalid position');
        return {result: false};
      }
      return {result: true, kanArray: kanArray, positionKan: kanPosition};
    }
  } else {
    let suitTiles = playerHand.filter(t => t.type === discardedTileSuit);
    if (suitTiles.length == 3) {
      if (position === 'left') {
        kanArray.push(discardedTile, suitTiles[0], suitTiles[1], suitTiles[2]);
        kanPosition = 'kanLeft';
      } else if (position === 'top') {
        kanArray.push(suitTiles[0], discardedTile, suitTiles[1], suitTiles[2]);
        kanPosition = 'kanFront';
      } else if (position === 'right') {
        kanArray.push(suitTiles[2], suitTiles[1], suitTiles[0], discardedTile);
        kanPosition = 'kanRight';
      } else {
        console.error('Invalid position');
        return {result: false};
      }
      return {result: true, kanArray: kanArray, positionKan: kanPosition};
    }
  }
  return {result: false};
}
