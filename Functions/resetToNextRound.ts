import {resetWinningHand, START_GAME} from '../Store/gameReducer';
import {
  changePrevailingWind,
  changeWhoTheLoserIs,
  changeWhoTheWinnerIs,
  resetPlayersReducerHandsToNextRound,
  resetPlayersReducerToNextRound,
  rotateWindOrder,
} from '../Store/playersReducer';
import {resetRiverReducer} from '../Store/riverReducer';
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
  dispatch(START_GAME({phase: 'ended'})); //TODO i dont know if to keep it

  ///change compass i must know who won, change wind in playerReducer, the wind in player reducer sends data to compass, - ok, its done
  //now changing wind
  dispatch(rotateWindOrder());
  dispatch(resetWinningHand()); //reset the endRound Screen
  dispatch(resetWallReducer()); //wallreducer to 0
  //reset river
  dispatch(resetRiverReducer());
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
  //jesli wygrał east to nie resetuj..... //TODO move to calculate points
  navigation.navigate('MahjongScreen');

  //init new round
  initializeNewRound(dispatch);

  console.log('resetToNextRound pressed');
};
