import {SET_LATEST_TURN, START_GAME} from '../Store/gameReducer';
import {assignHandsBasedOnWind} from '../Store/playersReducer';
import {TTileObject} from '../Types/types';
import firstShuffledOfWindsForGameStart from './firstShuffledOfWindsForGameStart';
import { playdicetrowSound } from './playSounds/Sounds/playDiceThrow';
import { soundFunc } from './playSounds/soundFunc';
import {shuffledTilesForGameStart} from './shuffledTilesForGameStart';
import WallCalculation from './wallCalculation';

export const initialGame = (dispatch: any) => {
  const finishedWall: TTileObject[] = shuffledTilesForGameStart();
  WallCalculation(dispatch, finishedWall);
  firstShuffledOfWindsForGameStart(dispatch);
  dispatch(SET_LATEST_TURN());
  dispatch(assignHandsBasedOnWind());
  dispatch(START_GAME({phase: 'started'}));
  soundFunc({type:'diceThrow'})
  //playdicetrowSound()
  //console.log("initializeGame:",finishedWall)
  //maybe clean up  assignHandsBasedOnWind state?
};
