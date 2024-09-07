import {resetWinningHand} from '../Store/gameReducer';
import {
  changePrevailingWind,
  changeWhoTheLoserIs,
  changeWhoTheWinnerIs,
  HONBA_REDUCER,
  resetPlayersReducerHandsToNextRound,
  resetPlayersReducerToNextRound,
  rotateWindOrder,
} from '../Store/playersReducer';
import {resetWallReducer} from '../Store/wallReducer';
import {initializeNewRound} from './initializeNewRound';
import {playPopDownSound} from './playSounds/Sounds/playPopDownSound';

export const resetToNextRound = ({
  dispatch,
  navigation,
}: {
  dispatch: any;
  navigation: any;
}) => {
  playPopDownSound();
  //dispatch
  //reset game reducer
  // hands

  ///change compass i must know who won, change wind in playerReducer, the wind in player reducer sends data to compass,
  //now changing wind
  dispatch(rotateWindOrder());
  dispatch(resetWinningHand()); //reset the endRound Screen
  dispatch(resetWallReducer()); //wallreducer to 0
  dispatch(resetPlayersReducerToNextRound()); //resets player reducers beside scores, wind and hand
  //reset player hand
  dispatch(resetPlayersReducerHandsToNextRound());

  //change score, it is done in calculatePoints.ts

  //change prevailingWind
  dispatch(changePrevailingWind()); //TODO there might be bugs
  //reset who the winner is
  dispatch(changeWhoTheWinnerIs({TypeOfAction: 'reset'}));
  //reset who the loser is
  dispatch(changeWhoTheLoserIs({TypeOfAction: 'reset'}));
  dispatch(HONBA_REDUCER({TypeOfAction: 'reset'}));
  navigation.navigate('MahjongScreen');

  //init new round
  initializeNewRound(dispatch);

  console.log('resetToNextRound pressed');
};
