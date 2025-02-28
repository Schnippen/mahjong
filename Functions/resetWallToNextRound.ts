import {TTileObject} from '../Types/types';

export const resetWallToNextRound = ({
  wall,
}: {
  wall: TTileObject[];
}): TTileObject[] => {
  //I know i am mutating existing array
  wall.forEach(tile => (tile.isDora = false));
  return wall;
};
