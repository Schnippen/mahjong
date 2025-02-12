import {
  addRoundCounter,
  INTERRUPT_TURN,
  resetWinningHand_TOTAL,
  START_GAME,
} from '../Store/gameReducer';
import {
  changePrevailingWind,
  changeWhoTheLoserIs,
  changeWhoTheWinnerIs,
  resetPlayersReducerHandsToNextRound,
  resetPlayersReducerToNextRound,
  rotateWindOrder,
} from '../Store/playersReducer';
import {resetRiverReducer} from '../Store/riverReducer';
import {resetWallReducer_TOTAL_RESET} from '../Store/wallReducer';
import {initializeNewRound} from './initializeNewRound';

export const resetToNextRound = ({
  dispatch,
  navigation,
}: {
  dispatch: any;
  navigation: any;
}) => {
  //TODO CHANGE THE FUNCTION of play sound
  //playPopDownSound();
  //dispatch
  //reset game reducer
  // hands
  dispatch(START_GAME({phase: 'ended'})); //TODO i dont know if to keep it
  dispatch(INTERRUPT_TURN({val: false}));
  ///change compass i must know who won, change wind in playerReducer, the wind in player reducer sends data to compass, - ok, its done
  //now changing wind
  dispatch(rotateWindOrder());
  dispatch(resetWinningHand_TOTAL()); //reset the endRound Screen this is total
  dispatch(resetWallReducer_TOTAL_RESET()); //wallreducer to 0
  //add +1 to round counter:
  dispatch(addRoundCounter({TypeOfAction: 'increment'}));
  //reset river
  dispatch(resetRiverReducer());
  dispatch(resetPlayersReducerToNextRound()); //resets player reducers beside scores, wind and hand
  //reset player hand
  dispatch(resetPlayersReducerHandsToNextRound());

  //changing players score, it is done in calculatePoints.ts

  //change prevailingWind
  dispatch(changePrevailingWind()); //TODO there might be bugs TEST IT
  //reset who the winner is
  dispatch(changeWhoTheWinnerIs({TypeOfAction: 'reset'}));
  //reset who the loser is
  dispatch(changeWhoTheLoserIs({TypeOfAction: 'reset'}));
  //jesli wygrał east to nie resetuj honba sticks ......... //TODO move to calculate points
  let nextRoundGameParams = {gameInitializer: 'start_next_round'};

  navigation.navigate('MahjongScreen', nextRoundGameParams); //TODO IMPORTANT ADD PARAMS??? IMPORTANT

  //init new round
  setTimeout(() => {
    initializeNewRound(dispatch);
  }, 500); //clean up? // if not player initialize turn

  console.log('resetToNextRound pressed');
};
