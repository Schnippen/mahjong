import {resetWinningHand} from '../Store/gameReducer';
import {resetPlayersReducerToNextRound} from '../Store/playersReducer';
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
  //check who won, change wind accordingly
  dispatch(resetWinningHand());
  dispatch(resetWallReducer()); //wallreducer to 0
  dispatch(resetPlayersReducerToNextRound()); //resets player reducers beside scores
  //reset player hand

  ///change compass

  //change score

  //change prevailingWind

  navigation.navigate('MahjongScreen');

  //init new round
  initializeNewRound(dispatch);

  console.log('resetToNextRound pressed');
};
