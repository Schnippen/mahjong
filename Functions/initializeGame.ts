import {TTileObject} from '../Types/types';
import firstShuffledOfWindsForGameStart from './firstShuffledOfWindsForGameStart';
import {shuffledTilesForGameStart} from './shuffledTilesForGameStart';
import WallCalculation from './wallCalculation';

export const initialGame = (dispatch: any) => {
  const finishedWall: TTileObject[] = shuffledTilesForGameStart();
  firstShuffledOfWindsForGameStart(dispatch);
  WallCalculation(dispatch, finishedWall);
  //console.log("initializeGame:",finishedWall)
};
