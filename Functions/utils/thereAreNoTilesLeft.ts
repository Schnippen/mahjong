import {TTileObject} from '../../Types/types';

export const thereAreNoTilesLeft = ({
  tilesAfterHandoutLength,
  nextTile,
}: {
  tilesAfterHandoutLength: number;
  nextTile: TTileObject;
}) => {
  if (tilesAfterHandoutLength === 0) return true;
  if (nextTile?.name === undefined || null) return true;
  return false;
};
