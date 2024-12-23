import {SET_LATEST_TURN, START_GAME} from '../Store/gameReducer';
import {assignHandsBasedOnWind} from '../Store/playersReducer';
import {TTileObject} from '../Types/types';
import firstShuffledOfWindsForGameStart from './firstShuffledOfWindsForGameStart';
import {soundFunc} from './playSounds/soundFunc';
import {shuffledTilesForGameStart} from './shuffledTilesForGameStart';
import WallCalculation from './wallCalculation';

export const initializeGame = (dispatch: any) => {
  const finishedWall: TTileObject[] = shuffledTilesForGameStart();
  WallCalculation(dispatch, finishedWall);
  firstShuffledOfWindsForGameStart(dispatch);
  dispatch(SET_LATEST_TURN());
  dispatch(assignHandsBasedOnWind());
  dispatch(START_GAME({phase: 'started'}));
  soundFunc({type: 'diceThrow'});
  //console.log("initializeGame:",finishedWall)
  //maybe clean up  assignHandsBasedOnWind state?
};
