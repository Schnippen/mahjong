import {TTileObject} from '../Types/types';
import determineTurnOrder from './determineTurnOrder';
import firstShuffledOfWindsForGameStart from './firstShuffledOfWindsForGameStart';
import {shuffledTilesForGameStart} from './shuffledTilesForGameStart';
import WallCalculation from './wallCalculation';

export const initialGame = (dispatch: any) => {
  const finishedWall: TTileObject[] = shuffledTilesForGameStart();
  WallCalculation(dispatch, finishedWall);
  firstShuffledOfWindsForGameStart(dispatch);

  //console.log("initializeGame:",finishedWall)
};
