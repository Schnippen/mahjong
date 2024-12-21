import React from 'react';
import {resetWinningHand, START_GAME} from '../Store/gameReducer';
import {resetPlayersReducer_TOTAL_RESET} from '../Store/playersReducer';
import {resetRiverReducer} from '../Store/riverReducer';
import {resetWallReducer_TOTAL_RESET} from '../Store/wallReducer';

export const resetToStartScreen = (
  dispatch: any
) => {
  dispatch(START_GAME({phase: 'ended'}));
  dispatch(resetWinningHand()); //reset the endRound Screen
  dispatch(resetWallReducer_TOTAL_RESET()); //wallreducer to 0
  //TODO CHECK thoose, make TOTAL river reducer
  dispatch(resetRiverReducer());

  //reset all of playerReducer state. This only applies to this case of going back to StartScreen
  dispatch(resetPlayersReducer_TOTAL_RESET());
  console.log('resetToStartScreen pressed');
};
