import { SET_LATEST_TURN } from '../Store/gameReducer';
import {TTileObject} from '../Types/types';
import determineTurnOrder from './determineTurnOrder';
import firstShuffledOfWindsForGameStart from './firstShuffledOfWindsForGameStart';
import {shuffledTilesForGameStart} from './shuffledTilesForGameStart';
import WallCalculation from './wallCalculation';

export const initialGame = (dispatch: any) => {
  const finishedWall: TTileObject[] = shuffledTilesForGameStart();
  WallCalculation(dispatch, finishedWall);
  firstShuffledOfWindsForGameStart(dispatch);
  dispatch(SET_LATEST_TURN())
  //console.log("initializeGame:",finishedWall)
};
