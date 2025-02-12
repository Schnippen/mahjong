import {SET_LATEST_TURN, START_GAME} from '../Store/gameReducer';
import {assignHandsBasedOnWind, DEBUG_HAND} from '../Store/playersReducer';
import {TTileObject} from '../Types/types';
import firstShuffledOfWindsForGameStart from './firstShuffledOfWindsForGameStart';
import {debugHand2} from './isWinning/Yaku/testFuntion';
import {soundFunc} from './playSounds/soundFunc';
import {shuffledTilesForGameStart} from './shuffledTilesForGameStart';
import WallCalculation from './wallCalculation';

export const initializeGame = (dispatch: any) => {
  const finishedWall: TTileObject[] = shuffledTilesForGameStart();
  WallCalculation(dispatch, finishedWall);
  firstShuffledOfWindsForGameStart(dispatch);
  dispatch(SET_LATEST_TURN());
  dispatch(assignHandsBasedOnWind());
  //TODO REMOVE DEBUG
  if (__DEV__) {
    true ? dispatch(DEBUG_HAND(debugHand2)) : null;
  }
  //console.info('DEBUGING HAND IS ON');
  dispatch(START_GAME({phase: 'started'}));
  soundFunc({type: 'diceThrow'});
  //console.log("initializeGame:",finishedWall)
  //maybe clean up  assignHandsBasedOnWind state?
};
