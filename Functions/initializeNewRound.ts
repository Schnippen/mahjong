import {SET_LATEST_TURN, START_GAME} from '../Store/gameReducer';
import {assignHandsBasedOnWind} from '../Store/playersReducer';
import {TTileObject} from '../Types/types';
import firstShuffledOfWindsForGameStart from './firstShuffledOfWindsForGameStart';
import {soundFunc} from './playSounds/soundFunc';
import {resetWallToNextRound} from './resetWallToNextRound';
import {shuffledTilesForGameStart} from './shuffledTilesForGameStart';
import WallCalculation from './wallCalculation';

export const initializeNewRound = (dispatch: any) => {
  const shuffledWall: TTileObject[] = shuffledTilesForGameStart();
  let resetedWall = resetWallToNextRound({wall: shuffledWall});

  WallCalculation(dispatch, resetedWall);
  firstShuffledOfWindsForGameStart(dispatch);
  dispatch(SET_LATEST_TURN());
  dispatch(assignHandsBasedOnWind());
  dispatch(START_GAME({phase: 'started'}));
  soundFunc({type: 'diceThrow'});

  //add honba or richii sticks?

  //maybe clean up  assignHandsBasedOnWind state?
};
