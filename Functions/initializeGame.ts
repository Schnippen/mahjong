import { SET_LATEST_TURN } from '../Store/gameReducer';
import { assignHandsBasedOnWind } from '../Store/playersReducer';
import {TTileObject} from '../Types/types';
import firstShuffledOfWindsForGameStart from './firstShuffledOfWindsForGameStart';
import {shuffledTilesForGameStart} from './shuffledTilesForGameStart';
import WallCalculation from './wallCalculation';

export const initialGame = (dispatch: any) => {
  const finishedWall: TTileObject[] = shuffledTilesForGameStart();
  WallCalculation(dispatch, finishedWall);
  firstShuffledOfWindsForGameStart(dispatch);
  dispatch(SET_LATEST_TURN())
  dispatch(assignHandsBasedOnWind())
  //console.log("initializeGame:",finishedWall)
  //maybe clean up  assignHandsBasedOnWind state?
};
