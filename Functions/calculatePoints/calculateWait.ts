import {TTileObject} from '../../Types/types';
type calculateWaitType = 'middle' | 'edge' | 'pair' | '';

export const calculateWait = (
  hand: TTileObject[],
  discards: TTileObject[],
  tsumo: TTileObject,
): calculateWaitType => {
  const isSequenceComplete = (
    tile: TTileObject,
    tiles: TTileObject[],
  ): boolean => {
    const type = tile.type;
    const value = tile.value;

    const neededTiles = [
      {type, value: value - 1},
      {type, value: value + 1},
    ];

    return neededTiles.every(neededTile =>
      tiles.some(
        t => t.type === neededTile.type && t.value === neededTile.value,
      ),
    );
  };

  const canComplete = (tile: TTileObject, tiles: TTileObject[]): boolean => {
    const type = tile.type;
    const value = tile.value;

    if (isSequenceComplete(tile, tiles)) {
      return true;
    }

    if (
      tiles.some(
        t =>
          t.type === type && (t.value === value - 2 || t.value === value + 2),
      )
    ) {
      return true;
    }

    return tiles.some(t => t.type === type && t.value === value);
  };

  const isMiddleWait = () => {
    const handWithoutLast = hand.slice(0, -1);
    return canComplete(tsumo, handWithoutLast);
  };

  const isEdgeWait = () => {
    const handWithoutLast = hand.slice(0, -1);
    return hand.some(
      t =>
        t.type === discards[0].type &&
        (t.value === discards[0].value - 1 ||
          t.value === discards[0].value + 1),
    );
  };

  const isPairWait = () => {
    return hand.some(
      t => t.type === discards[0].type && t.value === discards[0].value,
    );
  };

  if (isMiddleWait()) {
    return 'middle';
  } else if (isEdgeWait()) {
    return 'edge';
  } else if (isPairWait()) {
    return 'pair';
  } else {
    return '';
  }
};
